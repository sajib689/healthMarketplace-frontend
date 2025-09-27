"use client";
import WithEmptyState from "@/components/others/AllState";
import Pagination from "@/components/shared/pagination/Pagination";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import useAuthUser from "@/hooks/useGetMe";
import { Job } from "@/interfaces/global";
import { useToggleFavoriteMutation } from "@/redux/api/favourite/favApi";
import {
  useGetJobsQuery,
  useGetSubCategoriesQuery,
} from "@/redux/api/job/jobApi";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { JobCard } from "./card/JobCard";
import CategoryFilter from "./CategoryFilter";
import { jobPosts } from "./fakeData";

// const healthProjectKeywords = [
//   "Patient Tracker",
//   "Meal Planning",
//   "Physiotherapy Guide",
//   "Medication Reminder",
//   "Telemedicine",
//   "Vitals Monitoring",
//   "Symptom Checker",
//   "Hospital Sanitation",
//   "Healthcare Networking",
//   "Sleep Tracker",
// ];

const AllJobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  // const [suggestions, setSuggestions] = useState<string[]>([]);

  // to get category from params and store in a state to refetch again
  const categoryParams = useSearchParams().get("category");
  const [category, setCategory] = useState<string | null>(categoryParams);

  const { user } = useAuthUser();
  const router = useRouter();
  const [activeFilters] = useState<string[]>([]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1); // Reset to first page when search changes
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Generate suggestions based on search input
  useEffect(() => {
    if (!search.trim()) {
      // setSuggestions([]);
      return;
    }

    // const searchLower = search.toLowerCase();

    // const allSuggestions = [
    //   ...healthProjectKeywords,
    //   ...jobPosts.map((job) => job.title), // Job titles
    //   ...jobPosts.flatMap((job) => job.tags?.map((tag) => tag.name) || []), // Required skills
    // ].filter((item, index, self) => self.indexOf(item) === index); // Remove duplicates

    // const filteredSuggestions = allSuggestions
    //   .filter((item) => item.toLowerCase().includes(searchLower))
    //   .slice(0, 5); // Limit to 5 suggestions

    // setSuggestions(filteredSuggestions);
  }, [search]);

  const searchTerm = useMemo(() => {
    const terms = [];

    // Add text search
    if (debouncedSearch.trim()) {
      terms.push(debouncedSearch.trim());
    }

    // Add active filters (except "All")
    const skillFilters = activeFilters.filter((filter) => filter !== "All");
    if (skillFilters.length > 0) {
      terms.push(...skillFilters);
    }

    return terms.join(" ");
  }, [debouncedSearch, activeFilters]);

  // For getting all jobs
  const {
    data: jobs,
    isLoading: isLoadingJobs,
    error,
  } = useGetJobsQuery({
    limit: 10,
    page: currentPage,
    searchTerm: searchTerm || undefined,
    subCategorySlug: category || undefined,
  });

  const { data: categoryResponse } = useGetSubCategoriesQuery();

  const toggleFilter = (keyword: string) => {
    setCategory(keyword);

    const params = new URLSearchParams(categoryParams?.toString());
    params.set("category", keyword);

    router.push(`?${params.toString()}`);
  };

  // Calculate total pages from API response
  const totalPages = jobs?.meta?.totalPage || 1;
  const totalProjects = jobs?.meta?.total || 0;

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filterCategory = categoryResponse?.data.map((cate) => cate) || [];

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
      // Handle success
    } catch (error) {
      console.error("Error adding favorite:", error);
      toast.error("Failed to add project to favorites.");
    }
  };

  // Handle suggestion selection
  // const handleSuggestionSelect = (suggestion: string) => {
  //   setSearch(suggestion);
  //   setSuggestions([]); // Clear suggestions after selection
  // };

  return (
    <div className="">
      <CategoryFilter
        // search={search}
        setSearch={setSearch}
        activeFilters={activeFilters}
        filterCategory={filterCategory}
        toggleFilter={toggleFilter}
      // suggestions={suggestions}
      // onSuggestionSelect={handleSuggestionSelect}
      />

      <WithEmptyState
        data={jobs?.data || []}
        emptyStateProps={{
          title: "No Jobs found",
          description: "There are currently no Jobs available.",
        }}
        action={
          <PrimaryButton
            onClick={() => { }}
          // onClick={() => refreshJobs()}
          >
            Refresh Jobs
          </PrimaryButton>
        }
        loading={isLoadingJobs}
        error={typeof error === "string" ? error : !!error}
        spinnerSize="lg"
        errorMessage=" Failed to fetch Jobs. Please try again later."
        errorTitle="Error Fetching Jobs"
        loadingMessage="Fetching latest Jobs..."
        loadingTitle=" Loading Jobs"
      >
        {(data: Job[]) => (
          <div className="grid grid-cols-1 lg:grid-cols-2 mt-4 md:mt-6">
            {data.map((post: Job, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.1 * (index + 1), ease: "easeIn" }}
                className={` ${index >= jobPosts.length - 2 ? "" : ""}`}
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
            Showing {jobs?.data?.length || 0} of {totalProjects} results
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        )}
        {!searchTerm && (
          <p>
            Showing {jobs?.data?.length || 0} of {totalProjects} projects
          </p>
        )}
      </div>

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
