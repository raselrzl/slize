"use client";

import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ShoppingBag } from "lucide-react";

export default function AuthAddToBag({ productId }: { productId: string }) {
  return (
    <div className="w-full flex flex-col gap-2">
      <Button asChild size="lg" className="w-full mt-5 bg-black text-white rounded-none hover:bg-gray-800">
        <LoginLink postLoginRedirectURL={`/product/${productId}`}>
          <ShoppingBag className="mr-4 h-5 w-5" /> Add to Bag
        </LoginLink>
      </Button>
    </div>
  );
}
