"use client";
import WithEmptyState from "@/components/others/AllState";
import Pagination from "@/components/shared/pagination/Pagination";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import useAuthUser from "@/hooks/useGetMe";
import { Job } from "@/interfaces/global";
import { useToggleFavoriteMutation } from "@/redux/api/favourite/favApi";
import {
  useGetJobsQuery, 
} from "@/redux/api/job/jobApi";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { JobCard } from "./card/JobCard";

const AllJobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  // get params
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const jobType = searchParams.get("type");
  const router = useRouter();

  // category state synced with URL param
  const [category, setCategory] = useState<string | null>(categoryParam);

  // sync when URL param changes
  useEffect(() => {
    setCategory(categoryParam);
    setCurrentPage(1);
  }, [categoryParam]);

  const { user } = useAuthUser();
  const [activeFilters] = useState<string[]>([]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Combine search & filters
  const searchTerm = useMemo(() => {
    const terms: string[] = [];
    if (debouncedSearch.trim()) terms.push(debouncedSearch.trim());
    const skillFilters = activeFilters.filter((filter) => filter !== "All");
    if (skillFilters.length > 0) terms.push(...skillFilters);
    return terms.join(" ");
  }, [debouncedSearch, activeFilters]);

  // Fetch jobs
  const {
    data: jobs,
    isLoading: isLoadingJobs,
    error,
  } = useGetJobsQuery({
    limit: 10,
    page: currentPage,
    searchTerm: searchTerm || undefined,
    jobCategorySlug: category || undefined,
    jobType: jobType || undefined,
  });

  // Fetch categories

  // Change category filter (push URL param)
  const handleCategoryChange = (keyword: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", keyword);
    router.push(`?${params.toString()}`);
  };

  // Pagination
  const totalPages = jobs?.meta?.totalPage || 1;
  const totalProjects = jobs?.meta?.total || 0;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Favorite toggle
  const [toggleFavorite] = useToggleFavoriteMutation();
  const handleToggleFavorite = async (
    itemId: string,
    itemType: "JOB" | "PROJECT"
  ) => {
    try {
      const res = await toggleFavorite({ itemId, itemType }).unwrap();
      if (res.success) {
        toast.success("Done!");
      } else {
        toast.error("Failed to add project to favorites.");
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
      toast.error("Failed to add project to favorites.");
    }
  };

  return (
    <div className="">
      {/* Search */}
      <div className="relative flex items-center gap-2 bg-white rounded-full p-1 lg:p-2 shadow-sm w-full max-w-md lg:max-w-xl border">
        <input
          type="text"
          placeholder="Search work"
          className="flex-1 outline-none px-2 py-2 rounded-lg text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <PrimaryButton
          onClick={() => setDebouncedSearch(search)}
          text="Search"
        />
      </div>

      {/* Category filter */}
      <div className="w-full md:w-64 mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Filter by category
        </label>
        <div className="relative">
          <select
            value={category || ""}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="
              block w-full rounded-xl bg-white
              py-3 pl-4 pr-10 text-sm text-gray-700 font-medium shadow-md
              border border-gray-300
              hover:border-gray-400 transition-all duration-200 ease-in-out
              focus:bg-white focus:border-primary/80 focus:ring-2 focus:ring-primary/80 focus:ring-offset-1
              appearance-none
            "
          >
<option value="clinical">Clinical</option>
            <option value="non-clinical">Non Clinical</option>
         
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className="h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Job list */}
      <WithEmptyState
        data={jobs?.data || []}
        emptyStateProps={{
          title: "No Jobs found",
          description: "There are currently no Jobs available.",
        }}
        action={
          <PrimaryButton
            onClick={() => {
              // trigger a refetch if needed
            }}
          >
            Refresh Jobs
          </PrimaryButton>
        }
        loading={isLoadingJobs}
        error={typeof error === "string" ? error : !!error}
        spinnerSize="lg"
        errorMessage="Failed to fetch Jobs. Please try again later."
        errorTitle="Error Fetching Jobs"
        loadingMessage="Fetching latest Jobs..."
        loadingTitle="Loading Jobs"
      >
        {(data: Job[]) => (
          <div className="grid grid-cols-1 lg:grid-cols-2 mt-4 md:mt-6 gap-4">
            {data?.map((post: Job, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: Math.min(0.1 * (index + 1), 0.5),
                  ease: "easeIn",
                }}
              >
                <JobCard
                  id={post.id}
                  title={post.jobPosition}
                  name={post.user?.companyInfo?.companyName as string}
                  logo={post.user?.profilePicture || ""}
                  location={post.location}
                  postedTime={post.createdAt}
                  tags={post.reqSkills as string[]}
                  salary={post.salaryRange}
                  isFavorite={post.isFavorite}
                  handleToggleFavorite={handleToggleFavorite}
                  favorite={post.userId !== user?.id}
                  view={false}
                />
              </motion.div>
            ))}
          </div>
        )}
      </WithEmptyState>

      {/* Search Results Info */}
      <div className="mb-4 mt-4 text-center text-sm text-gray-600">
        {searchTerm && (
          <p>
            Showing {jobs?.data?.length || 0} of {totalProjects} results for 
            {searchTerm} 
          </p>
        )}
        {!searchTerm && (
          <p>
            Showing {jobs?.data?.length || 0} of {totalProjects} projects
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="my-6 md:my-12">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AllJobs;
