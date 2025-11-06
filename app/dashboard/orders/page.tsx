import prisma from "@/app/lib/db";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PenBoxIcon, XCircle } from "lucide-react";
import { PaginationComponent } from "@/app/components/PaginationComponent";

type SearchParamsProps = {
  searchParams: Promise<{ page?: string }>;
};

// 🔹 Pagination logic
async function getPaginatedOrders(
  page: number = 1,
  pageSize: number = 10
): Promise<{
  orders: any[];
  totalCount: number;
  totalPages: number;
}> {
  const skip = (page - 1) * pageSize;

  const [orders, totalCount] = await Promise.all([
    prisma.order.findMany({
      take: pageSize,
      skip,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        amount: true,
        createdAt: true,
        status: true,
        User: {
          select: {
            firstName: true,
            email: true,
            profileImage: true,
          },
        },
        shippingName: true,
        shippingLine1: true,
        shippingCity: true,
        shippingPostal: true,
        shippingCountry: true,
      },
    }),
    prisma.order.count(),
  ]);

  return {
    orders,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

export default async function OrdersPage({ searchParams }: SearchParamsProps) {
  noStore();

  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const { orders, totalCount, totalPages } = await getPaginatedOrders(
    currentPage
  );

  return (
    <>
      <div className="flex items-center justify-between mb-8 bg-accent-foreground/5 p-2">
        <h1 className="text-xl font-bold">Manage All Orders</h1>
        <div className="text-sm bg-primary text-gray-800 px-3 py-1 rounded-md">
          Total: {totalCount}
        </div>
      </div>

      {orders.length > 0 ? (
        <div className="flex flex-col gap-6">
          <Card className="rounded-xs">
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Shipping Info</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <p className="font-medium">{item.User?.firstName}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.User?.email ?? "No Email"}
                          </p>
                        </div>
                      </TableCell>

                      {/* Shipping Info */}
                      <TableCell>
                        <div className="flex flex-col">
                          <p className="font-medium">{item.shippingName}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.shippingLine1} {item.shippingCity}{" "}
                            {item.shippingPostal}, {item.shippingCountry}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>Order</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat("en-US").format(
                          item.amount / 100
                        )}{" "}
                        kr
                      </TableCell>

                      {/* Dropdown Actions */}
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-gray-400 rounded-none"
                          >
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/orders/${item.id}/updatestatus`}
                              >
                                <PenBoxIcon className="w-4 h-4 mr-2" />
                                Update Status
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/orders/${item.id}/delete`}
                              >
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
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      ) : (
        <div className="p-6 text-center text-muted-foreground">
          No orders found.
        </div>
      )}
    </>
  );
}
