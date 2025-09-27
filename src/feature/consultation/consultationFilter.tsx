"use client";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { Suggestion } from "@/redux/api/others/OthersApi";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { RxMixerHorizontal } from "react-icons/rx";

interface ConsultationFilterProps {
  activeFilters: string[];
  toggleFilter: (keyword: string) => void;
  filterCategory: Suggestion[];
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
  suggestions: string[]; // Added for autocomplete
  onSuggestionSelect: (suggestion: string) => void; // Added for suggestion selection
}

const ConsultationFilter = ({
  activeFilters,
  toggleFilter,
  filterCategory,
  setSearch,
  search,
  suggestions,
  onSuggestionSelect,
}: ConsultationFilterProps) => {
  const [showCategories, setShowCategories] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Track input focus for suggestions

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4 md:mb-8 lg:mb-12">
        <div className="relative flex items-center gap-2 bg-white rounded-full p-1 lg:p-2 shadow-sm w-full max-w-md lg:max-w-xl border">
          <Search className="w-5 h-5 text-gray-400 ml-2" />
          <input
            type="text"
            placeholder="Search talent"
            className="flex-1 outline-none px-2 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay to allow clicking suggestions
          />
          <PrimaryButton onClick={() => { }} text="Search" />
          {/* Suggestions Dropdown */}
          {isFocused && suggestions.length > 0 && (
            <ul className="absolute z-30 w-full bg-white border border-gray-200 rounded-lg shadow-md mt-1 top-full left-0 max-h-48 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => {
                    onSuggestionSelect(suggestion);
                    setIsFocused(false); // Close dropdown on selection
                  }}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 mt-2">
        {/* Filter button */}
        <button
          className="border px-2 text-sm md:px-6 py-2 md:py-3 rounded-xl bg-white z-10 border-primary flex items-center justify-center gap-2"
          onClick={() => setShowCategories(!showCategories)}
        >
          <RxMixerHorizontal />
          <span>Filter</span>
        </button>

        {/* Filter categories with animation (left to right) */}
        {showCategories && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 overflow-auto"
          >
            {filterCategory.map((data, idx) => (
              <motion.button
                key={idx}
                onClick={() => toggleFilter(data.name)}
                className={`border-b pb-1 px-1 hover:text-black text-nowrap transition ${activeFilters.includes(data.name)
                  ? "border-primary font-semibold text-black"
                  : "border-transparent text-gray-500"
                  }`}
              >
                {data.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ConsultationFilter;
