import prisma from "@/app/lib/db";
import { emailClient } from "@/app/lib/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ invoiceId: string }> }
) {
  try {
    const { invoiceId } = await params;

    // 🔹 Fetch order with items
    const order = await prisma.order.findUnique({
      where: { id: invoiceId },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order/Invoice not found" }, { status: 404 });
    }

    const recipientEmail = order.email;
    const recipientName = order.fullName ?? "Customer";

    if (!recipientEmail) {
      return NextResponse.json({ error: "Order has no email to send to" }, { status: 400 });
    }

    const sender = {
      email: "contact@kronstil.store",
      name: "Kronstil",
    };

    // 🔹 Calculate invoice dates
    const invoiceDate = order.createdAt || new Date();
    const dueDate = new Date(invoiceDate);
    dueDate.setDate(invoiceDate.getDate() + 30); // 30 days later

    // 🔹 Calculate subtotal and delivery
    const subtotal = order.items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
    const deliveryFee = order.deliveryFee || 0;
    const totalAmount = subtotal + deliveryFee;

    // 🔹 Prepare HTML for items
    const invoiceItemsHtml = order.items
      .map(
        (item) => `
        <tr>
          <td>${item.name}</td>
          <td style="text-align:center;">${item.quantity}</td>
          <td style="text-align:right;">${((item.price || 0) / 100).toFixed(2)} SEK</td>
          <td style="text-align:right;">${(((item.price || 0) * item.quantity) / 100).toFixed(2)} SEK</td>
        </tr>`
      )
      .join("");

    const invoiceLink =
      process.env.NODE_ENV !== "production"
        ? `http://localhost:3000/api/invoice/${order.id}`
        : `https://kronstil.store/api/invoice/${order.id}`;

    // 🔹 Send email with full order info
    await emailClient.send({
      from: sender,
      to: [{ email: recipientEmail }],
      template_uuid: "c7008e52-87ae-4eac-9406-74e71b3f8244",
      template_variables: {
        client_name: recipientName,
        invoice_number: String(order.id).slice(-6),
        invoice_date: new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(invoiceDate),
        invoice_due_date: new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(dueDate),
        invoice_subtotal: (subtotal / 100).toFixed(2) + " SEK",
        invoice_delivery: (deliveryFee / 100).toFixed(2) + " SEK",
        invoice_total: (totalAmount / 100).toFixed(2) + " SEK",
        invoice_items_html: invoiceItemsHtml,
        invoice_link: invoiceLink,
        current_year: new Date().getFullYear(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send invoice email:", error);
    return NextResponse.json(
      { error: "Failed to send invoice email" },
      { status: 500 }
    );
  }
}
