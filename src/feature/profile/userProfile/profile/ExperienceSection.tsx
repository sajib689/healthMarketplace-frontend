/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileText, Plus, X } from "lucide-react";
import React, { useState } from "react";
import ExperienceCard from "./cards/ExperienceCard";
import ExperienceForm from "./forms/ExperienceForm";
import { Experience } from "@/interfaces/global";
import {
  useCreateExperienceMutation,
  useDeleteExperienceMutation,
  useUpdateExperienceMutation,
} from "@/redux/api/profile/profileApi";
import { toast } from "sonner";

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [createExperience] = useCreateExperienceMutation();
  const [updateExperience] = useUpdateExperienceMutation();
  const [deleteExperience] = useDeleteExperienceMutation();

  const handleId = (id: string) => {
    console.log(id);
    setEditingId(id);
  };

  // Create with all parameters
  const addExperience = async (data: Experience) => {
    const {
      companyName,
      position,
      location,
      employmentType,
      startDate,
      endDate,
      isCurrent,
      descriptions,
      skillsUsed,
    } = data;
    try {
      const res = await createExperience({
        companyName,
        position,
        location,
        employmentType,
        startDate,
        endDate,
        isCurrent,
        descriptions,
        skillsUsed,
      }).unwrap();

      if (res.success) {
        setIsAdding(false);
        toast.success("Education Added Successfully");
      } else {
        toast.error("Education couldn't Added");
      }
    } catch (err: any) {
      toast.error("Education couldn't Added", err);
    } finally {
      setIsAdding(false);
    }
  };

  // Update with all parameters
  const modifyExperience = async (data: Experience) => {
    const {
      companyName,
      position,
      location,
      employmentType,
      startDate,
      endDate,
      isCurrent,
      descriptions,
      skillsUsed,
    } = data;
    try {
      const res = await updateExperience({
        id: editingId || "",
        body: {
          companyName,
          position,
          location,
          employmentType,
          startDate,
          endDate,
          isCurrent,
          descriptions,
          skillsUsed,
        },
      }).unwrap();
      if (res.success) {
        setEditingId(null);
        toast.success("Experience Added Successfully");
      } else {
        toast.error("Experience couldn't Added");
      }
    } catch (err: any) {
      setEditingId(null);
      toast.error("Experience couldn't Added", err);
    } finally {
      setEditingId(null);
    }
  };

  // Delete with ID parameter
  const removeExperience = async (id: string) => {
    try {
      const result = await deleteExperience(id).unwrap();
      console.log("Experience deleted:", result);
      return result;
    } catch (error) {
      console.error("Deletion failed:", error);
      throw error;
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium flex items-center gap-1">
          <FileText className="w-5 h-5" /> Experience
        </h2>
        <button
          className="text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors duration-300"
          onClick={() => setIsAdding(true)}
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">Add</span>
        </button>
      </div>

      {isAdding && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Add New Experience</h3>
            <button
              onClick={() => setIsAdding(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <ExperienceForm onSubmit={addExperience} />
        </div>
      )}

      <div className="space-y-6">
        {experiences.length === 0 ? (
          <p className="text-gray-500 italic text-sm">
            No experience added yet.
          </p>
        ) : (
          experiences.map((experience) => (
            <div key={experience.id}>
              {editingId === experience.id ? (
                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Edit Experience</h3>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <ExperienceForm
                    initialData={experience}
                    onSubmit={modifyExperience}
                  />
                </div>
              ) : (
                <ExperienceCard
                  experience={experience}
                  onEdit={() => handleId(experience.id || "")}
                  onDelete={() => removeExperience(experience.id || "")}
                />
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
