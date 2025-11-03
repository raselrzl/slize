"use client";
import { Filter } from "lucide-react";

interface ProductFilterBarProps {
  filters: {
    category: string;
    sort: string;
    priceFrom: number | "";
    priceTo: number | "";
  };
  onFilterChange: (filters: {
    category: string;
    sort: string;
    priceFrom: number | "";
    priceTo: number | "";
  }) => void;
  onClearFilters: () => void;
}

export default function ProductFilterBar({
  filters,
  onFilterChange,
  onClearFilters,
}: ProductFilterBarProps) {
  const handleChange = (field: string, value: string | number) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="w-full bg-gray-900 border-b border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Header */}
        <div className="flex items-center gap-2 text-gray-100 font-semibold mb-3">
          <Filter className="w-5 h-5 text-gray-400" />
          <span>Filter Products</span>
        </div>

        {/* Grid Layout for Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-end">
          
          {/* Category */}
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-100 mb-1">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="bg-gray-800 text-gray-100 border border-gray-700 px-3 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
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

          {/* Price Range */}
          <div className="flex gap-2 w-full">
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium text-gray-100 mb-1">Price From</label>
              <input
                type="number"
                placeholder="From"
                value={filters.priceFrom}
                onChange={(e) =>
                  handleChange("priceFrom", e.target.value ? parseInt(e.target.value) : "")
                }
                className="bg-gray-800 text-gray-100 border border-gray-700 px-3 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium text-gray-100 mb-1">Price To</label>
              <input
                type="number"
                placeholder="Till"
                value={filters.priceTo}
                onChange={(e) =>
                  handleChange("priceTo", e.target.value ? parseInt(e.target.value) : "")
                }
                className="bg-gray-800 text-gray-100 border border-gray-700 px-3 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
            </div>
          </div>

          {/* Sort */}
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-100 mb-1">Sort by</label>
            <select
              value={filters.sort}
              onChange={(e) => handleChange("sort", e.target.value)}
              className="bg-gray-800 text-gray-100 border border-gray-700 px-3 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className="w-full flex sm:justify-start md:justify-end">
            <button
              onClick={onClearFilters}
              className="bg-gray-200 text-gray-900 px-3 py-1 text-sm hover:bg-gray-300 w-full sm:w-auto"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
