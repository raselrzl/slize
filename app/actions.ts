"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { bannerSchema, productSchema } from "./lib/zodSchemas";
import prisma from "./lib/db";
import { redis } from "./lib/redis";
import { Cart } from "./lib/interfaces";
import { revalidatePath } from "next/cache";
import { stripe } from "./lib/stripe";
import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function createProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "rasel6041@gmail.com") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  const inputPrice = submission.value.inputPrice;
  const discount = submission.value.discount ?? 0; // you can add discount field in form later
  const price = inputPrice - discount; // final selling price

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      inputPrice: inputPrice, // original admin input
      price: price, // actual price to sell
      discount: discount, // optional discount
      available: submission.value.available ?? 0,
      images: flattenUrls,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured === true,
    },
  });

  redirect("/dashboard/products");
}

export async function editProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "rasel6041@gmail.com") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  const productId = formData.get("productId") as string;

  const inputPrice = submission.value.inputPrice;
  const discount = submission.value.discount ?? 0; // you can add discount field in form later
  const price = inputPrice - discount; // final selling price

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      category: submission.value.category,
      price: price,
      discount: submission.value.discount,
      inputPrice: submission.value.inputPrice,
      isFeatured: submission.value.isFeatured === true ? true : false,
      status: submission.value.status,
      images: flattenUrls,
    },
  });

  redirect("/dashboard/products");
}

export async function deleteProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "rasel6041@gmail.com") {
    return redirect("/");
  }

  await prisma.product.delete({
    where: {
      id: formData.get("productId") as string,
    },
  });

  redirect("/dashboard/products");
}

export async function createBanner(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "rasel6041@gmail.com") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
    },
  });

  redirect("/dashboard/banner");
}

export async function deleteBanner(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "rasel6041@gmail.com") {
    return redirect("/");
  }

  await prisma.banner.delete({
    where: {
      id: formData.get("bannerId") as string,
    },
  });

  redirect("/dashboard/banner");
}

export async function addItem(productId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  const selectedProduct = await prisma.product.findUnique({
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
    where: {
      id: productId,
    },
  });

  if (!selectedProduct) {
    throw new Error("No product with this id");
  }
  let myCart = {} as Cart;

  if (!cart || !cart.items) {
    myCart = {
      userId: user.id,
      items: [
        {
          price: selectedProduct.price,
          id: selectedProduct.id,
          imageString: selectedProduct.images[0],
          name: selectedProduct.name,
          quantity: 1,
        },
      ],
    };
  } else {
    let itemFound = false;

    myCart.items = cart.items.map((item) => {
      if (item.id === productId) {
        itemFound = true;
        item.quantity += 1;
      }

      return item;
    });

    if (!itemFound) {
      myCart.items.push({
        id: selectedProduct.id,
        imageString: selectedProduct.images[0],
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: 1,
      });
    }
  }

  await redis.set(`cart-${user.id}`, myCart);

  revalidatePath("/", "layout");
}

export async function delItem(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const productId = formData.get("productId");

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const updateCart: Cart = {
      userId: user.id,
      items: cart.items.filter((item) => item.id !== productId),
    };

    await redis.set(`cart-${user.id}`, updateCart);
  }

  revalidatePath("/bag");
}

