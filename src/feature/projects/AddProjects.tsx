"use client";

import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { useGetCategoriesQuery } from "@/redux/api/job/jobApi";
import { Suggestion, useSuggestionsQuery } from "@/redux/api/others/OthersApi";
import { useCreateProjectMutation } from "@/redux/api/projects/projectApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";


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



const formSchema = z
  .object({
    name: z.string().min(1, { message: "Project name is required" }),
    skills: z
      .array(z.string())
      .min(1, { message: "At least one skill is required" }),
    priceType: z.enum(["Fixed", "Negotiable"]),
    budget: z.string().optional(),
    min_price: z.string().optional(),
    max_price: z.string().optional(),
    deadline: z.string().min(1, { message: "Deadline is required" }),
    goal: z.string().min(1, { message: "Project goal is required" }),
    scopeOfWork: z.string().min(1, { message: "Scope of work is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    subCategory: z.string().min(1, { message: "SubCategory is required" }),

  })
  .superRefine((data, ctx) => {
    // Validate required fields based on priceType
    if (data.priceType === "Fixed") {
      if (!data.budget || data.budget.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["budget"],
          message: "Budget is required for Fixed price type",
        });
      }
    }

    if (data.priceType === "Negotiable") {
      if (!data.min_price || data.min_price.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["min_price"],
          message: "Min price is required for Negotiable price type",
        });
      }

      if (!data.max_price || data.max_price.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["max_price"],
          message: "Max price is required for Negotiable price type",
        });
      }
    }
  });

type FormValues = z.infer<typeof formSchema>;

