"use client";
import { useState, useMemo } from "react";
import { ProductCard } from "@/app/components/storefront/ProductCard";
import ProductFilterBar from "@/app/components/storefront/ProductFilterBar";

export default function ProductListWithFilter({ data }: { data: any[] }) {
  const [filters, setFilters] = useState({
    category: "all",
    sort: "newest",
    price: "all",
  });

  const clearFilters = () => {
    setFilters({ category: "all", sort: "newest", price: "all" });
  };

  const filteredData = useMemo(() => {
    let filtered = [...data];

    // CATEGORY FILTER
    if (filters.category !== "all") {
      filtered = filtered.filter((p) => {
        if (!p.category) return false;

        // Some categories in DB are arrays (like "boys" => ["kidboysfourtofive","toddlerboys"])
        if (Array.isArray(p.category)) return p.category.includes(filters.category);
        return p.category === filters.category;
      });
    }

    // PRICE FILTER
    if (filters.price !== "all") {
      const [min, max] = filters.price.split("-");
      filtered = filtered.filter((p) => {
        if (!p.price) return false;
        if (max) return p.price >= +min && p.price <= +max;
        return p.price >= +min;
      });
    }

    // SORT FILTER
    if (filters.sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
    if (filters.sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
    if (filters.sort === "newest")
      filtered.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    if (filters.sort === "oldest")
      filtered.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));

    return filtered;
  }, [filters, data]);

  return (
    <>
      <ProductFilterBar filters={filters} onFilterChange={setFilters} />
      <div className="max-w-7xl mx-auto px-2 md:px-0 flex justify-end py-2">
        <button
          onClick={clearFilters}
          className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          Clear Filters
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 max-w-7xl mx-auto py-4 px-2 md:px-0">
        {filteredData.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
