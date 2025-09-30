/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCancelDeliveryMutation } from "@/redux/api/delivey/deliveryApi";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

const cancellationReasons = [
  {
    id: "mistake",
    label: "Ordered by Mistake - The customer accidentally placed the order.",
  },
  {
    id: "better-deal",
    label:
      "Found a Better Deal - The customer found the product at a lower price elsewhere.",
  },
  {
    id: "delivery-time",
    label:
      "Delivery Time Too Long - The estimated delivery time was longer than expected.",
  },
  {
    id: "policy-violation",
    label:
      "Policy Violation - The order violates marketplace policies (e.g., prohibited items).",
  },
  {
    id: "suspicious-activity",
    label:
      "Suspicious Activity Detected - The marketplace detects potential fraud.",
  },
  {
    id: "others",
    label: "Others",
  },
];

const CancelOrder = ({
  setModalState,
  samplePost,
}: {
  setModalState: React.Dispatch<React.SetStateAction<string>>;
  samplePost: any;
}) => {
  const [selectedReason, setSelectedReason] = useState<string | undefined>();
  const [otherReason, setOtherReason] = useState("");
  console.log("smaplePost", samplePost);
  const [cancelDelivery, { isLoading }] = useCancelDeliveryMutation();

  const handleReasonChange = (value: string) => {
    setSelectedReason(value);
  };

  const handleSubmit = async () => {
    const reason = selectedReason === "others" ? otherReason : selectedReason;
    if (!reason) return; // guard if nothing selected

    try {
      const res = await cancelDelivery({
        id: samplePost.id,
        body: { cancelReason: reason },
      }).unwrap();

      console.log("Cancel successful:", res);
      setModalState("infoModal"); // close modal after success
    } catch (err: any) {
      console.error("Cancel failed:", err);

      const apiMessage =
        err?.data?.message ||
        err?.data?.errorMessages?.[0]?.message ||
        "Failed to cancel the order. Please try again.";

      toast.error(apiMessage);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-lg mb-2 font-semibold">
        Why are you cancelling the order?
      </h1>

      {/* Profile Info */}
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
            <div className="text-sm text-gray-500 mt-1 flex flex-wrap items-center gap-2">
              <p className="pr-2 border-r">{samplePost.location}</p>
              <p className="pr-1 border-r flex items-center gap-1">
                <span
                  className={`${
                    samplePost.availability ? "bg-green-600" : "bg-gray-400"
                  } w-2 h-2 rounded-full p-[3px]`}
                />
                <span
                  className={
                    samplePost.availability ? "text-green-600" : "text-gray-400"
                  }
                >
                  {samplePost.availability ? "Available Now" : "Offline"}
                </span>
              </p>
              <p className="pr-1 border-r">${samplePost.hourlyRate} / Hour</p>
              <p className="pr-1">{samplePost.rating} out of 5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reason Selection */}
      <div className="mb-6 mt-4">
        <h2 className="text-base font-medium mb-4">Cancellation Reason</h2>

        <RadioGroup
          value={selectedReason}
          onValueChange={handleReasonChange}
          className="space-y-3"
        >
          {cancellationReasons.map((reason) => (
            <div
              key={reason.id}
              className="flex items-center border border-gray-200 rounded-md px-4 py-3"
            >
              <RadioGroupItem
                value={reason.id}
                id={reason.id}
                className="mr-3"
              />
              <label
                htmlFor={reason.id}
                className="text-sm text-gray-700 cursor-pointer w-full"
              >
                {reason.label}
              </label>
            </div>
          ))}
        </RadioGroup>

        {selectedReason === "others" && (
          <div className="mt-3">
            <input
              placeholder="Please specify your reason"
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              className="w-full border-gray-200 p-2 outline-none rounded-md"
            />
          </div>
        )}
      </div>

      {/* CTA Buttons */}
      <div className="flex items-center justify-end gap-4 mt-4">
        <button
          onClick={() => setModalState("infoModal")}
          className="w-full sm:w-auto px-6 py-2 bg-gray-300/80 text-black hover:bg-gray-300 font-medium rounded-xl transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={
            !selectedReason ||
            (selectedReason === "others" && !otherReason) ||
            isLoading
          }
          className={`w-full sm:w-auto px-6 py-2 font-medium rounded-xl transition-colors ${
            !selectedReason ||
            (selectedReason === "others" && !otherReason) ||
            isLoading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-secondary/80 hover:bg-secondary text-white"
          }`}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default CancelOrder;
