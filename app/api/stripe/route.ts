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

      if (!orderId || !userId) {
        console.warn("Order or User ID is missing in metadata");
        return new NextResponse("Missing metadata", { status: 400 });
      }

      try {
        // 1️⃣ Fetch the existing order
        const order = await prisma.order.findUnique({
          where: { id: orderId },
          include: { items: true },
        });

        // Check if the order was found
        if (!order) {
          console.warn(`Order ${orderId} not found`);
          return new NextResponse("Order not found", { status: 404 });
        }

        // 2️⃣ Update order with payment + shipping info
        await prisma.order.update({
          where: { id: orderId },
          data: {
            status: "paid",
            invoiceStatus: "paid",
            fullName: session.customer_details?.name || session.shipping_details?.name,
            phone: session.customer_details?.phone,
            email: session.customer_details?.email,
            shippingName: session.shipping_details?.name,
            shippingLine1: session.shipping_details?.address?.line1,
            shippingLine2: session.shipping_details?.address?.line2,
            shippingCity: session.shipping_details?.address?.city,
            shippingPostal: session.shipping_details?.address?.postal_code,
            shippingCountry: session.shipping_details?.address?.country,
          },
        });

        // 3️⃣ Decrement stock for each order item
        await Promise.all(
          order.items.map(async (item) => {
            if (!item.productId) return;

            const product = await prisma.product.findUnique({
              where: { id: item.productId },
            });

            if (product && product.available >= item.quantity) {
              await prisma.product.update({
                where: { id: item.productId },
                data: { available: { decrement: item.quantity } },
              });
            } else {
              console.warn(`Not enough stock for product ${item.productId}`);
              // Optionally, handle the out-of-stock scenario, e.g., notify the user
            }
          })
        );

        // 4️⃣ Clear Redis cart
        if (userId) {
          await redis.del(`cart-${userId}`);
        }

        console.log("✅ Order updated, stock decremented, cart cleared");
      } catch (err) {
        console.error("⚠️ Error updating order or stock:", err);
        return new NextResponse("Error updating order", { status: 500 });
      }

      break;
    }

    default:
      console.log("⚙️ Unhandled Stripe event:", event.type);
  }

  return new NextResponse("Webhook received", { status: 200 });
}


