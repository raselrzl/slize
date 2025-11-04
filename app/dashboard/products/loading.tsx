import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-end">
        <div className="h-9 w-32 bg-gray-200 animate-pulse rounded-none" />
      </div>

      <Card className="mt-5 rounded-none">
        <CardHeader>
          <CardTitle className="h-6 w-32 bg-gray-200 animate-pulse rounded-none" />
          <CardDescription className="h-4 w-60 bg-gray-100 animate-pulse mt-2 rounded-none" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="h-16 w-16 bg-gray-200 animate-pulse rounded-md" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-32 bg-gray-200 animate-pulse rounded-none" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-20 bg-gray-200 animate-pulse rounded-none" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-16 bg-gray-200 animate-pulse rounded-none" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded-none" />
                  </TableCell>
                  <TableCell className="text-end">
                    <div className="h-4 w-8 bg-gray-200 animate-pulse rounded-none ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Skeleton pagination */}
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-9 w-9 bg-gray-200 animate-pulse rounded-none"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
