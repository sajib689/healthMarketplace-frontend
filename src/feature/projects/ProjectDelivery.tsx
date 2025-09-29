"use client";
import ErrorState from "@/components/others/ErrorState";
import Loading from "@/components/others/Loading";
import { UserPlaceholder } from "@/lib/placeholder";
import { useGetSingleDeliveryQuery } from "@/redux/api/delivey/deliveryApi";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Tag } from "./card/Tag";
import OrderModal from "../notification/orderModal/OrderModal";
import { Modal } from "@/components/modal/Modal";
import useAuthUser from "@/hooks/useGetMe";
import {
  ReviewPayload,
  useCreateReviewMutation,
} from "@/redux/api/review/reviewApi";

const ProjectDelivery = () => {
  // Extract slug from pathname
  const path = usePathname();
  const slug = path.split("/")[2];
  const [modalAction, setModalAction] = useState<
    "cancel" | "confirm" | "infoModal" | null
  >(null);
  // const router = useRouter();
  // const [isModalOpen, setIsModalOpen] = useState<number | null>(null);
  // Fetch project data by slug
  const { data: myData, isLoading, error } = useGetSingleDeliveryQuery(slug);
  const [createReview] = useCreateReviewMutation();
  const { user } = useAuthUser();
  // const [makeAggrement] = useMakeAgreementMutation();
  // Handle loading and error states
  if (isLoading) {
    return <Loading />;
  }

  if (error || !myData?.data) {
    return <ErrorState />;
  }

  console.log(myData);
  // Extract project and user data
  const delivery = myData?.data;

  // Format posted time (e.g., "2 days ago")
  const postedTime = new Date(delivery?.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // const handleMakeAgreement = async (id: string) => {
  //     console.log(id);
  //     try {
  //         const res = await makeAggrement({ bidId: id });
  //         if (res.data?.success) {
  //             toast.success("Agreement Request sent successfully");
  //         } else {
  //             toast.error("There is something bad happened");
  //         }
  //     } catch (error) {
  //         console.error(error);
  //     }
  // };

  const handleCreteReview = async (payload: ReviewPayload) => {
    const res = await createReview(payload);
    console.log(res);
    setModalAction(null);
  };

  console.log("is it true", user?.id === delivery?.agreement.freelancer.id);
  return (
    <div className="w-full bg-white border-gray-200 p-6 space-y-6">
      {/* Header with avatar and bookmark */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Image
            width={48}
            height={48}
            src={
              delivery?.agreement.project.user?.profilePicture ||
              UserPlaceholder.src
            } // Fallback image
            alt={`${delivery?.agreement.project.user?.firstName ?? ""} ${
              delivery?.agreement.project.user?.lastName ?? ""
            }`}
            className="w-12 h-12 rounded-full object-cover"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZWVlZWVlIi8+PC9zdmc+"
            placeholder="blur"
            loading="lazy"
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.dataset.fallback) {
                img.srcset = UserPlaceholder.src;
                img.dataset.fallback = "true";
              }
            }}
          />
          <div>
            <h2 className="font-medium text-gray-900 text-lg">
              {delivery?.agreement.project.user?.firstName}{" "}
              {delivery?.agreement.project.user?.lastName}
            </h2>
            <p className="text-sm text-gray-500">
              {delivery?.agreement.project.user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Project Title and Metadata */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          {delivery?.agreement.project.name}
        </h1>
        <p className="text-sm text-gray-500 mt-1">Posted {postedTime}</p>
      </div>

      {/* Tags (Skills) */}
      <div className="flex flex-wrap gap-2 border-y py-4">
        {delivery?.agreement.project.skills?.map(
          (skill: string, index: number) => (
            <Tag key={index} name={skill} />
          )
        )}
      </div>

      {/* Price, Deadline, and Other Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b py-4 max-w-md">
        <div>
          <h3 className="text-lg font-semibold">
            {delivery?.agreement.project.budget}
          </h3>
          <p className="text-sm text-gray-500">
            {delivery?.agreement.project.priceType}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Deadline</h3>
          <p className="text-sm text-gray-500">
            {new Date(delivery?.agreement.project.deadline).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            )}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Category</h3>
          <p className="text-sm text-gray-500">
            {delivery?.agreement.project.category}
          </p>
        </div>
        {delivery?.agreement.project.experienceLevel && (
          <div>
            <h3 className="text-lg font-semibold">Experience Level</h3>
            <p className="text-sm text-gray-500">
              {delivery?.agreement.project.experienceLevel}
            </p>
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold">Status</h3>
          <p className="text-sm text-gray-500">{delivery?.status}</p>
        </div>
      </div>

      {/* Project Goal */}
      <div className="space-y-2">
        <h3 className="font-bold text-gray-900">Project Goal</h3>
        <p className="text-gray-600">{delivery?.agreement.project.goal}</p>
      </div>

      {/* Scope of Work */}
      <div className="space-y-2 border-y py-4">
        <h3 className="font-bold text-gray-900">Scope of Work</h3>
        <p className="text-gray-600">
          {delivery?.agreement.project.scopeOfWork}
        </p>
      </div>
      <div className="mb-6 p-4 border rounded-lg">
        {/* Freelancer Info */}
        <div className="flex items-center gap-4 mb-4">
          <Image
            width={80}
            height={80}
            src={
              delivery?.agreement.freelancer.profilePicture ||
              UserPlaceholder.src
            }
            alt={`${delivery?.agreement.freelancer.firstName ?? ""} ${
              delivery?.agreement.freelancer.lastName ?? ""
            }`}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="font-medium text-gray-900">
              {delivery?.agreement.freelancer.firstName}{" "}
              {delivery?.agreement.freelancer.lastName}
            </h2>
            <p className="text-sm text-gray-500">
              {delivery?.agreement.freelancer.email}
            </p>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4">
          <h3 className="font-bold text-gray-800">Bio</h3>
          <p className="text-gray-700">
            {delivery?.agreement?.freelancer?.about?.bio}
          </p>
        </div>

        {/* Message */}
        <div className="mt-4">
          <h3 className="font-bold text-gray-800">Message</h3>
          <p
            className="text-gray-700 whitespace-pre-line"
            style={{ whiteSpace: "pre-line" }}
          >
            {delivery?.message || "No message provided."}
          </p>
        </div>

        {/* File Submission */}
        <div className="mt-4">
          <h3 className="font-bold text-gray-800">Submitted File</h3>
          {delivery?.fileUrl ? (
            <a
              href={delivery.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1"
            >
              📄 View or Download File
            </a>
          ) : (
            <p className="text-gray-500 italic">No file submitted.</p>
          )}
        </div>
        {user?.id !== delivery?.agreement?.freelancer?.id && (
          <div className="mt-4 flex items-center gap-4">
            <div
              onClick={() => setModalAction("confirm")}
              className=" cursor-pointer text-center py-2 rounded-full bg-secondary/80 transition-all duration-300 text-white hover:bg-secondary shadow px-4"
            >
              Confirm
            </div>

            <div
              onClick={() => setModalAction("cancel")}
              className=" cursor-pointer text-center py-2 rounded-full bg-warning/80 transition-all duration-300 text-white hover:bg-warning shadow px-4"
            >
              Cancel
            </div>
          </div>
        )}

        {user?.id !== delivery?.agreement.freelancer.id ? (
          <Modal
            isOpen={modalAction ? true : false}
            onClose={() => setModalAction(null)}
          >
            <OrderModal
              name={`${delivery?.agreement.freelancer.firstName ?? ""} ${
                delivery?.agreement.freelancer.lastName ?? ""
              }`}
              avatar={
                delivery?.agreement.freelancer.profilePicture ||
                UserPlaceholder.src
              }
              title={delivery?.agreement.project.name}
              deadline={new Date(
                delivery?.agreement.project.deadline
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              description={delivery?.agreement.project.scopeOfWork}
              location="Locations"
              budget={delivery?.agreement.project.budget}
              priceType={delivery?.agreement.project.priceType}
              scopeOfWork={delivery?.agreement.project.scopeOfWork}
              tags={delivery?.agreement.project.skills}
              postedTime={postedTime}
              actions={modalAction ? modalAction : "infoModal"}
              projectId={delivery?.agreement.project.id}
              reviewedUserId={user?.id}
              handleCreteReview={handleCreteReview}
            />
          </Modal>
        ) : (
          <p></p>
        )}

        {/* <Demo /> */}
      </div>
    </div>
  );
};

export default ProjectDelivery;
