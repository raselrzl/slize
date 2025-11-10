import { NextResponse } from "next/server";
import jsPDF from "jspdf";
import fs from "fs";
import path from "path";
import prisma from "@/app/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ invoiceId: string }> }
) {
  const { invoiceId } = await params;

  try {
    // Fetch order with items and user
    const order = await prisma.order.findUnique({
      where: { id: invoiceId },
      include: {
        User: { select: { firstName: true, lastName: true, email: true } },
        items: { include: { Product: { select: { name: true, category: true } } } },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const itemsTotal = order.items.reduce(
      (sum, item) => sum + (item.price || 0) * item.quantity,
      0
    );
    const totalAmount = itemsTotal + (order.deliveryFee || 0);

    // Load logo
    const logoPath = path.join(process.cwd(), "public", "/logo/kron.png");
    let logoBase64 = null;
    if (fs.existsSync(logoPath)) {
      logoBase64 = fs.readFileSync(logoPath, { encoding: "base64" });
    }

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    pdf.setFont("helvetica");

    // Logo
    if (logoBase64) {
      pdf.addImage(logoBase64, "PNG", 130, 15, 70, 20);
    }

    // Header
    pdf.setFontSize(24);
    pdf.text("Invoice", 20, 20);

    let y = 45;

    // From Section (Company)
    pdf.setFontSize(12);
    pdf.text("From", 20, y);
    pdf.setFontSize(10);
    pdf.text("Kronstil.store", 20, y + 5);
    pdf.text("contact@kronstil.store", 20, y + 10);
    pdf.text("Finspångsvägen 497, 605 80 Svärtinge", 20, y + 15);

    // Invoice To (Customer)
    y += 35;
    pdf.setFontSize(12);
    pdf.text("Invoice to", 20, y);
    pdf.setFontSize(10);
    pdf.text(`${order.User?.firstName ?? ""} ${order.User?.lastName ?? ""}`, 20, y + 5);
    pdf.text(order.User?.email ?? "", 20, y + 10);
    pdf.text(
      [order.shippingLine1, order.shippingLine2, order.shippingCity, order.shippingPostal, order.shippingCountry]
        .filter(Boolean)
        .join(", "),
      20,
      y + 15
    );

    // Order Info
    y += 35;
    pdf.setFontSize(10);
    pdf.text(`Invoice Reference: #${order.id.slice(-6)}`, 120, y);
    pdf.text(`Order Date: ${new Intl.DateTimeFormat("en-US").format(order.createdAt)}`, 120, y + 5);

    // Item Table Header
    y += 20;
    pdf.setFont("helvetica", "bold");
    pdf.text("Description", 20, y);
    pdf.text("Quantity", 100, y);
    pdf.text("Price", 130, y);
    pdf.text("Subtotal", 160, y);
    pdf.line(20, y + 2, 190, y + 2);

    // Items
    y += 10;
    pdf.setFont("helvetica", "normal");
    order.items.forEach((item) => {
      const name = item.name || item.Product?.name || "Item";
      pdf.text(name, 20, y);
      pdf.text(item.quantity.toString(), 100, y);
      pdf.text(((item.price || 0) / 100).toFixed(2) + " kr", 130, y);
      pdf.text(((item.price || 0) * item.quantity / 100).toFixed(2) + " kr", 160, y);
      y += 8;
    });

    // Line & Total
    pdf.line(20, y, 190, y);
    y += 5;
    pdf.setFont("helvetica", "bold");
    pdf.text("Total:", 130, y);
    pdf.text((totalAmount / 100).toFixed(2) + " kr", 160, y);

    // Footer
    y = 270;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text("Finspångsvägen 497, 605 80 Svärtinge | Phone: 010-333 35 36 | Email: contact@kronstil.store", 20, y);
    pdf.text("Swish | Betalkort | IBAN: 545464665765", 20, y + 5);

    const buffer = Buffer.from(pdf.output("arraybuffer"));

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=invoice-${order.id.slice(-6)}.pdf`,
      },
    });
  } catch (error) {
    console.error("Invoice generation error:", error);
    return NextResponse.json({ error: "Failed to generate invoice PDF" }, { status: 500 });
  }
}
