/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import WithEmptyState from "@/components/others/AllState";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { Job } from "@/interfaces/global";
import {
  useDeleteJobMutation,
  useGetMyJobsQuery,
} from "@/redux/api/job/jobApi";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { JobCard } from "./card/JobCard";
import { jobPosts } from "./fakeData";

const MyJobs = () => {
  const router = useRouter();
  const {
    data: myJobs,
    isLoading: isLoadingMyJobs,
    error,
  } = useGetMyJobsQuery();
  // For deleting a job
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [deleteJob, { isLoading: isDeleting }] = useDeleteJobMutation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDeleteProject = async (jobId: string) => {
    try {
      const res = await deleteJob(jobId);
      if ("data" in res && res.data?.success) {
        toast.success("Project deleted successfully:");
      } else {
        console.error("Failed to delete project:", res);
      }
    } catch (err) {
      console.error("Failed to delete project:", err);
      toast.error("Failed to delete project. Please try again later.");
    }
  };


  return (
    <div className="container section-gap">
      <div className="flex items-center justify-between">
        <h1 className="sm:text-xl text-lg md:text-3xl lg:text-5xl">
          My Jobs List
        </h1>
        <div className="w-fit">
          <PrimaryButton onClick={() => router.push("/add-jobs")}>
            <div className="flex items-center gap-1 p-1">
              <Plus />
              <span>Add Job</span>
            </div>
          </PrimaryButton>
        </div>
      </div>
      <WithEmptyState
        data={myJobs?.data || []}
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
        loading={isLoadingMyJobs}
        error={error as any}
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
                  apply={false}
                  view
                />
              </motion.div>
            ))}
          </div>
        )}
      </WithEmptyState>
    </div>
  );
};

export default MyJobs;
