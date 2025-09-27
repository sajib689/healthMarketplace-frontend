/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraduationCap, Plus, X } from "lucide-react";
import React, { useState } from "react";
import EducationCard from "./cards/EducationCard";
import EducationForm from "./forms/EducationForm";
import { Education } from "@/interfaces/global";
import {
  useCreateEducationMutation,
  useDeleteEducationMutation,
  useUpdateEducationMutation,
} from "@/redux/api/profile/profileApi";
import { toast } from "sonner";

interface EducationSectionProps {
  education: Education[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [createEducation] = useCreateEducationMutation();
  const [updateEducation] = useUpdateEducationMutation();
  const [deleteEducation] = useDeleteEducationMutation();

  const handleAddEducation = async (educationData: Education) => {
    const { institute, degree, startDate, endDate, descriptions } =
      educationData;
    try {
      const res = await createEducation({
        institute,
        degree,
        startDate,
        endDate,
        descriptions: descriptions,
      });

      if (res.data?.success) {
        setIsAdding(false);
        toast.success("Education Added Successfully");
      } else {
        toast.error("Education couldn't Added");
      }
    } catch (err: any) {
      setIsAdding(false);
      toast.error("Education couldn't Added", err);
    } finally {
      setIsAdding(false);
    }
  };

  // Update with all parameters
  const modifyEducation = async (educationData: Education) => {
    const { institute, degree, startDate, endDate, descriptions } =
      educationData;
    try {
      const res = await updateEducation({
        id: editingId || "",
        body: { institute, degree, startDate, endDate, descriptions },
      }).unwrap();
      if (res.success) {
        setEditingId(null);
        toast.success("Education Added Successfully");
      } else {
        toast.error("Education couldn't Added");
      }
    } catch (err: any) {
      setEditingId(null);
      toast.error("Education couldn't Added", err);
    } finally {
      setEditingId(null);
    }
  };

  // Delete with ID parameter
  const removeEducation = async (id: string) => {
    try {
      const res = await deleteEducation(id).unwrap();
      if (res.success) {
        setEditingId(null);
        toast.success("Education Deleted Successfully");
      } else {
        toast.error("Education couldn't Delete");
      }
    } catch (err: any) {
      setEditingId(null);
      toast.error("Education couldn't Delete", err);
    } finally {
      setEditingId(null);
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium flex items-center gap-1">
          <GraduationCap /> Education
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
            <h3 className="font-medium">Add New Education</h3>
            <button
              onClick={() => setIsAdding(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <EducationForm onSubmit={handleAddEducation} />
        </div>
      )}

      <div className="space-y-6">
        {education.length === 0 ? (
          <p className="text-gray-500 italic text-sm">
            No education added yet.
          </p>
        ) : (
          education.map((edu) => (
            <div key={edu.id}>
              {editingId === edu.id ? (
                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Edit Education</h3>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <EducationForm initialData={edu} onSubmit={modifyEducation} />
                </div>
              ) : (
                <EducationCard
                  education={edu}
                  onEdit={() => setEditingId(edu.id || "")}
                  onDelete={() => removeEducation(edu.id || "")}
                />
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default EducationSection;
