"use client";
import { useState, useMemo } from "react";
import { ProductCard } from "@/app/components/storefront/ProductCard";
import ProductFilterBar from "@/app/components/storefront/ProductFilterBar";

export default function ProductListWithFilter({ data }: { data: any[] }) {
  const [filters, setFilters] = useState({
    category: "all",
    sort: "newest",
    priceFrom: "" as number | "",
    priceTo: "" as number | "",
  });

  const clearFilters = () => {
    setFilters({ category: "all", sort: "newest", priceFrom: "", priceTo: "" });
  };

  const filteredData = useMemo(() => {
    let filtered = [...data];

    // CATEGORY FILTER
    if (filters.category !== "all") {
      filtered = filtered.filter((p) => {
        if (!p.category) return false;
        if (Array.isArray(p.category)) return p.category.includes(filters.category);
        return p.category === filters.category;
      });
    }

    // PRICE FILTER
    filtered = filtered.filter((p) => {
      if (!p.price) return false;
      if (filters.priceFrom !== "" && p.price < filters.priceFrom) return false;
      if (filters.priceTo !== "" && p.price > filters.priceTo) return false;
      return true;
    });

    // SORT FILTER
    if (filters.sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
    if (filters.sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
    if (filters.sort === "newest") filtered.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    if (filters.sort === "oldest") filtered.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));

    return filtered;
  }, [filters, data]);

  return (
    <>
      <ProductFilterBar
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={clearFilters}
      />
      <div className="max-w-7xl mx-auto px-2 md:px-0 py-4">
        {filteredData.length === 0 ? (
          <div className="text-center text-gray-200 bg-gray-800 p-6">
            <p className="mb-3">No products available for the selected filters.</p>
            <button
              onClick={clearFilters}
              className="bg-gray-200 text-gray-900 px-4 py-1 hover:bg-gray-300"
            >
              Reseat Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-1">
            {filteredData.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
