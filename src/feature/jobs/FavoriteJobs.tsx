/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import WithEmptyState from "@/components/others/AllState";
import { FavoriteItem } from "@/interfaces/global";
import {
  useGetMyFavoritesQuery,
  useToggleFavoriteMutation,
} from "@/redux/api/favourite/favApi";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { JobCard } from "./card/JobCard";
import { jobPosts } from "./fakeData";

const FavoriteJobs = () => {
  // const { user } = useAuthUser();
  // State to manage active tab and filtered job posts
  const {
    data: jobs,
    isLoading: isLoadingJobs,
    error,
  } = useGetMyFavoritesQuery({ itemType: "JOB" });

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
      // Handle success
    } catch (error) {
      console.error("Error adding favorite:", error);
      toast.error("Failed to add project to favorites.");
    }
  };

  return (
    <div className="container">
      <WithEmptyState
        data={jobs?.data || []}
        emptyStateProps={{
          title: "No Jobs found",
          description: "There are currently no Jobs available.",
        }}
        loading={isLoadingJobs}
        error={error as any}
        spinnerSize="lg"
        errorMessage=" Failed to fetch Jobs. Please try again later."
        errorTitle="Error Fetching Jobs"
        loadingMessage="Fetching latest Jobs..."
        loadingTitle=" Loading Jobs"
      >
        {(data: FavoriteItem[]) => (
          <div className="grid grid-cols-1 lg:grid-cols-2 mt-4 md:mt-6">
            {data.map((post: FavoriteItem, index: number) => (
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
                  id={post.job?.id as string}
                  title={post.job?.jobPosition as string}
                  name={post.job?.user?.companyInfo?.companyName as string}
                  logo={post.job?.user?.profilePicture || ""}
                  location={post.job?.location as string}
                  postedTime={post.job?.createdAt as string}
                  tags={post.job?.reqSkills as string[]}
                  salary={post.job?.salaryRange as string}
                  isFavorite={post.job?.isFavorite}
                  handleToggleFavorite={handleToggleFavorite}
                  favorite={false}
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

export default FavoriteJobs;
