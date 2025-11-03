"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Links = [

    {
    id: 1,
    name: "Home",
    href: "/",
  },
  {
    id: 2,
    name: "Exclusive-Girls",
    href: "/products/exclusivegirls",
  },
  {
    id: 3,
    name: "Exclusive-Boys",
    href: "/products/exclusiveboys",
  },
 {
    id: 4,
    name: "Exclusive-Newborn",
    href: "/products/exclusivebaby",
  },
];

export function AllLinks() {
  const location = usePathname();

  return (
    <div className="max-w-7xl mx-auto flex flex-wrap gap-2 mb-4 pl-2 md:pl-0">
      {Links.map((item) => {
        const isActive = location === item.href;
        return (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "text-sm font-semibold transition-colors duration-200",
              isActive
                ? "text-gray-400 underline underline-offset-4"
                : "text-gray-800 hover:text-gray-600 hover:underline hover:underline-offset-4"
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}
