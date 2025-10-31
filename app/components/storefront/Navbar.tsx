import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBagIcon } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { redis } from "@/app/lib/redis";
import { Cart } from "@/app/lib/interfaces";
import Image from "next/image";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const cart: Cart | null = await redis.get(`cart-${user?.id}`);

  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <>
      <nav className="w-full max-w-7xl mx-auto px-0 sm:px-0 lg:px-0 py-4 flex items-center justify-between bg-[#f4f4f4]">
        <div className="flex items-center">
          <Link href="/" className="hidden md:block">
            {/* This link is visible on medium screens and above (desktop/tablet) */}
            <Image
              src="/logo/lg2.png"
              alt="Kron Word Logo"
              width={200}
              height={160}
              className="md:w-full md:h-full h-[40px] w-[60px]"
            />
          </Link>

          <Link href="/" className="block md:hidden">
            {/* This link is visible only on small screens (mobile) */}
            <Image
              src="/logo/lg2.png"
              alt="Kron Word Logo"
              width={200}
              height={160}
              className="md:w-full md:h-full h-[35px] w-[140px]"
            />
          </Link>
        </div>
        <div className="hidden md:block">
          <NavbarLinks />
        </div>

        <div className="flex items-center">
          {user ? (
            <>
              <Link href="/bag" className="group p-2 flex items-center mr-2">
                <div className="relative">
                  <ShoppingBagIcon className="h-6 w-6 text-red-800 group-hover:text-red-600" />
                  <span className="absolute top-0 right-0 text-xs text-black group-hover:text-gray-800 transform translate-x-1/2 -translate-y-1/2 bg-red-600 p-2 rounded-full w-5 h-5 flex items-center justify-center">
                    {total}
                  </span>
                </div>
              </Link>

              <UserDropdown
                email={user.email as string}
                name={user.given_name as string}
                userImage={
                  user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
                }
              />
            </>
          ) : (
            <div className="flex md:flex md:flex-1 md:items-center md:justify-end md:space-x-1">
              <Button variant="ghost" asChild>
                <LoginLink>Sign in</LoginLink>
              </Button>
              <span className="h-6 w-px bg-gray-400 self-center"></span>
              <Button variant="ghost" asChild>
                <RegisterLink>Register</RegisterLink>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
