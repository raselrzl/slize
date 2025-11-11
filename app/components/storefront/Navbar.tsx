import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Heart, ShoppingBagIcon, User2 } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { redis } from "@/app/lib/redis";
import { Cart } from "@/app/lib/interfaces";
import Image from "next/image";
import FavoritesButton from "./FavoritesButton";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const cart: Cart | null = await redis.get(`cart-${user?.id}`);

  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <>
      <nav className="w-full max-w-7xl mx-auto px-2 md:px-0 py-4 grid grid-cols-2 items-center">
        {/* Left - Navbar Links (hidden on mobile) */}
        {/*  <div className="hidden md:flex justify-start">
          <NavbarLinks />
        </div> */}

        {/* Center on desktop / Left on mobile */}
        <div className="flex justify-start items-center">
          <Link href="/">
            <Image
              src="/logo/kron.png"
              alt="Kron Word Logo"
              width={200}
              height={160}
              className="h-[35px] w-[140px]"
            />
          </Link>
        </div>

        {/* Right section */}
        <div className="flex justify-end items-center gap-2">
          {user ? (
            <>
              <FavoritesButton />
              <span className="h-6 w-px bg-gray-400 self-center"></span>
              <Link href="/bag" className="group p-2 flex items-center mr-2">
                <div className="relative">
                  <ShoppingBagIcon className="text-gray-800 h-7 w-7 mr-2 hover:text-gray-500" />
                  <span className="absolute top-0 right-0 text-xs font-bold text-gray-300 group-hover:text-gray-200 transform translate-x-1/2 -translate-y-1/2 bg-gray-800 p-2 rounded-full w-5 h-5 flex items-center justify-center">
                    {total}
                  </span>
                </div>
              </Link>
              <span className="h-6 w-px bg-gray-400 self-center"></span>
              <UserDropdown
                email={user.email as string}
                name={user.given_name as string}
                userImage={
                  user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
                }
              />
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <LoginLink>
                <ShoppingBagIcon className="text-gray-800 h-7 w-7 hover:text-gray-500" />
              </LoginLink>
              <span className="h-6 w-px bg-gray-400 self-center"></span>
              <LoginLink>
                {" "}
                <Heart className="text-gray-800 h-7 w-7 hover:text-gray-500" />
              </LoginLink>

              <span className="h-6 w-px bg-gray-400 self-center"></span>
              <LoginLink>
                <User2 className="text-gray-800 h-7 w-7 hover:text-gray-500" />
              </LoginLink>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
