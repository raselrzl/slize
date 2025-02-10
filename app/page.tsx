import { Button } from "@/components/ui/button";
import { LogoutLink ,LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Button asChild>
        <LoginLink>login</LoginLink>
      </Button>
      <Button asChild>
        <LogoutLink>logout</LogoutLink>
      </Button>
    </div>
  );
}
