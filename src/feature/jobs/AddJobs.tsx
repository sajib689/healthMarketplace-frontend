/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import {
  useCreateJobMutation,
  useGetCategoriesQuery
} from "@/redux/api/job/jobApi";
import { Suggestion, useSuggestionsQuery } from "@/redux/api/others/OthersApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  jobPosition: z.string().min(1, { message: "Job Position name is required" }),
  yourPosition: z
    .string()
    .min(1, { message: "Your Position name is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  jobType: z.string().min(1, { message: "Job Type is required" }),
  jobCategorySlug: z.string().min(1, { message: "Job category is required" }),
  subCategorySlug: z
    .string()
    .min(1, { message: "Job subcategory is required" }),
  salaryRange: z.string().min(1, { message: "Salary Range is required" }),
  experienceLevel: z.string().min(1, { message: "Experience is required" }),
  aboutTheJob: z.string().min(1, { message: "About the Job is required" }),
  responsibilities: z
    .string()
    .min(1, { message: "Responsibility is required" }),
  reqQualifications: z
    .string()
    .min(1, { message: "Qualifications is required" }),
  reqSkills: z
    .array(z.string())
    .min(1, { message: "At least One Skill is required" }),
});

type FormValues = z.infer<typeof formSchema>;

// Job type options
const jobTypeOptions = [
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
];

// Experience level options
const experienceLevelOptions = [
  { value: "Entry Level", label: "Entry Level" },
  { value: "Mid Level", label: "Mid Level" },
  { value: "Expert", label: "Expert" },
];

