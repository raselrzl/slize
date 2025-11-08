import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import Link from "next/link";

export default function InvoicePaymentSuccess() {
  return (
    <section className="w-full min-h-[50vh] flex items-center justify-center px-10 py-4">
      <Card className="w-[350px] border-none rounded-none shadow-xl">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <FileText className="w-12 h-12 rounded-full bg-yellow-500/30 text-yellow-600 p-2" />
          </div>

          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">
              Order Placed Successfully
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Thank you for your order. You will receive your invoice within{" "}
              <strong>3 working days</strong>. Once payment is confirmed, we will notify you.
            </p>

            <Button
              asChild
              className="w-full mt-5 sm:mt-6 border border-gray-950/10 rounded-none h-9"
            >
              <Link href="/">Back to Shopping</Link>
            </Button>

            <Button
              asChild
              className="w-full mt-2 border border-gray-950/10 rounded-none h-9"
            >
              <Link href="/myorders">Check Order Status</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
