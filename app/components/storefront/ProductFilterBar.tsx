"use client";
import { Filter } from "lucide-react";

interface ProductFilterBarProps {
  filters: {
    category: string;
    sort: string;
    price: string;
  };
  onFilterChange: (filters: { category: string; sort: string; price: string }) => void;
}

export default function ProductFilterBar({ filters, onFilterChange }: ProductFilterBarProps) {
  const handleChange = (field: string, value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-3 gap-3">
        <div className="flex items-center gap-2 text-gray-700 font-semibold">
          <Filter className="w-5 h-5 text-gray-500" />
          <span>Filter Products</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:gap-6">
          {/* Category */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Category:</label>
            <select
              value={filters.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="border rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-gray-300"
            >
              <option value="all">All</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
              <option value="baby">Baby</option>
              <option value="toddlergirls">Toddler Girls</option>
              <option value="toddlerboys">Toddler Boys</option>
              <option value="kidgirlsfourtofive">Kid Girls 4–5</option>
              <option value="kidboysfourtofive">Kid Boys 4–5</option>
            </select>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Price:</label>
            <select
              value={filters.price}
              onChange={(e) => handleChange("price", e.target.value)}
              className="border rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-gray-300"
            >
              <option value="all">All</option>
              <option value="0-500">৳0 - ৳500</option>
              <option value="500-1000">৳500 - ৳1000</option>
              <option value="1000-2000">৳1000 - ৳2000</option>
              <option value="2000+">৳2000+</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={filters.sort}
              onChange={(e) => handleChange("sort", e.target.value)}
              className="border rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-gray-300"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