const subcategories = [
  {
    value: "consulting",
    option: "Consulting"
  },
  {
    value: "coaching",
    option: "Coaching"
  },
  {
    value: "expertWitness",
    option: "Expert Witness"
  },
  {
    value: "writing",
    option: "Medical Writing / Content Creation"
  },
  {
    value: "resume",
    option: "Résumé Review"
  },
  {
    value: "tutoring",
    option: "Tutoring / Test Prep"
  },
  {
    value: "testing",
    option: "Product Testing & Reviewing"
  },
  {
    value: "interviews",
    option: "Mock Interviews"
  },
  {
    value: "ambassadors",
    option: "Brand Ambassadors"
  },
]
export default function AddJobs() {
  const [createJob, { isLoading }] = useCreateJobMutation();

  const [skillInput, setSkillInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { data, isLoading: suggestionsLoading } = useSuggestionsQuery("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>(
    data?.data ?? []
  );

  // to select category for get subcategory
  // const [selectCategory, setSelectCategory] = useState<string | null>(null);
  // to get subcategory
  const { data: categoryResponse } = useGetCategoriesQuery({});
  // const id =
  //   categoryResponse?.data.find((cate) => cate.slug === selectCategory)?.id ||
  //   "";

  // const { data: subCategoryResponse } = useGetSubCategoriesByCategoryQuery(
  //   { id },
  //   { skip: !id }
  // );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobPosition: "",
      yourPosition: "",
      location: "",
      jobType: "",
      reqSkills: [],
      salaryRange: "",
      aboutTheJob: "",
      responsibilities: "",
      experienceLevel: "",
      reqQualifications: "",
      jobCategorySlug: "CLINICAL",
      subCategorySlug: "",
    },
  });

  const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSkillInput(value);

    if (value.trim() && (data?.data?.length ?? 0) > 0) {
      setShowSuggestions(true);
      setFilteredSuggestions(
        (data?.data ?? []).filter(
          (skill) =>
            skill.name.toLowerCase().includes(value.toLowerCase()) &&
            !selectedSkills.includes(skill.name)
        )
      );
    } else {
      setShowSuggestions(false);
    }
  };

  const addSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      const newSelectedSkills = [...selectedSkills, skill];
      setSelectedSkills(newSelectedSkills);
      setValue("reqSkills", newSelectedSkills);
      setSkillInput("");
      setShowSuggestions(false);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSelectedSkills = selectedSkills.filter(
      (skill) => skill !== skillToRemove
    );
    setSelectedSkills(newSelectedSkills);
    setValue("reqSkills", newSelectedSkills);
  };

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    try {
      const response = await createJob(data).unwrap();
      if (response) {
        // Reset form fields after successful submission
        setValue("jobPosition", "");
        setValue("yourPosition", "");
        setValue("location", "");
        setValue("jobType", "");
        setValue("salaryRange", "");
        setValue("experienceLevel", "");
        setValue("aboutTheJob", "");
        setValue("responsibilities", "");
        setValue("reqQualifications", "");
        setSelectedSkills([]);
        setSkillInput("");
      }
      toast.success("Job created successfully!");
    } catch (error: any) {
  console.error("Failed to create job:", error);

  const errorMessage =
    error?.data?.message ||
    error?.data?.errorMessages?.[0]?.message ||
    "Something went wrong";

  toast.error(errorMessage);
  if(errorMessage) {
    redirect('/my-plans')
  }
}


  };

  return (
    <div className="w-full container section-gap">
      <h1 className="text-lg md:text-2xl lg:text-4xl font-bold mb-6 border-b pb-2">
        Add New Jobs
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="jobPosition" className="text-sm font-medium block">
            Job Position <span className="text-red-500">*</span>
          </label>
          <input
            id="jobPosition"
            type="text"
            // placeholder="Nurse, Doctor"
            {...register("jobPosition")}
            className={`w-full px-3 py-2 border ${errors.jobPosition ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          />
          {errors.jobPosition && (
            <p className="text-red-500 text-xs">{errors.jobPosition.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="yourPosition" className="text-sm font-medium block">
            Your Position <span className="text-red-500">*</span>
          </label>
          <input
            id="yourPosition"
            type="text"
            // placeholder="HR Manager"
            {...register("yourPosition")}
            className={`w-full px-3 py-2 border ${errors.yourPosition ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          />
          {errors.yourPosition && (
            <p className="text-red-500 text-xs">
              {errors.yourPosition.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="jobCategorySlug"
              className="text-sm font-medium block"
            >
              Job Category <span className="text-red-500">*</span>
            </label>
            <select
              id="jobCategorySlug"
              defaultValue=""
              {...register("jobCategorySlug")}
              // onChange={(e) => setSelectCategory(e.target.value)}
              className={`w-full px-3 py-2 border bg-transparent ${errors.jobCategorySlug ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categoryResponse?.data.map((cate) => (
                <option key={cate.id} value={cate.slug}>
                  {cate.name}
                </option>
              ))}
            </select>
            {errors.jobCategorySlug && (
              <p className="text-red-500 text-xs">
                {errors.jobCategorySlug.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="subCategorySlug"
              className="text-sm font-medium block"
            >
              Job SubCategory <span className="text-red-500">*</span>
            </label>
            <select
              id="subCategorySlug"
              defaultValue=""
              {...register("subCategorySlug")}
              className={`w-full px-3 py-2 border  bg-transparent ${errors.subCategorySlug ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
            >
              <option value="" disabled>
                Select a subcategory
              </option>

              {subcategories.length ? (
                subcategories.map((cate) => (
                  <option key={cate.value} value={cate.value}>
                    {cate.option}
                  </option>
                ))
              ) : (
                <option>No Subcategory Available</option>
              )}
            </select>
            {errors.subCategorySlug && (
              <p className="text-red-500 text-xs">
                {errors.subCategorySlug.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium block">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              id="location"
              type="text"
              // placeholder="USA"
              {...register("location")}
              className={`w-full px-3 py-2 border ${errors.location ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
            />
            {errors.location && (
              <p className="text-red-500 text-xs">{errors.location.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="jobType" className="text-sm font-medium block">
              Job Type <span className="text-red-500">*</span>
            </label>
            <select
              id="jobType"
              {...register("jobType")}
              className={`w-full px-3 py-2 border bg-transparent ${errors.jobType ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
            >
              <option value="" disabled>
                Select job type
              </option>
              {jobTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.jobType && (
              <p className="text-red-500 text-xs">{errors.jobType.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="salaryRange" className="text-sm font-medium block">
              Salary Range <span className="text-red-500">*</span>
            </label>
            <input
              id="salaryRange"
              type="text"
              // placeholder="$50 - $100"
              {...register("salaryRange")}
              className={`w-full px-3 py-2 border ${errors.salaryRange ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
            />
            {errors.salaryRange && (
              <p className="text-red-500 text-xs">
                {errors.salaryRange.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="experienceLevel" className="text-sm font-medium block">
              Experience Level <span className="text-red-500">*</span>
            </label>
            <select
              id="experienceLevel"
              {...register("experienceLevel")}
              className={`w-full px-3 py-2 border bg-transparent ${errors.experienceLevel ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
            >
              <option value="" disabled>
                Select experience level
              </option>
              {experienceLevelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.experienceLevel && (
              <p className="text-red-500 text-xs">
                {errors.experienceLevel.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="aboutJob" className="text-sm font-medium block">
            About The Job
          </label>
          <textarea
            id="aboutJob"
            // placeholder="I need some who understands the process of submitting sequencing..."
            rows={4}
            {...register("aboutTheJob")}
            className={`w-full px-3 py-2 border ${errors.aboutTheJob ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          />
          {errors.aboutTheJob && (
            <p className="text red-500 text-xs">{errors.aboutTheJob.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="responsibility" className="text-sm font-medium block">
            Responsibilities
          </label>
          <textarea
            id="responsibility"
            // placeholder="I need some who understands the process of submitting sequencing..."
            rows={4}
            {...register("responsibilities")}
            className={`w-full px-3 py-2 border ${errors.responsibilities ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          />
          {errors.responsibilities && (
            <p className="text-red-500 text-xs">
              {errors.responsibilities.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="qualifications" className="text-sm font-medium block">
            Required Qualifications
          </label>
          <textarea
            id="qualifications"
            // placeholder="It will take time to decide on when to hire or get the work started..."
            rows={4}
            {...register("reqQualifications")}
            className={`w-full px-3 py-2 border ${errors.reqQualifications ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          />
          {errors.reqQualifications && (
            <p className="text-red-500 text-xs">
              {errors.reqQualifications.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="requiredSkill" className="text-sm font-medium block">
            Required Skill
          </label>
          <div className="flex  items-center justify-start border rounded-lg focus-within:border-primary p-1">
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <div
                  key={skill}
                  className="bg-gray-50 border text-gray-800 px-3 py-1 rounded-full flex items-center gap-1"
                >
                  {skill}
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={() => removeSkill(skill)}
                  />
                </div>
              ))}
            </div>
            <div>
              {
                !suggestionsLoading && <div className="relative flex-1">
                  <input
                    id="requiredSkill"
                    type="text"
                    // placeholder="Add skills..."
                    value={skillInput}
                    onChange={handleSkillInputChange}
                    onFocus={() => skillInput.trim() && setShowSuggestions(true)}
                    className="w-full px-3 py-2 rounded-md focus:outline-none "
                  />

                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                      {filteredSuggestions.map((skill) => (
                        <div
                          key={skill.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => addSkill(skill.name)}
                        >
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              }
            </div>
          </div>
          <Controller
            name="reqSkills"
            control={control}
            render={() => <input type="hidden" />}
          />
          {errors.reqSkills && (
            <p className="text-red-500 text-xs">{errors.reqSkills.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <PrimaryButton
            loading={isLoading}
            // loading
            onClick={() => { }}
            text="Upload New Job"
          />
        </div>
      </form>
    </div>
  );
}