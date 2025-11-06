"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ArrowRight, LogOut, Package, LayoutDashboard } from "lucide-react";
import Link from "next/link";

interface iAppProps {
  email: string;
  name: string;
  userImage: string;
}

export function UserDropdown({ email, name, userImage }: iAppProps) {
  return (
    <DropdownMenu>
      {/* Avatar / Initial trigger */}
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <p className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 border border-gray-300 text-gray-700 font-semibold hover:bg-gray-200 transition-colors">
          {name?.slice(0, 1).toUpperCase()}
        </p>
      </DropdownMenuTrigger>

      {/* Dropdown content */}
      <DropdownMenuContent
        align="end"
        className="w-56 bg-white text-gray-800 rounded-xs shadow-lg border border-gray-200 py-2"
      >
        {/* Header section */}
        <DropdownMenuLabel className="flex flex-col space-y-1 pb-2 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-gray-500 truncate">{email}</p>
        </DropdownMenuLabel>

        {/* Dashboard (admin only) */}
        {email === "rasel6041@gmail.com" && (
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <LayoutDashboard className="h-4 w-4 text-gray-600" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}

        {/* Orders */}
        <DropdownMenuItem asChild>
          <Link
            href="/myorders"
            className="flex items-center gap-2 px-2 py-2 rounded-xs cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <Package className="h-4 w-4 text-gray-600" />
            <span>My Orders</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1" />

        {/* Logout */}
        <DropdownMenuItem asChild>
          <LogoutLink className="flex items-center gap-2 px-2 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xs transition-colors">
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
