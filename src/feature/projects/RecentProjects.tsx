/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Modal } from "@/components/modal/Modal";
import WithEmptyState from "@/components/others/AllState";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";
import { useGetAllProjectsQuery } from "@/redux/api/projects/projectApi";
import { motion } from "framer-motion";
import { MoveUpRight, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BidNowModal } from "./BidNowModal";
import { ProjectsCard } from "./card/ProjectsCard";
import { useToggleFavoriteMutation } from "@/redux/api/favourite/favApi";
import { toast } from "sonner";
import useAuthUser from "@/hooks/useGetMe";

const RecentProjects = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("YourCategoryValue");

  const { user } = useAuthUser();
  const {
    data: projects,
    isLoading,
    error,
  } = useGetAllProjectsQuery({
    limit: 4,
    sort: "-createdAt",
    category,
  });

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
          miniTitle="Projects"
          subtitle="Connect with skilled professionals for your one-off tasks, freelance gigs, or specialized short-term projects."
          title="Recent Projects"
        />

        <div className="flex justify-center md:justify-end">
          {user ? (
            <PrimaryButton onClick={() => router.push("/add-projects")}>
              <div className="flex items-center gap-1 p-1">
                <Plus />
                <span>Create Projects</span>
              </div>
            </PrimaryButton>
          ) : (
            <PrimaryButton onClick={() => router.push("/project")}>
              <div className="flex items-center justify-center gap-3 text-nowrap p-1">
                <p>See All Projects</p>
                <MoveUpRight className="w-4" />
              </div>
            </PrimaryButton>
          )}
        </div>
      </div>

      {/* Filter dropdown */}
      <div className="w-full md:w-64 mb-4">
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
            <option value="YourCategoryValue">YourCategoryValue</option>
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

      {/* Projects grid */}
      <WithEmptyState
        data={projects?.data || []}
        emptyStateProps={{
          title: "No projects found",
          description: "There are currently no projects available.",
        }}
        action={<PrimaryButton onClick={() => {}}>Refresh Projects</PrimaryButton>}
        loading={isLoading}
        error={error as any}
        spinnerSize="lg"
        errorMessage="Failed to fetch projects. Please try again later."
        errorTitle="Error Fetching Projects"
        loadingMessage="Fetching latest projects..."
        loadingTitle="Loading Projects"
      >
        {(data) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {data.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.1 * (index + 1), ease: "easeIn" }}
                className={`border-t sm:odd:border-r ${
                  index >= data.length - 2 ? "border-b" : ""
                }`}
              >
                <ProjectsCard
                  isOpen={isModalOpen === index}
                  onOpen={() => setIsModalOpen(index)}
                  onClose={() => setIsModalOpen(null)}
                  className=""
                  name={post.user?.firstName + " " + post.user?.lastName}
                  avatar={
                    post.user?.profilePicture ||
                    "https://i.ibb.co/4f1x5zj/placeholder.png"
                  }
                  title={post.name}
                  postedTime={post.createdAt}
                  tags={Object.values(post.skills) as string[]}
                  budget={post.budget}
                  priceType={post.priceType}
                  deadline={post.deadline}
                  description={post.goal}
                  projectId={post.id}
                  favorite={false}
                  isFavorite={post.isFavorite}
                  handleToggleFavorite={handleToggleFavorite}
                  id={post.userId === user?.id}
                />
                <Modal
                  isOpen={isModalOpen === index}
                  onClose={() => setIsModalOpen(null)}
                >
                  <BidNowModal
                    className="xl:w-[500px] md:w-[450px] w-[calc(96vw)]"
                    name={post.user?.firstName + " " + post.user?.lastName}
                    avatar={
                      post.user?.profilePicture ||
                      "https://i.ibb.co/4f1x5zj/placeholder.png"
                    }
                    title={post.name}
                    postedTime={new Date(post.createdAt).toDateString()}
                    tags={Object.values(post.skills) as string[]}
                    budget={post.budget}
                    priceType={post.priceType}
                    deadline={post.deadline}
                    description={post.goal}
                    scopeWork={post.scopeOfWork as string}
                    onClose={() => setIsModalOpen(null)}
                    projectId={post.id}
                    isFavorite={post.isFavorite}
                    favorite={false}
                    handleToggleFavorite={handleToggleFavorite}
                  />
                </Modal>
              </motion.div>
            ))}
          </div>
        )}
      </WithEmptyState>
    </div>
  );
};

export default RecentProjects;
