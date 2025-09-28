/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import WithEmptyState from "@/components/others/AllState";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import useAuthUser from "@/hooks/useGetMe";
import { useGetMyAppliedJobsQuery } from "@/redux/api/job/jobApi";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Image from 'next/image';
const MyAppliedJobs = () => {
  const { user } = useAuthUser();
  const {
    data: appliedJobs,
    isLoading,
    isError,
  } = useGetMyAppliedJobsQuery(undefined, {
    skip: !user?.id, // Skip query if user.id is undefined
  });

  return (
    <div className="container section-gap">
      <div className="flex items-center justify-between">
        <h1 className="sm:text-xl text-lg md:text-3xl lg:text-5xl font-bold">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-14">
            {data.map((post: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.2 * (index + 1), ease: "easeInOut" }}
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col gap-4">
                  {/* Header with logo & job title */}
                  <div className="flex items-start gap-4">
                    <Image
                    width={80}
                    height={80}
                      src={
                        post.user.profilePicture ||
                        '/userIcon2.jpg'
                      }
                      alt="Company Logo"
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {post.job.jobPosition}
                      </h2>
                      <p className="text-gray-600">{post.job.location}</p>
                      <p className="text-sm text-gray-500">
                        Applied on{" "}
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    {/* Resume link */}
                    {post.file && (
                      <a
                        href={post.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        <Download size={18} />
                        Resume
                      </a>
                    )}
                  </div>

                  {/* Applicant info */}
                  <div className="text-sm text-gray-700">
                    <p>
                      <span className="font-medium">Name:</span> {post.name}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {post.email}
                    </p>
                    <p>
                      <span className="font-medium">Position:</span>{" "}
                      {post.position}
                    </p>
                  </div>

                  {/* Skills */}
                  {post.job.reqSkills && post.job.reqSkills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.job.reqSkills.map((skill: string) => (
                        <span
                          key={skill}
                          className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Salary & Job Type */}
                  <div className="flex items-center justify-between text-sm text-gray-600 border-t pt-3">
                    <span>Salary: {post.job.salaryRange}</span>
                    <span className="font-medium">{post.job.jobType}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </WithEmptyState>
    </div>
  );
};

export default MyAppliedJobs;
