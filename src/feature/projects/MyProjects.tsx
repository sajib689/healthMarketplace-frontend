/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Modal } from "@/components/modal/Modal";
import WithEmptyState from "@/components/others/AllState";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { Project } from "@/interfaces/global";
import {
  useDeleteProjectMutation,
  useGetMyProjectsQuery,
  useUpdateProjectMutation,
} from "@/redux/api/projects/projectApi";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UdProjectsCard } from "./card/crudCard/UdProjectsCard";
import { EditProjectModal } from "./EditNowModal";
import { toast } from "sonner";

const MyProjects = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<number | null>(null);

  const { data: myProjects, isLoading, error } = useGetMyProjectsQuery();
  const [updateProjects, { isLoading: updating }] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();
  console.log(myProjects);
  //function to update project
  const handleUpdateProjects = async (
    data: {
      name: string;
      title: string;
      description: string | undefined;
      budget: string;
      priceType: string;
      deadline: string;
    },
    projectId: string
  ) => {
    try {
      const res = await updateProjects({
        id: projectId,
        data: {
          name: data.title,
          goal: data.description,
          budget: data.budget,
          priceType: data.priceType,
          deadline: data.deadline,
        },
      }); // Adjust the parameters as needed
      if ("data" in res && res.data?.success) {
        toast.success("Project updated successfully:");
        setIsModalOpen(null); // Close the modal after successful update
      } else {
        console.error("Failed to update project:", res);
      }
    } catch (err) {
      console.error("Failed to refresh projects:", err);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      const res = await deleteProject(projectId);
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
    <div className="container">
      <div className="w-fit ml-auto mb-4">
        <PrimaryButton onClick={() => router.push("/add-projects")}>
          <div className="flex items-center gap-1 p-1">
            <Plus />
            <span>Create Project</span>
          </div>
        </PrimaryButton>
      </div>

      <WithEmptyState
        data={myProjects?.data || []}
        emptyStateProps={{
          title: "No projects found",
          description: "There are currently no projects available.",
        }}
        action={
          <PrimaryButton
            onClick={() => {}}
            // onClick={() => refreshProjects()}
          >
            Refresh Projects
          </PrimaryButton>
        }
        loading={isLoading}
        error={error as any}
        spinnerSize="lg"
        errorMessage=" Please try again later."
        errorTitle="No data found"
        loadingMessage="Fetching latest projects..."
        loadingTitle=" Loading Projects"
      >
        {(data: Project[]) => (
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {data.map((post: Project, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }} // Start slightly below
                animate
                whileInView={{ opacity: 1 }} // Animate when in viewport
                viewport={{ once: true, amount: 0.2 }} // Trigger once when 20% visible
                transition={{ duration: 0.1 * (index + 1), ease: "easeIn" }}
                className={`border-t lg:odd:border-r ${
                  index >= (myProjects?.data?.length ?? 0) - 2 ? "border-b" : ""
                }`}
              >
                <UdProjectsCard
                  projectId={post.id}
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
                  handleDeleteProject={handleDeleteProject}
                  handleToggleFavorite={() => {}}
                  slug={post.slug}
                  status={post.status}
                  id={post.id}
                />
                {
                  <Modal
                    isOpen={isModalOpen === index}
                    onClose={() => setIsModalOpen(null)}
                  >
                    <EditProjectModal
                      projectId={post.id}
                      className="lg:min-w-[700px]"
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
                      scopeWork={post.scopeOfWork as string}
                      handleUpdateProjects={handleUpdateProjects}
                      buttonLoading={updating}
                      scopeOfWork={post.scopeOfWork}
                      handleToggleFavorite={() => {}}
                      // onClose={() => setIsModalOpen(null)}
                    />
                  </Modal>
                }
              </motion.div>
            ))}
          </div>
        )}
      </WithEmptyState>
    </div>
  );
};

export default MyProjects;
