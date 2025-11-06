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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const metadata = session.metadata || {};
    const userId = metadata.userId;
    const cartItems = metadata.cart ? JSON.parse(metadata.cart) : [];

    try {
      // 1️⃣ Create order
      const order = await prisma.order.create({
        data: {
          userId,
          status: "paid",
          invoiceStatus: "paid",
          amount: session.amount_total ?? 0,
        },
      });

      // 2️⃣ Decrement stock and create order items
      await Promise.all(
        cartItems.map(async (item: any) => {
          const product = await prisma.product.findUnique({
            where: { id: item.productId },
          });
          if (!product) return;

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

          await prisma.product.update({
            where: { id: product.id },
            data: { available: { decrement: item.quantity } },
          });
        })
      );

      // 3️⃣ Clear cart
      if (userId) await redis.del(`cart-${userId}`);

      console.log("✅ Order created and stock decremented");
    } catch (err) {
      console.error("⚠️ Webhook error:", err);
      return new NextResponse("Error processing order", { status: 500 });
    }
  }

  return new NextResponse("Webhook received", { status: 200 });
}
