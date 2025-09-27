import { Experience } from "@/interfaces/global";
import React, { useState } from "react";

interface ExperienceFormProps {
  initialData?: Experience;
  onSubmit: (data: Experience) => void;
}

// Default empty experience
const emptyExperience: Experience = {
  companyName: "",
  location: "",
  startDate: "",
  endDate: "",
  descriptions: "",
};

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  initialData = emptyExperience,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Experience>({
    ...initialData,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(
    initialData.endDate === "Present"
  );

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.startDate.trim()) {
      newErrors.startDate = "Start date is required";
    }

    if (!isCurrentlyWorking && !formData?.endDate?.trim()) {
      newErrors.endDate = "End date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      // If currently working, set endDate to "Present"
      const finalData = {
        ...formData,
        endDate: isCurrentlyWorking ? "Present" : formData.endDate,
      };
      onSubmit(finalData);
    }
  };

  const handleCurrentlyWorkingChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsCurrentlyWorking(e.target.checked);
    if (e.target.checked) {
      setFormData((prev) => ({ ...prev, endDate: "Present" }));
      // Clear end date error if it exists
      if (errors.endDate) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.endDate;
          return newErrors;
        });
      }
    } else {
      setFormData((prev) => ({ ...prev, endDate: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Company Name *
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.companyName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.companyName && (
            <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">{errors.location}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Start Date *
          </label>
          <input
            type="month"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.startDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.startDate && (
            <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            End Date *
          </label>
          <div className="space-y-2">
            <input
              type="month"
              id="endDate"
              name="endDate"
              value={isCurrentlyWorking ? "" : formData.endDate || ""}
              onChange={handleChange}
              disabled={isCurrentlyWorking}
              className={`w-full p-2 border rounded ${
                errors.endDate ? "border-red-500" : "border-gray-300"
              } ${isCurrentlyWorking ? "bg-gray-100" : ""}`}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="currentlyWorking"
                checked={isCurrentlyWorking}
                onChange={handleCurrentlyWorkingChange}
                className="mr-2"
              />
              <label
                htmlFor="currentlyWorking"
                className="text-sm text-gray-700"
              >
                I currently work here
              </label>
            </div>
          </div>
          {errors.endDate && (
            <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="descriptions"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="descriptions"
          name="descriptions"
          value={formData.descriptions}
          onChange={handleChange}
          rows={4}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Describe your responsibilities and achievements..."
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
        >
          {initialData.id ? "Update" : "Add"} Experience
        </button>
      </div>
    </form>
  );
};

export default ExperienceForm;
