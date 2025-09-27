/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { JobCardProps, ModalProps } from "./cardTypes";
import Link from "next/link";

export const PendingProjectsCard = ({
  id,
  name,
  avatar,
  title,
  postedTime,
  budget,
  priceType,
  deadline,
  className,
  onOpen,
  pending,
  onMessage
}: JobCardProps & ModalProps & { onMessage?: any }) => {
  return (
    <div
      className={`w-full bg-white border-gray-200  p-6 space-y-4 ${className}`}
    >
      <div className="flex flex-col sm:flex-row w-full sm:items-center justify-between">
        <div className="space-y-4">
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
            <div className="max-w-3xl">
              <h1 className="text-xl font-semibold text-gray-900 ">{title}</h1>
            </div>
            <p className="text-sm text-gray-500 mt-1">Posted {postedTime}</p>
          </div>

          <div>
            {/* Price and Deadline */}
            <div className="grid grid-cols-2 gap-4 py-4 min-w-80">
              <div>
                <h3 className="md:text-xl text-lg font-semibold">{budget}</h3>
                <p className="text-sm text-gray-500">{priceType}</p>
              </div>
              <div>
                <h3 className="md:text-xl text-lg font-semibold">Deadline</h3>
                <p className="text-sm text-gray-500">{deadline}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:min-w-80">
          {/* CTA Button */}
          {pending ? (
            <Link
              href={`/delivery/${id}`}
              onClick={onOpen}
              className="w-full text-center sm:w-auto px-6 py-3 bg-secondary/80 hover:bg-secondary text-white font-medium rounded-xl transition-colors"
            >
              View Details
            </Link>
          ) : (
            <button
              onClick={onOpen}
              className="w-full sm:w-auto px-6 py-3 bg-secondary/80 hover:bg-secondary text-white font-medium rounded-xl transition-colors"
            >
              Deliver Now
            </button>
          )}

          {/* CTA Button */}
          <button
            onClick={onMessage}
            className="w-full sm:w-auto px-6 py-3 border border-black font-medium rounded-xl transition-colors"
          >
            Message
          </button>
        </div>
      </div>
    </div>
  );
};
