import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function InvoicePaymentFailed() {
  return (
    <section className="w-full min-h-[50vh] flex items-center justify-center px-10 py-4">
      <Card className="w-[350px] border-none rounded-none shadow-xl">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <XCircle className="w-12 h-12 rounded-full bg-red-500/30 text-red-500 p-2" />
          </div>

          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">Payment Failed</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Something went wrong while processing your payment request. 
              You haven’t been charged. Please try again or contact support.
            </p>

            <Button
              asChild
              className="w-full mt-5 sm:mt-6 border border-gray-950/10 rounded-none h-9"
            >
              <Link href="/bag">Go To Bag</Link>
            </Button>

            <Button
              asChild
              className="w-full mt-2 border border-gray-950/10 rounded-none h-9"
            >
              <Link href="/">Back to Homepage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
