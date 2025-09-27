"use client";

import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { Search } from "lucide-react";
// import BlogsSlider from "./BlogsSlider";
import { useState, useEffect, useMemo } from "react";
import BlogCard from "./card/BlogCard";
import { motion } from "framer-motion";
import WithEmptyState from "@/components/others/AllState";
import { useGetAllBlogsQuery } from "@/redux/api/blog/blogApi";
import { Blog } from "@/interfaces/global";

const AllBlogs = () => {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // API query for blogs
  const { data, isLoading, isError, error } = useGetAllBlogsQuery({
    page: 1,
    limit: 10,
    searchTerm: debouncedSearch || undefined, // Use debounced search term
  });

  const blogs = useMemo(() => data?.data ?? [], [data]);
  console.log("Blogs==>>", data);
  console.log("Blogs data", blogs);
  console.log("In all blogs page");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Generate suggestions based on search input
  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }

    const searchLower = search.toLowerCase();
    const allSuggestions = [
      ...blogs.map((blog) => blog.title), // Blog titles
    ].filter((item, index, self) => self.indexOf(item) === index); // Remove duplicates

    const filteredSuggestions = allSuggestions
      .filter((item) => item.toLowerCase().includes(searchLower))
      .slice(0, 5); // Limit to 5 suggestions

    setSuggestions(filteredSuggestions);
  }, [search, blogs]);

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: string) => {
    setSearch(suggestion);
    setSuggestions([]); // Clear suggestions after selection
  };

  // Compute categories with counts
  const categories = useMemo(() => {
    const categoryMap = new Map<string, { name: string; count: number }>();
    blogs.forEach((blog) => {
      const categoryId = blog.categoryId || "Uncategorized";
      const categoryName =
        typeof blog.categoryBlog === "object" &&
        blog.categoryBlog !== null &&
        "name" in blog.categoryBlog
          ? (blog.categoryBlog as { name: string }).name
          : categoryId;
      if (categoryMap.has(categoryId)) {
        categoryMap.get(categoryId)!.count += 1;
      } else {
        categoryMap.set(categoryId, { name: categoryName, count: 1 });
      }
    });
    return Array.from(categoryMap.values());
  }, [blogs]);

  return (
    <div>
      {/* <BlogsSlider /> */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4 md:mb-8 lg:mb-12">
        <div className="relative flex items-center gap-2 bg-white rounded-full p-1 lg:p-2 shadow-sm w-full max-w-md lg:max-w-xl border">
          <Search className="w-5 h-5 text-gray-400 ml-2" />
          <input
            type="text"
            placeholder="Search work"
            className="flex-1 outline-none px-2 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() =>
              setSuggestions(blogs.map((blog) => blog.title).slice(0, 5))
            } // Initial suggestions on focus
            onBlur={() => setTimeout(() => setSuggestions([]), 200)} // Clear after delay
          />
          <PrimaryButton onClick={() => {}} text="Search" />
          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute z-30 w-full bg-white border border-gray-200 rounded-lg shadow-md mt-1 top-full left-0 max-h-48 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => {
                    handleSuggestionSelect(suggestion);
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

      <WithEmptyState
        data={blogs}
        emptyStateProps={{
          title: "No blogs found",
          description: "There are currently no blogs available.",
        }}
        action={
          <PrimaryButton
            onClick={() => {}}
            // onClick={() => refreshBlogs()}
          >
            Refresh Blogs
          </PrimaryButton>
        }
        loading={isLoading}
        error={
          isError
            ? typeof error === "string"
              ? error
              : error
              ? JSON.stringify(error)
              : undefined
            : undefined
        }
        spinnerSize="lg"
        errorMessage="Failed to fetch blogs. Please try again later."
        errorTitle="Error Fetching Blogs"
        loadingMessage="Fetching latest blogs..."
        loadingTitle="Loading Blogs"
      >
        {(data: Blog[]) => (
          <div className="grid sm:grid-cols-3 gap-4 xl:gap-8 mb-10 lg:mb-20">
            <div className="grid md:grid-cols-2 col-span-2 w-full gap-8 ">
              {data.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.1 * (idx + 1), ease: "easeIn" }}
                >
                  <BlogCard
                    key={idx}
                    imageUrl={item.image}
                    title={item.title}
                    id={item.id}
                    slug={item.slug}
                  />
                </motion.div>
              ))}
            </div>
            <div>
              <h1 className="text-2xl font-semibold mb-1">Categories</h1>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <p key={index} className="border-b py-2 max-w-sm">
                    {category.name} ({category.count})
                  </p>
                ))
              ) : (
                <p className="border-b py-2 max-w-sm">
                  No categories available
                </p>
              )}
            </div>
          </div>
        )}
      </WithEmptyState>
    </div>
  );
};

export default AllBlogs;
