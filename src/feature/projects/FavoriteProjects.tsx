/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import userPlaceholder from "@/assets/placeholder/user.jpg";
import { Modal } from "@/components/modal/Modal";
import WithEmptyState from "@/components/others/AllState";
import useAuthUser from "@/hooks/useGetMe";
import {
  useGetMyFavoritesQuery,
  useToggleFavoriteMutation,
} from "@/redux/api/favourite/favApi";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { BidNowModal } from "./BidNowModal";
import { ProjectsCard } from "./card/ProjectsCard";
import { FavoriteItem } from "@/interfaces/global";

const FavoriteProjects = () => {
  const [isModalOpen, setIsModalOpen] = useState<number | null>(null);

  const { user } = useAuthUser();
  // State to manage active tab and filtered job posts
  const {
    data: projects,
    isLoading,
    error,
  } = useGetMyFavoritesQuery({ itemType: "PROJECT" });

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
    <div className="container 999">
      <WithEmptyState
        data={projects?.data || []}
        emptyStateProps={{
          title: "No projects found",
          description: "There are currently no projects available.",
        }}
        loading={isLoading}
        error={error as any}
        spinnerSize="lg"
        errorMessage=" Failed to fetch projects. Please try again later."
        errorTitle="Error Fetching Projects"
        loadingMessage="Fetching latest projects..."
        loadingTitle=" Loading Projects"
      >
        {(data: FavoriteItem[]) => (
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {data.map((post: FavoriteItem, index: number) => (
              <motion.div
                key={post.id} // Use unique key with page
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className={`border-t lg:odd:border-r ${
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
                    (post.user?.profilePicture as string) || userPlaceholder.src
                  }
                  title={post.project?.name || ""}
                  postedTime={post.project?.createdAt || ""}
                  tags={post.project?.skills}
                  budget={post.project?.budget || ""}
                  priceType={post.project?.priceType || ""}
                  deadline={post.project?.deadline || ""}
                  description={post.project?.goal}
                  id={post.project?.userId === user?.id}
                  projectId={post.project?.id || ""}
                  isFavorite={post.project?.isFavorite}
                  handleToggleFavorite={handleToggleFavorite}
                />
                <Modal
                  isOpen={isModalOpen === index}
                  onClose={() => setIsModalOpen(null)}
                >
                  <BidNowModal
                    className="md:min-w-[600px] min-w-[400px]"
                    name={post.user?.firstName + " " + post.user?.lastName}
                    avatar={post.user?.profilePicture as string}
                    title={post.project?.name || ""}
                    postedTime={post.project?.createdAt || ""}
                    tags={post.project?.skills || []}
                    budget={post.project?.budget || ""}
                    priceType={post.project?.priceType || ""}
                    deadline={post.project?.deadline || ""}
                    description={post.project?.goal}
                    scopeWork={post.project?.scopeOfWork as string}
                    onClose={() => setIsModalOpen(null)}
                    id={post.project?.userId === user?.id}
                    projectId={post.project?.id || ""}
                    isFavorite={post.project?.isFavorite || true}
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

export default FavoriteProjects;
