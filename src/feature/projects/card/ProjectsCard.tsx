import { BookmarkIcon } from "lucide-react";
import Image from "next/image";
import { Tag } from "./Tag";
import { JobCardProps, ModalProps } from "./cardTypes";
import { UserPlaceholder } from "@/lib/placeholder";
import { hasAccess } from "@/hooks/useHasAccess";

export const ProjectsCard = ({
  name,
  avatar,
  title,
  postedTime,
  tags,
  priceType,
  deadline,
  description,
  className,
  onOpen,
  budget,
  id,
  isFavorite,
  projectId,
  handleToggleFavorite,
  favorite,
  isBid,
}: JobCardProps & ModalProps & { isBid?: boolean }) => {
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
        {favorite && (
          <button
            className="text-gray-400 hover:text-gray-500 transition-colors"
            onClick={() => handleToggleFavorite(projectId, "PROJECT")}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <BookmarkIcon
              className={`w-6 h-6 ${isFavorite
                ? "fill-secondary text-secondary"
                : "hover:fill-secondary"
                }`}
            />
          </button>
        )}
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
      <div className="space-y-2">
        <p className="text-gray-600 line-clamp-2">
          {description?.slice(0, 100)}...
          <button
            onClick={onOpen}
            className="text-blue-500 hover:text-blue-600 text-sm font-medium mx-1"
          >
            See more
          </button>
        </p>
      </div>
      {/* CTA Button */}
      {isBid ? (
        ""
      ) : (
        <div>
          {id ? (
            ""
          ) : (
            <button
              onClick={() => hasAccess({
                roles: ["INDIVIDUAL"], // roles allowed
                event: onOpen,               // function to run if allowed
              })}
              className="w-full sm:w-auto px-6 py-2 bg-secondary/80 hover:bg-secondary text-white font-medium rounded-xl transition-colors"
            >
              Bid Now
            </button>
          )}
        </div>
      )
      }
    </div >
  );
};
