// app/components/FavoritesButton.tsx
import { Heart } from "lucide-react";
import Link from "next/link";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function FavoritesButton() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // If user is not logged in, show nothing or a link to login
  if (!user) {
    return (
      <Link href="/login" className="relative">
        <Heart className="text-gray-800 h-7 w-7 hover:text-gray-500" />
      </Link>
    );
  }

  // Count favorites
  const favoritesCount = await prisma.favorite.count({
    where: {
      userId: user.id,
    },
  });

  return (
    <Link href="/favorites" className="relative">
      <Heart className="text-gray-800 h-7 w-7 hover:text-gray-500" />
      {favoritesCount > 0 && (
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white w-4 h-4 rounded-full text-xs flex items-center justify-center">
          {favoritesCount}
        </span>
      )}
    </Link>
  );
}
