"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function FavoritesButton() {
  // Always show heart icon
  const heartIcon = (
    <Heart className="text-gray-800 h-7 w-7 hover:text-gray-500" />
  );

  return (
    // LoginLink handles login redirect if user is not logged in
    <LoginLink href="/favorites">
      {heartIcon}
    </LoginLink>
  );
}
