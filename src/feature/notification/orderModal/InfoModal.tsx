/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tag } from "@/feature/jobs/card/Tag";
import Image from "next/image";

// Sample post data

export const InfoModal = ({
  setModalState,
  samplePost,
  actions,
}: {
  setModalState: React.Dispatch<React.SetStateAction<string>>;
  samplePost: any;
  actions: "cancel" | "confirm" | "infoModal";
}) => {
  // Handler for "Bid Now" button (you can replace `onOpen` with actual function if needed)

  return (
    <div className={`w-full bg-white border-gray-200 p-6 space-y-4`}>
      {/* Title */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          {samplePost.title}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Posted {samplePost.postedTime}
        </p>
      </div>

      {/* Tags */}
      <div>
        <div className="flex flex-wrap gap-2 border-y py-4">
          {samplePost.tags.map((tag: any, index: number) => (
            <Tag key={index} name={tag} />
          ))}
        </div>

        {/* Price and Deadline */}
        <div className="grid grid-cols-2 gap-4 border-b py-4">
          <div>
            <h3 className="md:text-xl text-lg font-semibold">
              {samplePost.budget}
            </h3>
            <p className="text-sm text-gray-500">{samplePost.priceType}</p>
          </div>
          <div>
            <h3 className="md:text-xl text-lg font-semibold">Deadline</h3>
            <p className="text-sm text-gray-500">{samplePost.deadline}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <p className="text-gray-600 max-w-lg max-h-[100px] overflow-y-scroll">
          {samplePost.description}
        </p>
      </div>

      {/* Header with avatar and bookmark */}
      <h1 className="font-semibold text-black">Provider</h1>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Image
            width={100}
            height={100}
            src={samplePost.avatar}
            alt={samplePost.name}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="font-medium text-gray-900">{samplePost.name}</h2>
            <h1 className="text-xl font-semibold text-gray-900">
              {samplePost.title}
            </h1>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex items-center justify-end gap-4 mt-4">
        {actions === "cancel" ? (
          <button
            onClick={() => setModalState("CancelOrder")}
            className="w-full sm:w-auto px-6 py-2 bg-gray-300/80 text-black hover:bg-gray-300  font-medium rounded-xl transition-colors"
          >
            Cancel Order
          </button>
        ) : (
          <button
            onClick={() => setModalState("confirmOrder")}
            className="w-full sm:w-auto px-6 py-2 bg-secondary/80 hover:bg-secondary text-white font-medium rounded-xl transition-colors"
          >
            Accept Delivery
          </button>
        )}
      </div>
    </div>
  );
};
