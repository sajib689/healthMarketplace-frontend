"use client";

import React, { useState } from "react";
import { PendingProjectsCard } from "./card/PendingnDelivaredProjectsCard";
import { Modal } from "@/components/modal/Modal";
import { BidNowModal } from "./BidNowModal";
import { motion } from "framer-motion";
import Pagination from "@/components/shared/pagination/Pagination";
import { useGetAllDeliverySubmittedQuery } from "@/redux/api/delivey/deliveryApi";
import Loading from "@/components/others/Loading";
import ErrorState from "@/components/others/ErrorState";
import { useRouter } from "next/navigation";
import EmptyState from "@/components/others/EmptayState";

const AllDeliveredProjects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState<number | null>(null);

  const router = useRouter();

  const {
    data: Deliveries,
    isLoading,
    isError,
  } = useGetAllDeliverySubmittedQuery({
    limit: 10,
    page: currentPage || undefined,
  });

  console.log("deliveryall data :", Deliveries);

  if (isLoading) {
    return (
      <div>
        <Loading
          title="Loading Delivered Projects"
          message="Fetching all delivered projects data..."
        />
      </div>
    );
  }

  if (isError || !Deliveries?.success) {
    return (
      <div>
        <ErrorState />
      </div>
    );
  }

  if (!Deliveries?.data || Deliveries.data.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <EmptyState />
      </div>
    );
  }
  const totalPages = Deliveries?.meta?.totalPage || 1;

  return (
    <div>
      <div className="grid grid-cols-1 mt-4 md:mt-6">
        {Deliveries?.data?.map((delivery, index) => {
          const agreement = delivery.agreement || {};
          const project =
            agreement.project && typeof agreement.project === "object"
              ? agreement.project
              : undefined;
          // Parse budget into min and max (removed unused priceMin and priceMax)

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.1 * (index + 1), ease: "easeIn" }}
              className={`border-t ${index >= Deliveries?.data?.length - 2 ? "border-b" : ""
                }} `}
            >
              <PendingProjectsCard
                isOpen={isModalOpen === index}
                onOpen={() =>
                  router.push(`/messaging?userId=${project?.user?.id}`)
                }
                onClose={() => setIsModalOpen(null)}
                className=""
                name={project?.name || "Unnamed Project"}
                avatar={
                  project?.user?.profilePicture ||
                  "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?ga=GA1.1.603131680.1747477038&semt=ais_hybrid&w=740"
                } // Fallback for avatar
                title={project?.goal || "No Title"} // Use goal as title
                postedTime={
                  delivery.createdAt
                    ? new Date(delivery.createdAt).toLocaleString()
                    : "Unknown"
                } // Use delivery.createdAt
                budget={project?.budget || "N/A"}
                tags={project?.skills || []} // Use project.skills
                priceType={project?.priceType || "N/A"}
                deadline={project?.deadline || "N/A"}
                pending={true} // Dynamic pending status
                projectId={project?.id || delivery.id} // Use project.id or fallback to delivery.id
                handleToggleFavorite={() => { }}
                id={project?.id}
              />
              <Modal
                isOpen={isModalOpen === index}
                onClose={() => setIsModalOpen(null)}
              >
                <BidNowModal
                  className=""
                  name={project?.name || "Unnamed Project"}
                  avatar={
                    project?.user?.profilePicture ||
                    "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?ga=GA1.1.603131680.1747477038&semt=ais_hybrid&w=740"
                  }
                  title={project?.goal || "No Title"}
                  postedTime={
                    delivery.createdAt
                      ? new Date(delivery.createdAt).toLocaleString()
                      : "Unknown"
                  }
                  budget={project?.budget || "N/A"}
                  tags={project?.skills || []}
                  priceType={project?.priceType || "N/A"}
                  deadline={project?.deadline || "N/A"}
                  description={project?.goal || "No description available"}
                  scopeWork={project?.scopeOfWork || "No scope provided"}
                  onClose={() => setIsModalOpen(null)}
                  projectId={project?.id || delivery.id}
                  handleToggleFavorite={() => { }}
                />
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

export default AllDeliveredProjects;
