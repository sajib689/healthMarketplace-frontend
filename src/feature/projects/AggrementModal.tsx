/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { JobCardProps } from "./card/cardTypes";
import { Tag } from "./card/Tag";

type CloseModal = {
  onClose: any | (() => void);
};

export const AgreementModal = ({
  name,
  avatar,
  title,
  postedTime,
  tags,
  budget,
  priceType,
  deadline,
  description,
  className,
  scopeWork,
  onClose,
  status,
  handleAccept,
}: JobCardProps & CloseModal & { status: string; handleAccept: any }) => {
  return (
    <div
      className={`w-full bg-white border-gray-200 p-3 space-y-4 ${className}`}
    >
      {/* Header with avatar and bookmark */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Image
            width={40}
            height={40}
            src={avatar}
            alt={name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-medium text-gray-900">{name}</h2>
          </div>
        </div>
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
        <p className="text-gray-600  max-w-lg max-h-[150px] overflow-y-scroll">
          <span className="my-1 font-bold">Project Goal</span>
          <br />
          {description}
        </p>
      </div>
      <div className="space-y-2 border-y py-2">
        <p className="text-gray-600  max-w-lg max-h-[150px] overflow-y-scroll">
          <span className="my-1 font-bold">Scope Of Work</span>
          <br />
          {scopeWork}
        </p>
      </div>

      {/* CTA Button */}
      <div className="flex items-center justify-end gap-4">
        <button
          onClick={onClose}
          className="w-full sm:w-auto px-6 py-2 bg-gray-300/80 hover:bg-gray-400 text-gray-800 font-medium rounded-xl transition-colors"
        >
          Cancel Agreement
        </button>
        <button
          onClick={handleAccept}
          className="w-full sm:w-auto px-6 py-2 bg-primary/80 hover:bg-primary text-white font-medium rounded-xl transition-colors"
        >
          {status === "PENDING" ? "Confirm" : "Cancel"}
        </button>
      </div>
    </div>
  );
};
