import prisma from "@/app/lib/db";
import { HeroOneClient } from "./HeroOneClient";

export async function HeroOne() {
  const data = await prisma.banner.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return <HeroOneClient data={data} />;
}
