import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>; // params typed as a Promise
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      User: { select: { firstName: true, lastName: true, email: true } },
      items: { include: { Product: { select: { name: true, images: true, category: true } } } },
    },
  });

  if (!order) return notFound();

  const totalAmount = order.items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Order Details</h1>
        <Button asChild>
          <Link href="/dashboard/orders">⬅ Back to Orders</Link>
        </Button>
      </div>

      {/* Customer & Shipping */}
      <Card className="rounded-none mb-6">
        <CardHeader>
          <CardTitle>Customer & Shipping Info</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-medium">Customer</h3>
            <p>{order.User?.firstName ?? ""} {order.User?.lastName ?? ""}</p>
            <p className="text-muted-foreground">{order.User?.email ?? order.email ?? "No Email"}</p>
          </div>
          <div>
            <h3 className="font-medium">Shipping</h3>
            <p>{order.shippingName}</p>
            <p>{order.shippingLine1} {order.shippingLine2}</p>
            <p>{order.shippingCity}, {order.shippingPostal}</p>
            <p>{order.shippingCountry}</p>
          </div>
          <div>
            <h3 className="font-medium">Status</h3>
            <p>Order: {order.status}</p>
            <p>Delivery: {order.deliveryStatus ?? "Not Shipped"}</p>
            <p>Invoice: {order.invoiceStatus ?? "Pending"}</p>
          </div>
          <div>
            <h3 className="font-medium">Order Info</h3>
            <p>Created: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Delivery Fee: {order.deliveryFee ? (order.deliveryFee / 100).toFixed(2) + " kr" : "0 kr"}</p>
            <p className="font-semibold">Total: {(totalAmount / 100).toFixed(2)} kr</p>
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card className="rounded-none">
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="flex items-center gap-2">
                    {item.Product?.images[0] && (
                      <img src={item.Product.images[0]} alt={item.name ?? "Product"} className="w-10 h-10 object-cover" />
                    )}
                    <span>{item.name}</span>
                  </TableCell>
                  <TableCell>{item.Product?.category}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="text-right">{(item.price! / 100).toFixed(2)} kr</TableCell>
                  <TableCell className="text-right">{((item.price! * item.quantity) / 100).toFixed(2)} kr</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
