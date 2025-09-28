/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import DnDInput from "@/components/ui/DragNDrop";
import { useApplyJobMutation } from "@/redux/api/job/jobApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const jobSchema = z.object({
  name: z.string().min(1, { message: "Full Name is required" }),
  email: z.string().email({ message: "Valid Email is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  coverLetter: z.string().min(10, { message: "Cover letter is required" }),
});

type JobFormValues = z.infer<typeof jobSchema>;

export default function ApplyJobForm() {
  const [applyJob, { isLoading }] = useApplyJobMutation();
  const id = useSearchParams()?.get("id");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
  });

  const [images, setImages] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const onSubmit = async (formData: JobFormValues) => {
    if (images) {
      setFileError(null);
      try {
        const applicationData = {
          jobId: id as string,
          name: formData.name,
          email: formData.email,
          position: formData.position,
          coverLetter: formData.coverLetter,
          resume: images,
        };

        const result = await applyJob(applicationData).unwrap();
        toast.success("Application submitted successfully!", {
          position: "top-right",
        });

        console.log("Application successful:", result);

        // reset file after submission
        setImages(null);
      } catch (error: any) {
        console.error("Application failed:", error);

        const errorMessage =
          error?.data?.message || error?.data?.errorMessages?.[0]?.message || "Failed to submit application";
        toast.error(errorMessage, {
          position: "top-right",
        });
      }
    } else {
      setFileError("Resume is required");
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6 pb-2">Apply for a Job</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            {...register("name")}
            className={`w-full px-3 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className={`w-full px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Position */}
        <div>
          <label className="block text-sm font-medium">Position</label>
          <input
            type="text"
            {...register("position")}
            className={`w-full px-3 py-2 border ${
              errors.position ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          />
          {errors.position && (
            <p className="text-red-500 text-xs">{errors.position.message}</p>
          )}
        </div>

        {/* Resume upload */}
        <DnDInput
          width="w-full"
          setNew={setImages}
          initialFile={null}
          id="bookCover"
          label="Upload Resume"
          acceptedTypes="pdf"
        />
        {fileError && <p className="text-red-500 text-xs">{fileError}</p>}

        {/* PDF Preview */}
        {images && (
          <div className="mt-4">
            <p className="text-sm mb-2">Preview of uploaded PDF:</p>
            <object
              data={URL.createObjectURL(images)}
              type="application/pdf"
              width="100%"
              height="400px"
            >
              <p>
                PDF preview not available.{" "}
                <a
                  href={URL.createObjectURL(images)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Download PDF
                </a>
              </p>
            </object>
          </div>
        )}

        {/* Cover Letter */}
        <div>
          <label className="block text-sm font-medium">Cover Letter</label>
          <textarea
            rows={4}
            {...register("coverLetter")}
            className={`w-full px-3 py-2 border ${
              errors.coverLetter ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          />
          {errors.coverLetter && (
            <p className="text-red-500 text-xs">{errors.coverLetter.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-full"
          >
            Cancel
          </button>
          <PrimaryButton
            onClick={() => {}}
            text="Apply Now"
            loading={isLoading}
          />
        </div>
      </form>
    </div>
  );
}
