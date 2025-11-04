// app/dashboard/banner/page.tsx
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PageProps } from "next/types";
import { Skeleton } from "@/components/ui/skeleton"; // assume you have a Skeleton component

export interface Banner {
  id: string;
  title: string;
  imageString: string;
  createdAt: Date;
}

async function getData(page: number, perPage: number) {
  const skip = (page - 1) * perPage;
  const [data, totalCount] = await Promise.all([
    prisma.banner.findMany({
      skip,
      take: perPage,
      orderBy: { createdAt: "desc" },
    }),
    prisma.banner.count(),
  ]);
  return { data, totalCount };
}

export default async function BannerRoute({ searchParams }: PageProps) {
  noStore();

  const pageParam = Array.isArray(searchParams?.page)
    ? searchParams.page[0]
    : searchParams?.page;

  const currentPage = Number(pageParam) || 1;
  const perPage = 10;

  const { data, totalCount } = await getData(currentPage, perPage);
  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <>
      {/* Add Banner Button */}
      <div className="flex items-center justify-end">
        <Button asChild className="flex gap-x-2 rounded-none" variant="destructive">
          <Link
            href="/dashboard/banner/create"
            className="bg-gray-500 hover:bg-gray-400"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Add Banner</span>
          </Link>
        </Button>
      </div>

      <Card className="mt-5 border border-gray-400 rounded-none">
        <CardHeader>
          <CardTitle>Banners ({totalCount})</CardTitle>
          <CardDescription>Manage your banners</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.length === 0 ? (
                // Skeleton loading
                Array.from({ length: perPage }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-16 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-32" />
                    </TableCell>
                    <TableCell className="text-end">
                      <Skeleton className="h-6 w-10 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                data.map((item: Banner) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Image
                        alt="Banner Image"
                        src={item.imageString}
                        width={64}
                        height={64}
                        className="object-contain h-16 w-16"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell className="text-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost" className="rounded-none">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-none bg-gray-300">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild className="rounded-none">
                            <Link href={`/dashboard/banner/${item.id}/delete`}>
                              Delete
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious href={`?page=${currentPage - 1}`} />
                    </PaginationItem>
                  )}

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href={`?page=${i + 1}`}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext href={`?page=${currentPage + 1}`} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
