import { ProductCard } from "@/app/components/storefront/ProductCard";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { CategoryRenderer } from "@/app/components/category/CategoryRenderer";

async function getData(productCategory: string) {
  switch (productCategory) {
    case "all": {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
        where: {
          status: "published",
        },
      });

      return {
        title: "All Products",
        data: data,
      };
    }
    case "boys": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
           category: {
        in: ["kidboysfourtofive", "toddlerboys"],
      },
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Products for Men",
        data: data,
      };
    }
    case "girls": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
           category: {
        in: ["kidgirlsfourtofive", "toddlergirls"],
      },
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Products to Women",
        data: data,
      };
    }
    case "kids": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "kids",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Products for Kids",
        data: data,
      };
    }

    case "baby": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "baby",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Products for baby",
        data: data,
      };
    }

    case "toddlergirls": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "toddlergirls",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Products for toddlergirls",
        data: data,
      };
    }

    case "toddlerboys": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "toddlerboys",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Products for toddlerboys",
        data: data,
      };
    }

    case "kidgirlsfourtofive": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "kidgirlsfourtofive",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Products for kidgirlsfourtofive",
        data: data,
      };
    }

    case "kidboysfourtofive": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "kidboysfourtofive",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Products for kidboysfourtofive",
        data: data,
      };
    }

    case "exclusivegirls": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          isFeatured: true,
             category: {
        in: ["kidgirlsfourtofive", "toddlergirls"], 
      },
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Products for Exclusive",
        data: data,
      };
    }

     case "exclusivebaby": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          isFeatured: true,
          category: "baby"
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Products for exclusivebaby",
        data: data,
      };
    }

      case "exclusiveboys": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          isFeatured: true,
          category: {
        in: ["kidboysfourtofive", "toddlerboys"],
      },
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Products for exclusivebaby",
        data: data,
      };
    }
    

    default: {
      return notFound();
    }
  }
}

export default async function CategoriesPage({
  params: paramsPromise,
}: {
  params: Promise<{ name: string }>;
}) {
  noStore();
  const params = await paramsPromise;
  const { data, title } = await getData(params.name);
  console.log("params name", params.name);

  const bgColor =
      params.name === "exclusivegirls"
    ? "bg-[#8e6b48]"
    : params.name === "exclusivebaby"
    ? "bg-red-100"
    : "bg-white";

  return (
    <section>
      <CategoryRenderer category={params.name} />
      <div className={`px-2 md:px-0 ${bgColor}`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 max-w-7xl mx-auto py-4">
          {data.map((item) => (
            <ProductCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
