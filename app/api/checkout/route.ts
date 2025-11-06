import { stripe } from "@/app/lib/stripe";
import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, deliveryFee = 0 } = body;

    if (!userId) return new NextResponse("UserId is required", { status: 400 });

    // 1️⃣ Get cart from Redis
    const cartKey = `cart-${userId}`;
    const cartData: string | null = await redis.get(cartKey);
    const cartItems = cartData ? JSON.parse(cartData) : [];

    if (!cartItems || cartItems.length === 0)
      return new NextResponse("Cart is empty", { status: 400 });

    // 2️⃣ Check stock availability before creating session
    const unavailableProducts: string[] = [];

    for (const item of cartItems) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });
      if (!product || product.available < item.quantity) {
        unavailableProducts.push(product?.name || item.productId);
      }
    }

    if (unavailableProducts.length > 0) {
      return new NextResponse(
        `Out of stock: ${unavailableProducts.join(", ")}`,
        { status: 400 }
      );
    }

    // 3️⃣ Calculate total
    let amountTotal = 0;
    for (const item of cartItems) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });
      if (product) amountTotal += product.price * item.quantity;
    }
    amountTotal += deliveryFee;

    // 4️⃣ Create Stripe checkout session (only if available)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: item.price * 100, // in cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      metadata: {
        userId,
        deliveryFee: deliveryFee.toString(),
        cart: JSON.stringify(cartItems), // pass cart items to webhook
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
