import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { Experience } from "@/interfaces/global";

interface ExperienceCardProps {
  experience: Experience;
  onEdit: () => void;
  onDelete: () => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-300 group">
      <div className="flex justify-between">
        <div>
          <h3 className="font-medium text-gray-900">
            {experience.companyName}
          </h3>
          <p className="text-sm text-gray-600">{experience.location}</p>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(experience?.startDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })}{" "}
            -{" "}
            {experience.endDate === "Present"
              ? "Present"
              : new Date(experience.endDate as string).toLocaleDateString(
                  "en-us",
                  {
                    year: "numeric",
                    month: "short",
                  }
                )}
          </p>
        </div>
        <div className="space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="text-blue-600 hover:text-blue-800 p-1">
            <Edit onClick={onEdit} className="w-4 h-4" />
          </button>
          <button
            className="text-red-600 hover:text-red-800 p-1"
            onClick={onDelete}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-700 mt-2">{experience.descriptions}</p>
    </div>
  );
};

export default ExperienceCard;