export async function checkOut(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");

  const deliveryFeeSEK = Number(formData.get("deliveryFee") || 0);

  const cart: Cart | null = await redis.get(`cart-${user.id}`);
  if (!cart || !cart.items?.length) return redirect("/out-of-stock");

  const unavailable: string[] = [];
  const validItems: typeof cart.items = [];

  for (const item of cart.items) {
    const product = await prisma.product.findUnique({ where: { id: item.id } });
    if (!product || product.available < item.quantity) {
      unavailable.push(item.name);
    } else {
      validItems.push({ ...item, price: product.price });
    }
  }

  if (unavailable.length > 0) {
    // Redirect to a custom Out of Stock page
    return redirect("/out-of-stock");
  }

  // create order + Stripe session as before
  const subtotalSEK = validItems.reduce(
    (sum, it) => sum + it.price * it.quantity,
    0
  );
  const finalTotalSEK = subtotalSEK + deliveryFeeSEK;
  const finalTotalMinor = finalTotalSEK * 100;
  const deliveryFeeMinor = deliveryFeeSEK * 100;

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      amount: finalTotalMinor,
      deliveryFee: deliveryFeeMinor,
      status: "pending",
      items: {
        create: validItems.map((it) => ({
          productId: it.id,
          quantity: it.quantity,
          name: it.name,
          price: it.price * 100,
          imageString: it.imageString,
        })),
      },
    },
    include: { items: true },
  });

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
    validItems.map((item) => ({
      price_data: {
        currency: "sek",
        unit_amount: item.price * 100,
        product_data: { name: item.name, images: [item.imageString] },
      },
      quantity: item.quantity,
    }));

  if (deliveryFeeMinor > 0) {
    lineItems.push({
      price_data: {
        currency: "sek",
        unit_amount: deliveryFeeMinor,
        product_data: { name: "Delivery Fee" },
      },
      quantity: 1,
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    billing_address_collection: "required",
    shipping_address_collection: { allowed_countries: ["SE"] },
    line_items: lineItems,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/bag`,
    metadata: { userId: user.id, orderId: order.id },
  });

  return redirect(session.url!);
}

export async function updateItemQuantity(formData: FormData) {
  const { getUser } = getKindeServerSession(); 
  const user = await getUser();

  if (!user) return redirect("/");

  const productId = formData.get("productId") as string;
  const newQuantity = Number(formData.get("quantity"));

  if (!productId || newQuantity < 1) return;

  let cart: Cart | null = await redis.get(`cart-${user.id}`);
  if (!cart || !cart.items) return;

  const updatedCart: Cart = {
    userId: user.id,
    items: cart.items.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ),
  };

  await redis.set(`cart-${user.id}`, updatedCart);

  revalidatePath("/bag");
}

export async function getUserOrders() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return { user: null, orders: [] };
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      User: {
        select: { firstName: true, lastName: true, email: true },
      },
      items: {
        include: {
          Product: {
            select: {
              id: true,
              name: true,
              price: true,
              images: true,
              status: true, // <-- add this
              category: true, // <-- add this
              isFeatured: true, // <-- add this
            },
          },
        },
      },
    },
  });

  return { user, orders };
}

export async function deleteOrderAction(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      return { success: false, message: "Order not found" };
    }

    // Optional: restore product availability before deleting
    await Promise.all(
      order.items.map(async (item) => {
        if (item.productId && item.quantity) {
          await prisma.product.update({
            where: { id: item.productId },
            data: { available: { increment: item.quantity } },
          });
        }
      })
    );

    // Delete order items first (if not cascaded)
    await prisma.orderItem.deleteMany({ where: { orderId } });

    // Delete order itself
    await prisma.order.delete({ where: { id: orderId } });

    revalidatePath("/dashboard/orders");
    return { success: true };
  } catch (err) {
    console.error("❌ Error deleting order:", err);
    return { success: false, message: "Server error" };
  }
}


export async function orderWithInvoice(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/login");
    return;
  }

  const deliveryFee = Number(formData.get("deliveryFee") || 0);

  // Shipping info from form
  const fullName = formData.get("fullName") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;

  const shippingName = formData.get("shippingName") as string;
  const shippingLine1 = formData.get("shippingLine1") as string;
  const shippingLine2 = formData.get("shippingLine2") as string;
  const shippingCity = formData.get("shippingCity") as string;
  const shippingPostal = formData.get("shippingPostal") as string;
  const shippingCountry = formData.get("shippingCountry") as string;

  // Get cart from Redis
  const rawCart = await redis.get(`cart-${user.id}`);
  const cart: Cart | null = rawCart as Cart | null;

  if (!cart || !cart.items || cart.items.length === 0) {
    redirect("/bag");
    return;
  }

  // Validate product availability
  const unavailable: string[] = [];
  const validItems: typeof cart.items = [];

  for (const item of cart.items) {
    const product = await prisma.product.findUnique({ where: { id: item.id } });
    if (!product || product.available < item.quantity) {
      unavailable.push(item.name);
    } else {
      validItems.push({ ...item, price: product.price });
    }
  }

  if (unavailable.length > 0) {
    redirect("/out-of-stock");
    return;
  }

  // Create Order with shipping info
  const subtotal = validItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const finalTotal = subtotal + deliveryFee;

  await prisma.order.create({
    data: {
      userId: user.id,
      amount: finalTotal * 100,
      deliveryFee: deliveryFee * 100,
      status: "pending",
      invoiceStatus: "pending",
      fullName,
      phone,
      email,
      shippingName,
      shippingLine1,
      shippingLine2,
      shippingCity,
      shippingPostal,
      shippingCountry,
      items: {
        create: validItems.map((it) => ({
          productId: it.id,
          quantity: it.quantity,
          name: it.name,
          price: it.price * 100,
          imageString: it.imageString,
        })),
      },
    },
  });

  // Clear cart
  await redis.del(`cart-${user.id}`);

  // Redirect to invoice payment success page
  redirect("/");
}

