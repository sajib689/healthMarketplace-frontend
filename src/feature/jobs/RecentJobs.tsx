/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";
import React, { useState } from "react";
import { motion } from "framer-motion";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { MoveUpRight, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { JobCard } from "./card/JobCard";
import { useGetJobsQuery } from "@/redux/api/job/jobApi";
import WithEmptyState from "@/components/others/AllState";
import { Job } from "@/interfaces/global";
import { useToggleFavoriteMutation } from "@/redux/api/favourite/favApi";
import { toast } from "sonner";
import useAuthUser from "@/hooks/useGetMe";

const RecentJobs = () => {
  const router = useRouter();

  // State to manage active tab and filtered job posts
  const [activeTab, setActiveTab] = useState("clinical");
  const [, setFilteredPosts] = useState("");
  const [category, setCategory] = useState<string>("clinical");

  const {
    data: jobs,
    isLoading: isLoadingJobs,
    error,
  } = useGetJobsQuery({
    limit: 6,
    jobCategorySlug: category,
  });

  // Categories for filtering
  const categories = ["clinical", "Non-Clinical"];

  // Handle tab click for filtering jobs
  const handleTabClick = (category: string) => {
    setActiveTab(category);
    setFilteredPosts(category);
  };
  const { user } = useAuthUser();

  const [toggleFavorite] = useToggleFavoriteMutation();

  const handleToggleFavorite = async (
    itemId: string,
    itemType: "JOB" | "PROJECT"
  ) => {
    try {
      const res = await toggleFavorite({ itemId, itemType }).unwrap();
      if (res.success) {
        toast.success("Project added to favorites!");
      } else {
        toast.error("Failed to add project to favorites.");
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
      toast.error("Failed to add project to favorites.");
    }
  };

  return (
    <div className="container section-gap">
      {/* Header row */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SectionTitle
          miniTitle="Jobs"
          subtitle=""
          title="Explore All Latest Jobs"
        />

        {user?.role !== "INDIVIDUAL" ? (
          <div className="flex justify-center md:justify-end">
            <PrimaryButton onClick={() => router.push("/add-jobs")}>
              <div className="flex items-center gap-1 p-1">
                <Plus />
                <span>Add Job</span>
              </div>
            </PrimaryButton>
          </div>
        ) : (
          <div className="flex justify-center md:justify-end">
            <PrimaryButton onClick={() => router.push("/jobs")}>
              <div className="flex items-center justify-center gap-3 text-nowrap p-1">
                <p>See All Jobs</p>
                <MoveUpRight className="w-4" />
              </div>
            </PrimaryButton>
          </div>
        )}
      </div>

      {/* Filter dropdown */}
      <div className="w-full md:w-64">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Filter by category
        </label>
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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

      {/* Tabs for filtering by category (optional) */}
      <div className="mb-6 overflow-auto hidden">
        <div className="flex items-center gap-4">
          {categories.map((category) => (
            <div
              key={category}
              className={`cursor-pointer border-b-2 border-transparent px-4 py-1 ${
                activeTab === category
                  ? "text-black border-primary"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
          ))}
        </div>
      </div>

      {/* Display job cards */}
      <WithEmptyState
        data={jobs?.data || []}
        emptyStateProps={{
          title: "No Jobs found",
          description: "There are currently no Jobs available.",
        }}
        action={<PrimaryButton onClick={() => {}}>Refresh Jobs</PrimaryButton>}
        loading={isLoadingJobs}
        error={error as any}
        spinnerSize="lg"
        errorMessage="Failed to fetch Jobs. Please try again later."
        errorTitle="Error Fetching Jobs"
        loadingMessage="Fetching latest Jobs..."
        loadingTitle="Loading Jobs"
      >
        {(data: Job[]) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mt-4 md:mt-6 gap-4">
            {data.map((post: Job, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.1 * (index + 1), ease: "easeIn" }}
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
                  view={false}
                />
              </motion.div>
            ))}
          </div>
        )}
      </WithEmptyState>
    </div>
  );
};

export default RecentJobs;
