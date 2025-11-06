import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/app/lib/stripe";
import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();
  const signature = headerList.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_SECRET_WEBHOOK as string
    );
  } catch (err) {
    console.error("❌ Invalid Stripe signature:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session & {
        shipping_details?: {
          name?: string;
          address?: {
            line1?: string;
            line2?: string;
            city?: string;
            postal_code?: string;
            country?: string;
          };
        };
      };

      const metadata = session.metadata || {};
      const orderId = metadata.orderId as string | undefined;
      const userId = metadata.userId as string | undefined;

      const shipping = session.shipping_details;
      const customer = session.customer_details;

      try {
        // 1️⃣ Get cart from Redis
        const cartKey = `cart-${userId}`;
        const cartData: string | null = await redis.get(cartKey); // ✅ explicitly string or null
        const cartItems = cartData ? JSON.parse(cartData) : [];

        // 2️⃣ Create order with customer/shipping info
        const order = await prisma.order.create({
          data: {
            userId,
            status: "paid",
            invoiceStatus: "paid",
            amount: session.amount_total ?? 0,
            deliveryFee: Number(metadata.deliveryFee) || 0,
            fullName: customer?.name || shipping?.name,
            phone: customer?.phone || undefined,
            email: customer?.email || undefined,
            shippingName: shipping?.name,
            shippingLine1: shipping?.address?.line1,
            shippingLine2: shipping?.address?.line2,
            shippingCity: shipping?.address?.city,
            shippingPostal: shipping?.address?.postal_code,
            shippingCountry: shipping?.address?.country,
          },
        });

        // 3️⃣ Create OrderItems and decrement stock
        await Promise.all(
          cartItems.map(async (item: any) => {
            if (!item.productId || item.quantity <= 0) return;

            // Fetch product
            const product = await prisma.product.findUnique({
              where: { id: item.productId },
            });
            if (!product) return;

            // Check stock
            if (product.available < item.quantity) {
              console.warn(
                `⚠️ Product ${product.name} does not have enough stock.`
              );
              // optional: handle out-of-stock
            } else {
              // Create order item
              await prisma.orderItem.create({
                data: {
                  orderId: order.id,
                  productId: product.id,
                  quantity: item.quantity,
                  name: product.name,
                  price: product.price,
                  imageString: product.images[0] || null,
                },
              });

              // Decrement stock
              await prisma.product.update({
                where: { id: product.id },
                data: { available: { decrement: item.quantity } },
              });
            }
          })
        );

        // 4️⃣ Clear cart
        if (userId) await redis.del(cartKey);

        console.log("✅ Order and stock updated successfully");
      } catch (err) {
        console.error("⚠️ Error saving order or updating stock:", err);
        return new NextResponse("Error saving order", { status: 500 });
      }

      break;
    }

    default:
      console.log("⚙️ Unhandled Stripe event:", event.type);
  }

  return new NextResponse("Webhook received", { status: 200 });
}
