import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/app/lib/db";
import { ProductCard } from "@/app/components/storefront/ProductCard";

async function getData(userId: string) {
  noStore();

  const data = await prisma.favorite.findMany({
    where: {
      userId,
    },
    select: {
      id: true, // favoriteId
      product: {
        // ✅ match your relation name in schema
        select: {
          id: true,
          name: true,
          images: true,
          price: true,
          description: true,
          category: true,
          available: true,
          inputPrice: true,
          discount: true,
        },
      },
    },
  });

  // Remove any null products just in case
  return data.filter((fav) => fav.product !== null);
}

export default async function FavoriteRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/");

  const favorites = await getData(user.id);

  return (
    <section className="container mx-auto max-w-7xl mt-8">
      <h2 className="text-3xl font-semibold tracking-tight text-center">
        My Favorite Products
      </h2>

      {favorites.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">No favourites found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
          {favorites.map((fav) => (
            <ProductCard key={fav.product!.id} item={fav.product!} />
          ))}
        </div>
      )}
    </section>
  );
}
