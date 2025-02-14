import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface iAppProps {
  email: string;
  name: string;
  userImage: string;
}

export function UserDropdown({ email, name, userImage }: iAppProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userImage} alt="User Image" />
            <AvatarFallback className="font-bold">{name.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-red-900 text-white" align="end" forceMount>
        <DropdownMenuLabel className="flex flex-col space-y-1">
          <p className="text-md font-semibold leading-none">{name}</p>
          <p className="text-xs leading-none text-muted-foreground">{email}</p>
        </DropdownMenuLabel>
        
        
        <DropdownMenuItem>
        {email === "rasel6041@gmail.com" && (
        <Link href="/dashboard" className="flex mb-2">
          Dashboard <ArrowRight className="pt-1" />
        </Link>
      )} </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutLink>Log out</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
