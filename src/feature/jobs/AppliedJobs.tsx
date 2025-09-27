/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import WithEmptyState from "@/components/others/AllState";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import useAuthUser from "@/hooks/useGetMe";
import { useGetMyAppliedJobsQuery } from "@/redux/api/job/jobApi";
import { motion } from "framer-motion";
import { JobCard } from "./card/JobCard";

// Adjust import path if needed

const MyAppliedJobs = () => {
  const { user } = useAuthUser();
  const {
    data: appliedJobs,
    isLoading,
    isError,
  } = useGetMyAppliedJobsQuery(undefined, {
    skip: !user?.id, // Skip query if user.id is undefined
  });

  console.log("my data llllllllllllll;:", appliedJobs);

  return (
    <div className="container section-gap">
      <div className="flex items-center justify-between">
        <h1 className="sm:text-xl text-lg md:text-3xl lg:text-5xl">
          My Applied Jobs List
        </h1>
      </div>
      <WithEmptyState
        data={appliedJobs?.data || []}
        emptyStateProps={{
          title: "No Applied Jobs Found",
          description: "You haven’t applied to any jobs yet.",
        }}
        action={<PrimaryButton onClick={() => {}}>Refresh Jobs</PrimaryButton>}
        loading={isLoading}
        error={isError}
        spinnerSize="lg"
        errorMessage="Failed to fetch applied jobs. Please try again later."
        errorTitle="Error Fetching Applied Jobs"
        loadingMessage="Fetching applied jobs..."
        loadingTitle="Loading Applied Jobs"
      >
        {(data: any[]) => (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-14">
            {data.map((post: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.1 * (index + 1), ease: "easeIn" }}
              >
                <JobCard
                  title={post.job.jobPosition}
                  name=""
                  id=""
                  logo={
                    post.user.profilePicture ||
                    "https://img.freepik.com/premium-vector/home-building-logo-design-modern-minimalist_1022051-108.jpg"
                  }
                  location={post.job.location}
                  postedTime={new Date(post.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                  tags={post.job.reqSkills || []}
                  salary={post.job.salaryRange}
                  apply={false}
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

export default MyAppliedJobs;
