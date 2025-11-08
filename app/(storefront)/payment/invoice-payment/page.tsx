"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function InvoicePaymentSuccess() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border border-gray-200 rounded-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="text-green-600" size={72} />
            </div>
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Order Placed Successfully 🎉
            </CardTitle>
          </CardHeader>

          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Thank you for your purchase! You will receive your invoice within{" "}
              <strong>3 working days</strong>.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
              <Button
                onClick={() => router.push("/")}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md"
              >
                🏠 Go to Homepage
              </Button>
              <Button
                onClick={() => router.push("/myorders")}
                variant="outline"
                className="border-gray-400 hover:bg-gray-100 px-6 py-2 rounded-md"
              >
                📦 Check Order Status
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
