/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookmarkIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { JobCardProps } from "./card/cardTypes";
import { Tag } from "./card/Tag";
import { useCreateBidMutation } from "@/redux/api/bid/bidApi";
import { UserPlaceholder } from "@/lib/placeholder";
import { hasAccess } from "@/hooks/useHasAccess";

type CloseModal = {
  onClose: () => void;
};

export const BidNowModal = ({
  name,
  avatar,
  title,
  postedTime,
  tags,
  priceType,
  deadline,
  description,
  className,
  scopeWork,
  onClose,
  id,
  budget,
  handleToggleFavorite,
  projectId,
  isFavorite,
}: JobCardProps & CloseModal) => {
  const [bidAmount, setBidAmount] = useState<number | string>("");

  const [error, setError] = useState<string | null>(null);
  const [createBid, { isLoading, error: biderror }] = useCreateBidMutation();

  // Extract fixed amount if priceType is Fixed
  const fixedAmount =
    priceType === "Fixed" ? parseInt(budget?.match(/\d+/)?.[0] || "0") : null;

  const handleBidSubmit = async () => {
    setError(null);

    // Validate bid amount
    if (
      priceType === "Negotiable" &&
      (!bidAmount || isNaN(Number(bidAmount)))
    ) {
      setError("Please enter a valid bid amount");
      return;
    }

    const amount = priceType === "Fixed" ? fixedAmount : Number(bidAmount);

    if (!amount || amount <= 0) {
      setError("Bid amount must be greater than 0");
      return;
    }

    if (!projectId) {
      setError("Project ID is missing");
      return;
    }

    try {
      const result = await createBid({
        projectId,
        amount,
      }).unwrap();

      if (result.success) {
        onClose(); // Close modal on successful bid
      }
    } catch (err: any) {
      setError(err.data?.message || "Failed to place bid");
    }
  };

  console.log(
    biderror &&
    "data" in biderror &&
    typeof biderror.data === "object" &&
    biderror.data !== null &&
    "message" in (biderror.data as Record<string, unknown>) &&
    (biderror.data as Record<string, any>).message
  );
  return (
    <div
      className={`w-full bg-white border-gray-200 p-3 space-y-4 ${className} `}
    >
      {/* Header with avatar and bookmark */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Image
            width={40}
            height={40}
            src={avatar || UserPlaceholder.src}
            alt={name}
            className="w-10 h-10 rounded-full"
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
            <h2 className="font-medium text-gray-900">{name}</h2>
          </div>
        </div>
        <button
          className="text-gray-400 hover:text-gray-500 transition-colors"
          onClick={() => handleToggleFavorite(projectId, "PROJECT")}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <BookmarkIcon
            className={`w-6 h-6 ${isFavorite
              ? "fill-secondary text-secondary"
              : "hover:fill-secondary"
              }`}
          />
        </button>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">Posted {postedTime}</p>
      </div>

      {/* Tags */}
      <div>
        <div className="flex flex-wrap gap-2 border-y py-4 max-w-lg">
          {(Array.isArray(tags) ? tags : Object.values(tags || {})).map(
            (tag, index) => (
              <Tag key={index} name={tag as string} />
            )
          )}
        </div>

        {/* Price and Deadline */}
        <div className="grid grid-cols-2 gap-4 border-b py-4">
          <div>
            <h3 className="md:text-xl lg:text-lg text-sm font-semibold">
              {budget}
            </h3>
            <p className="text-sm text-gray-500">{priceType}</p>
          </div>
          <div>
            <h3 className="md:text-xl lg:text-lg text-sm font-semibold">
              Deadline
            </h3>
            <p className="text-sm text-gray-500">{deadline}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <div className="text-gray-600 max-w-lg">
          <span className="my-1 font-bold">Project Goal</span>
          <br />
          <p className="max-h-[100px] overflow-y-scroll">
            {description}
          </p>
        </div>
      </div>
      <div className="space-y-2 border-y py-2">
        <div className="text-gray-600 max-w-lg">
          <span className="my-1 font-bold">Scope Of Work</span>
          <br />
          <p className="max-h-[100px] overflow-y-scroll">
            {scopeWork}
          </p>
        </div>
      </div>

      {/* Bid Amount Input (Conditional for Negotiable projects) */}
      {priceType === "Negotiable" && (
        <div className="space-y-2">
          <label
            htmlFor="bidAmount"
            className="block text-sm font-medium text-gray-700"
          >
            Your Bid Amount ($)
          </label>
          <input
            type="number"
            id="bidAmount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            placeholder="Enter your bid amount"
            min="1"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      )}

      {/* CTA Button */}
      <div className="flex items-center justify-end gap-4">
        <button
          onClick={onClose}
          className="w-full sm:w-auto px-6 py-2 bg-gray-300/80 hover:bg-gray-400 text-gray-800 font-medium rounded-xl transition-colors"
        >
          Cancel
        </button>
        {id ? (
          ""
        ) : (
          <button
            onClick={() => hasAccess({
              roles: ["INDIVIDUAL"], // roles allowed
              event: handleBidSubmit,               // function to run if allowed
            })}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-2 bg-secondary/80 hover:bg-secondary text-white font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Submitting..." : "Bid Now"}
          </button>
        )}
      </div>
      <div className="text-end text-sm text-red-400">
        {biderror && <span>*</span>}
        {biderror &&
          "data" in biderror &&
          typeof biderror.data === "object" &&
          biderror.data !== null &&
          "message" in (biderror.data as Record<string, unknown>) &&
          (biderror.data as Record<string, any>).message}
      </div>
    </div>
  );
};
