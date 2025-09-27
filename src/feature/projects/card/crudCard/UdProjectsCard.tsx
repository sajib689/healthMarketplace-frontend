import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { DeleteProjectFunction, JobCardProps, ModalProps } from "../cardTypes";
import { Tag } from "../Tag";
import Link from "next/link";
import { UserPlaceholder } from "@/lib/placeholder";

export const UdProjectsCard = ({
  projectId,
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
  onOpen,
  handleDeleteProject,
  slug,
  status,
  id
}: JobCardProps & ModalProps & DeleteProjectFunction & { slug: string, status?: string }) => {
  return (
    <div
      className={`w-full bg-white border-gray-200  p-6 space-y-4 ${className}`}
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
        <div className="space-x-2">
          <button
            onClick={onOpen}
            className="text-gray-400 hover:text-gray-500"
          >
            <Edit className="w-6 h-6 hover:text-primary" />
          </button>
          <button
            onClick={() => handleDeleteProject(projectId)}
            className="text-gray-400 hover:text-gray-500"
          >
            <Trash2 className="w-6 h-6 hover:text-warning" />
          </button>
        </div>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">
          Posted: {new Date(postedTime).toDateString()}
        </p>
      </div>

      {/* Tags */}
      <div>
        <div className="flex flex-wrap gap-2 border-y py-4">
          {(Array.isArray(tags) ? tags : Object.values(tags || {})).map(
            (tag, index) => (
              <Tag key={index} name={tag as string} />
            )
          )}
        </div>

        {/* Price and Deadline */}
        <div className="grid grid-cols-2 gap-4 border-b py-4">
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

      {/* Description */}
      <div className="space-y-2 ">
        <p className="text-gray-600 ">{description?.slice(0, 300)}...</p>
      </div>

      {/* CTA Button */}
      <div className="flex items-center justify-start gap-2">
        <div className="mt-5">
          <Link
            href={`/bid-requests/${slug}`}
            className="w-full sm:w-auto px-6 py-3 bg-secondary/80 hover:bg-secondary text-white font-medium rounded-xl transition-colors"
          >
            See Bid request
          </Link>
        </div>
        {
          status === "COMPLETED" && <div className="mt-5">
            <Link
              href={`/delivery/${id}`}
              className="w-full sm:w-auto px-6 py-3 bg-primary/80 hover:bg-primary text-white font-medium rounded-xl transition-colors"
            >
              View Details
            </Link>
          </div>
        }
      </div>

    </div>
  );
};
