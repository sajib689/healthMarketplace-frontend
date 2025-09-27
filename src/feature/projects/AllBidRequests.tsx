/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Modal } from "@/components/modal/Modal";
import WithEmptyState from "@/components/others/AllState";
import ErrorState from "@/components/others/ErrorState";
import Loading from "@/components/others/Loading";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { bidUser } from "@/interfaces/global";
import { useGetProjectBySlugQuery } from "@/redux/api/projects/projectApi";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { SeeProfile } from "../notification/bidandAgrement/SeeProfile";
import { Tag } from "./card/Tag";
import { useMakeAgreementMutation } from "@/redux/api/agreement/agreementApi";
import { toast } from "sonner";
import { UserPlaceholder } from "@/lib/placeholder";

const AllBidRequests = () => {
  // Extract slug from pathname
  const path = usePathname();
  const slug = path.split("/")[2];

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<number | null>(null);
  // Fetch project data by slug
  const { data: myData, isLoading, error } = useGetProjectBySlugQuery(slug);

  const [makeAggrement] = useMakeAgreementMutation();
  // Handle loading and error states
  if (isLoading) {
    return <Loading />;
  }

  if (error || !myData?.data) {
    return <ErrorState />;
  }

  // Extract project and user data
  const project = myData?.data;
  const {
    name,
    user,
    category,
    skills,
    budget,
    priceType,
    deadline,
    goal,
    scopeOfWork,
    experienceLevel,
    status,
    createdAt,
  } = project;

  // Format posted time (e.g., "2 days ago")
  const postedTime = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleMakeAgreement = async (id: string) => {
    console.log(id);
    try {
      const res = await makeAggrement({ bidId: id });
      if (res.data?.success) {
        toast.success("Agreement Request sent successfully");
      } else {
        toast.error("There is something bad happened");
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(project.bid)
  return (
    <div className="w-full bg-white border-gray-200 p-6 space-y-6">
      {/* Header with avatar and bookmark */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Image
            width={48}
            height={48}
            src={user?.profilePicture || UserPlaceholder.src} // Fallback image
            alt={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
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
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Project Title and Metadata */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{name}</h1>
        <p className="text-sm text-gray-500 mt-1">Posted {postedTime}</p>
      </div>

      {/* Tags (Skills) */}
      <div className="flex flex-wrap gap-2 border-y py-4">
        {skills?.map((skill: string, index: number) => (
          <Tag key={index} name={skill} />
        ))}
      </div>

      {/* Price, Deadline, and Other Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b py-4 max-w-md">
        <div>
          <h3 className="text-lg font-semibold">{budget}</h3>
          <p className="text-sm text-gray-500">{priceType}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Deadline</h3>
          <p className="text-sm text-gray-500">
            {new Date(deadline).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Category</h3>
          <p className="text-sm text-gray-500">{category}</p>
        </div>
        {experienceLevel && (
          <div>
            <h3 className="text-lg font-semibold">Experience Level</h3>
            <p className="text-sm text-gray-500">{experienceLevel}</p>
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold">Status</h3>
          <p className="text-sm text-gray-500">{status}</p>
        </div>
      </div>

      {/* Project Goal */}
      <div className="space-y-2">
        <h3 className="font-bold text-gray-900">Project Goal</h3>
        <p className="text-gray-600">{goal}</p>
      </div>

      {/* Scope of Work */}
      <div className="space-y-2 border-y py-4">
        <h3 className="font-bold text-gray-900">Scope of Work</h3>
        <p className="text-gray-600">{scopeOfWork}</p>
      </div>

      {/* Bid Requests */}
      <div>
        <h1 className="font-semibold text-xl text-gray-900 mb-4">
          Bid Requests
        </h1>
        <WithEmptyState
          data={project.bid || []}
          emptyStateProps={{
            title: "No Bids found",
            description: "No one has placed a bid on this project yet.",
          }}
          action={
            <PrimaryButton
              onClick={() => { }}
            // onClick={() => refreshProjects()}
            >
              Refresh Projects
            </PrimaryButton>
          }
          loading={isLoading}
          error={error as any}
          spinnerSize="lg"
          errorMessage=" Failed to fetch bids. Please try again later."
          errorTitle="Error Fetching bids"
          loadingMessage="Fetching latest bids..."
          loadingTitle=" Loading bids"
        >
          {(
            bids: {
              id: string;
              userId: string;
              projectId: string;
              amount: number;
              status: string;
              createdAt: string;
              updatedAt: string;
              bidUser: bidUser;
              location?: string;
              availability?: boolean;
              hourlyRate?: number;
              rating?: number;
              description?: string;
              imageUrl?: string;
            }[]
          ) => (
            <div className="">
              {bids?.map((bid, index) => (
                <div
                  key={bid.id}
                  className="flex flex-col sm:flex-row gap-4 items-start justify-between mb-6 p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      width={80}
                      height={80}
                      src={bid.bidUser?.profilePicture || "/default-avatar.png"}
                      alt={`${bid.bidUser?.firstName ?? ""} ${bid.bidUser?.lastName ?? ""
                        }`}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="font-medium text-gray-900">
                        {bid.bidUser?.firstName} {bid.bidUser?.lastName}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {bid.bidUser?.email}
                      </p>
                      <div className="text-sm text-gray-500 mt-2 flex flex-wrap items-center gap-2">
                        <p className="pr-2 border-r">
                          ${bid.amount} (Bid Amount)
                        </p>
                        <p className="pr-2 border-r">{bid.status}</p>
                        <p>
                          Bid Placed:{" "}
                          {new Date(bid.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    disabled={bid?.status === "ACCEPTED"}
                    onClick={() => setIsModalOpen(index)}
                    className="w-full sm:w-auto px-6 py-2 bg-primary/80 hover:bg-primary text-white font-medium rounded-xl transition-colors"
                  >
                    {bid?.status === "ACCEPTED"
                      ? "Request Sent"
                      : "Make Agreement"}
                  </button>
                  <Modal
                    isOpen={isModalOpen === index}
                    onClose={() => setIsModalOpen(null)}
                  >
                    <SeeProfile
                      bio={bid?.bidUser?.about?.bio || "No Data Available"}
                      name={`${bid?.bidUser?.firstName ?? ""} ${bid?.bidUser?.lastName ?? ""
                        }`}
                      title={name || "w werwqr qwerds"}
                      location={bid?.location || "Remote"}
                      availability={bid?.availability ?? false}
                      hourlyRate={bid?.hourlyRate || ""}
                      rating={bid?.rating || 0}
                      skills={bid?.bidUser?.about?.skills || []}
                      description={scopeOfWork || "No Data Available"}
                      imageUrl={
                        bid?.bidUser?.profilePicture || UserPlaceholder.src
                      }
                      onMessage={() =>
                        router.push(
                          `/messaging?user=${bid.bidUser.id}`
                        )
                      }
                      onVisitProfile={() => handleMakeAgreement(bid?.id)}
                    />
                  </Modal>
                </div>
              ))}
            </div>
          )}
        </WithEmptyState>
      </div>
    </div>
  );
};

export default AllBidRequests;