export default function AddNewProject() {
  const [priceType, setPriceType] = useState<"Fixed" | "Negotiable">("Fixed");
  const [skillInput, setSkillInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { data, isLoading: suggestionsLoading } = useSuggestionsQuery("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>(
    data?.data ?? []
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      skills: [],
      budget: "",
      priceType: "Fixed",
      deadline: "",
      goal: "",
      scopeOfWork: "",
      category: "",
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
      setValue("skills", newSelectedSkills);
      setSkillInput("");
      setShowSuggestions(false);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSelectedSkills = selectedSkills.filter(
      (skill) => skill !== skillToRemove
    );
    setSelectedSkills(newSelectedSkills);
    setValue("skills", newSelectedSkills);
  };

  const handlePriceTypeChange = (type: "Fixed" | "Negotiable") => {
    setPriceType(type);
    setValue("priceType", type);
    setValue("budget", ""); // Clear budget when changing price type
  };

  const { data: categoryResponse } = useGetCategoriesQuery({});
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const onSubmit = async (data: FormValues) => {
    try {
      // Transform data if needed (e.g., format dates)
      const projectData = {
        name: data.name,
        priceType: data.priceType,
        deadline: data.deadline,
        goal: data.goal,
        scopeOfWork: data.scopeOfWork,
        category: data.category,
        budget:
          data.priceType === "Fixed"
            ? data.budget ?? ""
            : `${data.min_price ?? ""} - ${data.max_price ?? ""}`,
        // Ensure skills is always an array
        skills: Array.isArray(data.skills) ? data.skills : [data.skills],
      };

      // Call the mutation
      const result = await createProject(projectData).unwrap();
      if (result.success) {
        toast.success("Project created successfully:");
      } else {
        toast.error(`Failed to create project: ${result.message}`);
        // Handle error (show error message, etc.)
      }
      // Handle success (redirect, show notification, etc.)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to create project:");
      // Handle error (show error message, etc.)
    }
  };

  console.log(data?.data)

  return (
    <div className="w-full container section-gap">
      <h1 className="text-lg md:text-2xl lg:text-4xl font-bold mb-6 border-b pb-2">
        Add New Project
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium block">
            Project Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            // placeholder="I will do UI UX design for your mobile app design"
            {...register("name")}
            className={`w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>
        <div>
          {
            !suggestionsLoading && <div className="space-y-2">
              <label htmlFor="requiredSkill" className="text-sm font-medium block">
                Required Skill <span className="text-red-500">*</span>
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
                <div className="relative flex-1">
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
              </div>
              <Controller
                name="skills"
                control={control}
                render={() => <input type="hidden" />}
              />
              {errors.skills && (
                <p className="text-red-500 text-xs">{errors.skills.message}</p>
              )}
            </div>
          }
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium block">
              Project Price Type <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-primary"
                  checked={priceType === "Fixed"}
                  onChange={() => handlePriceTypeChange("Fixed")}
                />
                <span className="ml-2">Fixed</span>
              </label>
              {/* <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-primary"
                  checked={priceType === "Negotiable"}
                  onChange={() => handlePriceTypeChange("Negotiable")}
                />
                <span className="ml-2">Negotiable</span>
              </label> */}
            </div>
            {errors.priceType && (
              <p className="text-red-500 text-xs">{errors.priceType.message}</p>
            )}
          </div>
          {priceType === "Fixed" ? (
            <div className="space-y-2">
              <label htmlFor="budget" className="text-sm font-medium block">
                Project Budget <span className="text-red-500">*</span>
              </label>
              <input
                id="budget"
                type="text"
                // placeholder="e.g $50 - $100"
                {...register("budget")}
                className={`w-full px-3 py-2 border ${errors.budget ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
              />
              {errors.budget && (
                <p className="text-red-500 text-xs">{errors.budget.message}</p>
              )}
              <span className="text-xs text-blue-500 mt-1 block">
                Pleas include a currency symbol (e.g. $, €, £) in the price.
              </span>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="min_price"
                    className="text-sm font-medium block"
                  >
                    Project Min Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="min_price"
                    type="text"
                    // placeholder="e.g $50 - $100, $20 - $300/hr etc"
                    {...register("min_price")}
                    className={`w-full px-3 py-2 border ${errors.min_price ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
                  />
                  {errors.min_price && (
                    <p className="text-red-500 text-xs">
                      {errors.min_price.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="max_price"
                    className="text-sm font-medium block"
                  >
                    Project Max Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="max_price"
                    type="text"
                    // placeholder="e.g $50 - $100, $20 - $300/hr etc"
                    {...register("max_price")}
                    className={`w-full px-3 py-2 border ${errors.max_price ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
                  />
                  {errors.max_price && (
                    <p className="text-red-500 text-xs">
                      {errors.max_price.message}
                    </p>
                  )}
                </div>
              </div>
              <span className="text-xs text-blue-500 mt-1 block">
                Pleas include a currency symbol (e.g. $, €, £) in the price.
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium block">
              Category <span className="text-red-500">*</span>
            </label>

            <select
              id="category"
              defaultValue=""
              {...register("category")}
              // onChange={(e) => setSelectCategory(e.target.value)}
              className={`w-full px-3 py-2 border bg-transparent ${errors.category ? "border-red-500" : "border-gray-300"
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
            {errors.category && (
              <p className="text-red-500 text-xs">{errors.category.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="subCategory"
              className="text-sm font-medium block"
            >
              SubCategory <span className="text-red-500">*</span>
            </label>
            <select
              id="subCategory"
              defaultValue=""
              {...register("subCategory")}
              className={`w-full px-3 py-2 border  bg-transparent ${errors.subCategory ? "border-red-500" : "border-gray-300"
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
            {errors.subCategory && (
              <p className="text-red-500 text-xs">
                {errors.subCategory.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="deadline" className="text-sm font-medium block">
              Deadline <span className="text-red-500">*</span>
            </label>
            <input
              id="deadline"
              type="date"
              {...register("deadline")}
              className={`w-full px-3 py-2 border ${errors.deadline ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
            />
            {errors.deadline && (
              <p className="text-red-500 text-xs">{errors.deadline.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="goal" className="text-sm font-medium block">
            Project goal <span className="text-red-500">*</span>
          </label>
          <textarea
            id="goal"
            // placeholder="I need some who understands the process of submitting sequencing..."
            rows={4}
            {...register("goal")}
            className={`w-full px-3 py-2 border ${errors.goal ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          />
          {errors.goal && (
            <p className="text-red-500 text-xs">{errors.goal.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="scopeOfWork" className="text-sm font-medium block">
            Scope of work <span className="text-red-500">*</span>
          </label>
          <textarea
            id="scopeOfWork"
            // placeholder="It will take time to decide on when to hire or get the work started..."
            rows={4}
            {...register("scopeOfWork")}
            className={`w-full px-3 py-2 border ${errors.scopeOfWork ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          />
          {errors.scopeOfWork && (
            <p className="text-red-500 text-xs">{errors.scopeOfWork.message}</p>
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
            onClick={() => { }}
            text="Upload New Project"
          />
        </div>
      </form>
    </div>
  );
}
