"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navbarLinks = [

  {
    id: 1,
    name: "All",
    href: "/products/all",
  },
  {
    id: 2,
    name: "Boy",
    href: "/products/men",
  },
  {
    id: 3,
    name: "Girls",
    href: "/products/women",
  },
  {
    id: 4,
    name: "Newborn",
    href: "/products/kids",
  },
];

export function NavbarLinks() {
  const location = usePathname();
  return (
    <div className="md:flex justify-center items-center gap-x-2 ml-8">
      {navbarLinks.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className={cn(
            location === item.href
              ? "bg-[#9b3e22] text-white"
              : "hover:bg-muted hover:bg-opacity-75",
            "group p-2 font-semibold rounded-md"
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
