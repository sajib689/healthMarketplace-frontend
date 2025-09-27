/* eslint-disable @typescript-eslint/no-explicit-any */
import WithEmptyState from '@/components/others/AllState';
import PrimaryButton from '@/components/shared/primaryButton/PrimaryButton';
import React from 'react';
import { motion } from 'framer-motion';
import { JobCard } from './card/JobCard';
import { Job } from '@/interfaces/global';


const RelatedJobs = ({ jobs, isLoadingJobs, error }: { jobs: Job[], isLoadingJobs: boolean, error: any }) => {
    return (
        <div>
            <h1 className='text-2xl md:text-4xl font-bold'>Related Jobs</h1>
            <div className="mt-12">
                <WithEmptyState
                    data={jobs || []}
                    emptyStateProps={{
                        title: "No Jobs found",
                        description: "There are currently no Jobs available.",
                    }}
                    action={
                        <PrimaryButton
                            onClick={() => { /* refreshJobs() */ }}
                        >
                            Refresh Jobs
                        </PrimaryButton>
                    }
                    loading={isLoadingJobs}
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
                                // className={` ${index >= jobPosts.length - 2 ? "" : ""}`}
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
                                        // handleToggleFavorite={handleToggleFavorite}
                                        view={false}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </WithEmptyState>
            </div>
        </div>
    );
};

export default RelatedJobs;