import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function SuccessRoute() {
  return (
    <section className="w-full min-h-[50vh] flex items-center justify-center px-10 py-4">
      <Card className="w-[350px] border-none rounded-none shadow-xl">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <Check className="w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2" />
          </div>

          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">
              Payment Successfull
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Congrats to your purchase. Your payment was succesfull. You can check every update of my order page.
            </p>

            <Button asChild className="w-full mt-5 sm:mt-6 border border-gray-950/10 rounded-none h-9">
              <Link href="/">Back to Shoping</Link>
            </Button>
            <Button asChild className="w-full mt-2 border border-gray-950/10 rounded-none h-9">
              <Link href="/myorders">Check Order Status</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
