"use client";

import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Heart, ShoppingBag } from "lucide-react";

export default function HeartLogin({ productId }: { productId: string }) {
  return (
    <LoginLink postLoginRedirectURL={`/product/${productId}`}>
      <button>
        <Heart className="w-8 h-8 fill-white text-gray-200 mt-2" />
      </button>
    </LoginLink>
  );
}
