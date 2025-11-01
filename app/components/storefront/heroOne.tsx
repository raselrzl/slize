import prisma from "@/app/lib/db";
import { FileQuestion } from "lucide-react";

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: { createdAt: "desc" },
    take: 4,
  });
  return data;
}

export async function HeroOne() {
  const data = await getData();
  const footerColors = [
    "bg-pink-800",
    "bg-blue-800",
    "bg-green-800",
    "bg-yellow-800",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="flex justify-between items-center mt-4 mb-3">
        <h1 className="font-semibold text-lg leading-tight">
          Don’t Miss Out <br />
          Boys, Girls and Babies
        </h1>
        <FileQuestion className="w-6 h-6 text-gray-600" />
      </div>

      {/* Banner Grid / Scrollable Row */}
      <div
        className="
          flex md:grid md:grid-cols-4
          gap-4
          overflow-x-auto md:overflow-visible
          pb-4
          scroll-smooth
          snap-x snap-mandatory
        "
      >
        {data.map((item, i) => (
          <div
            key={item.id}
            className="
              relative
              flex-shrink-0
              w-[180px] h-[180px]
              md:w-[260px] md:h-[260px]
              border border-gray-300
              overflow-hidden
              snap-start
            "
          >
            {/* Image (fills above footer) */}
            <img
              src={item.imageString}
              alt={item.title}
              className="w-full h-full object-cover"
            />

            {/* Footer bar */}
            <div
              className={`
                absolute bottom-0 left-0
                w-full h-[40px] md:h-[60px]
                flex items-center justify-center
                text-white text-sm font-semibold
                ${footerColors[i % footerColors.length]}
              `}
            >
              {item.title || "Untitled"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
