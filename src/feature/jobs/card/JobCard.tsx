import { BookmarkIcon } from "lucide-react";
import Image from "next/image";
import { Tag } from "./Tag";
import Link from "next/link";

interface JobCardProps {
  title: string;
  name: string;
  logo: string;
  location: string;
  postedTime: string;
  tags: string[];
  salary: string;
  apply?: boolean;
  id: string;
  favorite?: boolean;
  isFavorite?: boolean;
  handleToggleFavorite?: (itemId: string, itemType: "JOB") => void;
}

export const JobCard = ({
  title,
  name,
  logo,
  location,
  postedTime,
  tags,
  salary,
  apply = true,
  id,
  favorite = false,
  isFavorite,
  handleToggleFavorite,
  view,
}: JobCardProps & { view: boolean }) => {
  return (
    <div className="w-full  bg-white border-b border-gray-200 p-4 space-y-4 ">
      {/* Header with logo and bookmark */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="p-1 bg-gray-100 rounded-full">
            <Image
              width={100}
              height={100}
              src={
                logo ||
                "https://img.freepik.com/premium-vector/home-building-logo-design-modern-minimalist_1022051-108.jpg?ga=GA1.1.603131680.1747477038&semt=ais_items_boosted&w=740"
              }
              alt={name || "Company Logo"}
              className="min-w-8 min-h-8 max-w-10 max-h-10 object-contain rounded-full"
            />
          </div>
          <div className="space-y-1">
            <h1 className="lg:text-xl md:text-lg font-semibold text-gray-900">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
              <span className="text-wrap ">{name}</span>
              <span className="text-nowrap">•</span>
              <span className="">{location}</span>
              <span className="text-nowrap">•</span>
              <span className="text-nowrap">
                {new Date(postedTime).toDateString()}
              </span>
            </div>
          </div>
        </div>
        {favorite && (
          <button
            className="text-gray-400 hover:text-gray-500 transition-colors"
            onClick={() => handleToggleFavorite?.(id, "JOB")}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <BookmarkIcon
              className={`w-6 h-6 ${
                isFavorite
                  ? "fill-secondary text-secondary"
                  : "hover:fill-secondary"
              }`}
            />
          </button>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 border-y py-4">
        {(Array.isArray(tags) ? tags : Object.values(tags || {})).map(
          (tag, index) => (
            <Tag key={index} name={tag as string} />
          )
        )}
      </div>

      {/* Salary and CTA */}
      {apply && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-gray-950 font-medium">{salary}</span>
          <Link
            href={`/jobs/${id}`}
            className="px-6 py-2 bg-primary/80 hover:bg-primary text-white font-medium rounded-xl transition-colors"
          >
            Apply Now
          </Link>
        </div>
      )}
      {view && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-gray-950 font-medium">{salary}</span>
          <Link
            href={`/job-list/${id}`}
            className="px-6 py-2 bg-primary/80 hover:bg-primary text-white font-medium rounded-xl transition-colors"
          >
            View Details
          </Link>
        </div>
      )}
    </div>
  );
};
