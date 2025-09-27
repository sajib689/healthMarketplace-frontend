"use client";

import { Modal } from "@/components/modal/Modal";
import ErrorState from "@/components/others/ErrorState";
import Loading from "@/components/others/Loading";
import Pagination from "@/components/shared/pagination/Pagination";
import { useGetMyPendingProjectQuery } from "@/redux/api/agreement/agreementApi";
import { motion } from "framer-motion";
import { useState } from "react";
import { PendingProjectsCard } from "./card/PendingnDelivaredProjectsCard";
import Delivery from "./DeliveryModal";
import EmptyState from "@/components/others/EmptayState";
import { useRouter } from "next/navigation";
import { UserPlaceholder } from "@/lib/placeholder";

const AllPendingProjects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState<number | null>(null);

  const { data: Projects, isLoading, isError } = useGetMyPendingProjectQuery();
  const router = useRouter()
  console.log("all pending data:", Projects);

  if (isLoading) {
    return (
      <div>
        <Loading
          title="Loading Pending Projects"
          message="Fetching all pending projects data..."
        />
      </div>
    );
  }

  if (isError || !Projects?.success) {
    return (
      <div>
        <ErrorState></ErrorState>
      </div>
    );
  }

  if (!Projects?.data || Projects.data.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <EmptyState />
      </div>
    );
  }

  const totalPages = Projects?.meta?.totalPage || 1;

  return (
    <div>
      <div className="grid grid-cols-1 mt-4 md:mt-6">
        {Projects?.data?.map((agreement, index) => {
          const project = agreement.project;
          if (!project) return null;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.1 * (index + 1), ease: "easeIn" }}
              className={`border-t ${index >= Projects?.data?.length - 2 ? "border-b" : ""
                }`}
            >
              <PendingProjectsCard
                isOpen={isModalOpen === index}
                onOpen={() => setIsModalOpen(index)}
                onClose={() => setIsModalOpen(null)}
                className=""
                name={project.name || "Unnamed Project"} // Use project.name
                avatar={project.user?.profilePicture || UserPlaceholder.src}
                title={project.goal || "No Title"}
                budget={project.budget || "N/A"}
                tags={project.skills || []}
                postedTime={new Date(project.createdAt).toLocaleString()}
                priceType={project.priceType || "N/A"}
                deadline={project.deadline || "N/A"}
                projectId={project.id}
                handleToggleFavorite={() => { }}
                onMessage={() =>
                  router.push(
                    `/messaging?user=${project.user?.id}`
                  )
                }
              />
              <Modal
                isOpen={isModalOpen === index}
                onClose={() => setIsModalOpen(null)}
              >
                <Delivery id={agreement.id} />
              </Modal>
            </motion.div>
          );
        })}
      </div>

      <div className="my-6 md:my-12">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AllPendingProjects;
