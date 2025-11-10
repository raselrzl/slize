import prisma from "@/app/lib/db";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PenBoxIcon, XCircle } from "lucide-react";
import { PaginationComponent } from "@/app/components/PaginationComponent";
import { OrderFilter } from "./OrderFilter";
import { DownloadInvoiceButton } from "./DownloadInvoiceButton";

type SearchParamsProps = {
  searchParams: Promise<{ page?: string; id?: string }>;
};

// 🔹 Pagination logic + optional ID filter
async function getPaginatedOrders(
  page: number = 1,
  pageSize: number = 10,
  idFilter?: string
): Promise<{
  orders: any[];
  totalCount: number;
  totalPages: number;
}> {
  const skip = (page - 1) * pageSize;

  const where = idFilter
    ? {
        id: {
          endsWith: idFilter,
        },
      }
    : {};

  const [orders, totalCount] = await Promise.all([
    prisma.order.findMany({
      take: pageSize,
      skip,
      where,
      orderBy: { createdAt: "desc" },
      include: {
        User: {
          select: {
            firstName: true,
            email: true,
          },
        },
        items: {
          select: {
            id: true,
            name: true,
            quantity: true,
            price: true,
            imageString: true,
          },
        },
      },
    }),
    prisma.order.count({ where }),
  ]);

  return {
    orders,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}


const handleDownloadInvoice = async (orderId: string) => {
  try {
    const res = await fetch(`/api/invoice/${orderId}`);
    if (!res.ok) throw new Error("Failed to fetch invoice");

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${orderId}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
    alert("Failed to download invoice.");
  }
};


export default async function OrdersPage({ searchParams }: SearchParamsProps) {
  noStore();

  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const idFilter = params.id || "";

  const { orders, totalCount, totalPages } = await getPaginatedOrders(
    currentPage,
    10,
    idFilter
  );

  return (
    <>
      <div className="flex items-center justify-between mb-8 bg-accent-foreground/5 p-2">
        <h1 className="text-xl font-bold">Manage All Orders</h1>
        <div className="flex items-center gap-2">
          {/* 🔹 Filter Input */}
         <OrderFilter />
          <div className="text-sm bg-primary text-gray-800 px-3 py-1 rounded-md">
            Total: {totalCount}
          </div>
        </div>
      </div>

      {orders.length > 0 ? (
        <div className="flex flex-col gap-6">
          <Card className="rounded-xs">
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Shipping Info</TableHead>
                    <TableHead>Payment By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Delivery status</TableHead>
                    <TableHead>Invoice Status</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {orders.map((item) => (
                    <TableRow key={item.id}>
                      {/* 🔹 Order ID (last 6 digits) */}
                      <TableCell>
                        <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded uppercase font-bold">
                          {item.id.slice(-6)}
                        </span>
                      </TableCell>

                      {/* Customer Info */}
                      <TableCell>
                        <div className="flex flex-col">
                          <p className="font-medium">{item.User?.firstName ?? "Guest"}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.User?.email ?? item.email ?? "No Email"}
                          </p>
                        </div>
                      </TableCell>

                      {/* Shipping Info */}
                      <TableCell>
                        <div className="flex flex-col text-xs">
                          <p className="font-medium">{item.shippingName ?? "-"}</p>
                          <p className="text-muted-foreground">
                            {[item.shippingLine1, item.shippingLine2, item.shippingCity, item.shippingPostal, item.shippingCountry]
                              .filter(Boolean)
                              .join(", ") || "-"}
                          </p>
                        </div>
                      </TableCell>

                      {/* Payment Method */}
                      <TableCell>
                        {item.paymentMethod === "invoice" ? (
                          <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 px-2 py-1">
                            Invoice
                          </span>
                        ) : item.paymentMethod === "direct" ? (
                          <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1">
                            Direct Payment
                          </span>
                        ) : (
                          <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-2 py-1">
                            Unknown
                          </span>
                        )}
                      </TableCell>

                      {/* Order Status */}
                      <TableCell>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${
                            item.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : item.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </TableCell>

                      {/* Delivery Status */}
                      <TableCell>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${
                            item.deliveryStatus === "delivered"
                              ? "bg-green-100 text-green-700"
                              : item.deliveryStatus === "shipped"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {item.deliveryStatus ?? "Not Shipped"}
                        </span>
                      </TableCell>

                      {/* Invoice Status */}
                      <TableCell>
                        {item.invoiceStatus ? (
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded ${
                              item.invoiceStatus === "paid"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {item.invoiceStatus}
                          </span>
                        ) : (
                          "-"
                        )}
                      </TableCell>

                      {/* Order Date */}
                      <TableCell>
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>

                      {/* Amount */}
                      <TableCell className="text-right">
                        {new Intl.NumberFormat("en-US").format(item.amount / 100)} kr
                      </TableCell>

                      {/* Dropdown Actions */}
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-gray-400 rounded-none">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/orders/${item.id}/details`}>
                                <PenBoxIcon className="w-4 h-4 mr-2" />
                                View Details
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/orders/${item.id}/updateInvoiceStatus`}>
                                <PenBoxIcon className="w-4 h-4 mr-2" />
                                Update Invoice Status
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/orders/${item.id}/updateorderStatus`}>
                                <PenBoxIcon className="w-4 h-4 mr-2" />
                                Update Order Status
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/orders/${item.id}/updatedeliverystatus`}>
                                <PenBoxIcon className="w-4 h-4 mr-2" />
                                Update Delivery Status
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                              <DownloadInvoiceButton orderId={item.id} />
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/orders/${item.id}/delete`}>
                                <XCircle className="w-4 h-4 mr-2 text-red-600" />
                                Delete
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pagination */}
          <PaginationComponent totalPages={totalPages} currentPage={currentPage} />
        </div>
      ) : (
        <div className="p-6 text-center text-muted-foreground">No orders found.</div>
      )}
    </>
  );
}
