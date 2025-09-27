/* eslint-disable @next/next/no-img-element */
import { Education } from "@/interfaces/global";
import { Edit, Trash2 } from "lucide-react";
import React from "react";

interface EducationCardProps {
  education: Education;
  onEdit: () => void;
  onDelete: () => void;
}

const EducationCard: React.FC<EducationCardProps> = ({
  education,
  onEdit,
  onDelete,
}) => {
  // Generate a random placeholder image for institutions that don't have an image
  const placeholderImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    education.institute
  )}&background=random`;

  return (
    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-300 group">
      <div className="flex gap-4">
        <div className="w-12 h-12 flex-shrink-0">
          <img
            src={placeholderImage}
            alt={education.institute}
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium text-gray-900">
                {education.institute}
              </h3>
              <p className="text-sm text-gray-700">{education.degree}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(education.startDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}{" "}
                -{" "}
                {new Date(education.endDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </p>
            </div>
            <div className="space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="text-blue-600 hover:text-blue-800 p-1"
                onClick={onEdit}
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                className="text-red-600 hover:text-red-800 p-1"
                onClick={onDelete}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-700 mt-2">{education.descriptions}</p>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
