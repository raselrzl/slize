import prisma from "@/app/lib/db";
import { emailClient } from "@/app/lib/mailtrap";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ invoiceId: string }> }
) {


    const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "rasel6041@gmail.com") {
    return redirect("/");
  }

  try {
    const { invoiceId } = await params; 

    // 🔹 Fetch the order (invoice) from the database
    const order = await prisma.order.findUnique({
      where: { id: invoiceId },
      include: { items: true }, // optional, if you want to include items in template
    });

    if (!order) {
      return NextResponse.json({ error: "Order/Invoice not found" }, { status: 404 });
    }

    // 🔹 Determine recipient
    const recipientEmail = order.email;
    const recipientName = order.fullName ?? "Customer";

    if (!recipientEmail) {
      return NextResponse.json({ error: "Order has no email to send to" }, { status: 400 });
    }

    const sender = {
      email: "contact@kronstil.store",
      name: "KRONSTIL",
    };

    // 🔹 Send invoice email
    await emailClient.send({
      from: sender,
      to: [{ email: recipientEmail }],
      template_uuid: "0eab2b91-8c53-44e7-a24c-ecf58ffd8899",
      template_variables: {
        first_name: recipientName,
        company_info_name: "Slize",
        company_info_city: "Norrköping",
        company_info_zip_code: "60219",
        company_info_country: "Sweden",
        invoice_id: order.id.slice(-6),
        total_amount: ((order.amount || 0) / 100).toFixed(2),
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
