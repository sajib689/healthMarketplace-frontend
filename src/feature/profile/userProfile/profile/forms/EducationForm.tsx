import { Education } from "@/interfaces/global";
import React, { useState } from "react";

interface EducationFormProps {
  initialData?: Education;
  onSubmit: (educationData: Education) => void;
}

// Default empty education
const emptyEducation: Education = {
  institute: "",
  degree: "",
  startDate: "",
  endDate: "",
  descriptions: "",
};

const EducationForm: React.FC<EducationFormProps> = ({
  initialData = emptyEducation,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Education>({
    ...initialData,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.institute.trim()) {
      newErrors.institute = "Institution name is required";
    }

    if (!formData.degree.trim()) {
      newErrors.degree = "Degree/Program is required";
    }

    if (!formData.startDate.trim()) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.endDate.trim()) {
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
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="institute"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Institution *
          </label>
          <input
            type="text"
            id="institute"
            name="institute"
            value={formData.institute}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.institute ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.institute && (
            <p className="text-red-500 text-xs mt-1">{errors.institute}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="degree"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Degree/Program *
          </label>
          <input
            type="text"
            id="degree"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.degree ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.degree && (
            <p className="text-red-500 text-xs mt-1">{errors.degree}</p>
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
          <input
            type="month"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.endDate ? "border-red-500" : "border-gray-300"
            }`}
          />
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
          placeholder="Describe your education, achievements, and experiences..."
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
        >
          {initialData.id ? "Update" : "Add"} Education
        </button>
      </div>
    </form>
  );
};

export default EducationForm;
