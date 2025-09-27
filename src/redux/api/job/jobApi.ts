import {
  CreateJobRequest,
  JobResponse,
  JobsApplication,
  JobsListResponse,
  PaginationParams,
  UpdateJobRequest,
} from "@/interfaces/global";
import baseApi from "../baseApi";

// Add these interfaces for category responses
export interface SubCategory {
  id: string;
  parentId: string | null;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  children: SubCategory[];
}

interface CategoriesResponse {
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Category[];
}
interface SingleCategoriesResponse {
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: [Category];
}

interface SubCategoriesResponse {
  success: boolean;
  message: string;
  data: SubCategory[];
}
export interface RelatedJobsParams {
  subCategorySlug: string;
  location: string;
  jobType: string;
}

// Response data type
interface ApplyJobData {
  id: string;
  userId: string;
  jobId: string;
  createdAt: string;
  updatedAt: string;
}

// Response type
interface ApplyJobResponse {
  success: boolean;
  message: string;
  data: ApplyJobData;
}

// Error type (optional)
// interface ApplyJobError {
//   error: string;
//   details?: string;
// }

// // Application data type
// interface ApplicationData {
//   name: string;
//   email: string;
//   position: string;
//   coverLetter: string;
//   resume: File;
// }
export const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createJob: builder.mutation<JobResponse, CreateJobRequest>({
      query: (data) => ({
        url: "/jobs/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
    getJobs: builder.query<JobsListResponse, PaginationParams>({
      query: ({ data, category }) => ({
        url: "/jobs",
        method: "GET",
        params: { data, category },
      }),
      providesTags: ["Jobs"],
    }),
    getRelatedJobs: builder.query<
      JobsListResponse,
      RelatedJobsParams & PaginationParams
    >({
      query: (data) => ({
        url: "/jobs/related-job?",
        method: "GET",
        params: data,
      }),
      providesTags: ["Jobs"],
    }),
    getMyJobs: builder.query<JobsListResponse, void>({
      query: () => "/jobs/my-jobs",
      providesTags: ["Jobs"],
    }),
    getJobById: builder.query<JobResponse, string>({
      query: (id) => `/jobs/${id}`,
      providesTags: (result, error, id) => [{ type: "Jobs", id }],
    }),
    updateJob: builder.mutation<
      JobResponse,
      { id: string; data: UpdateJobRequest }
    >({
      query: ({ id, data }) => ({
        url: `/jobs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Jobs", id },
        { type: "Jobs" },
      ],
    }),
    deleteJob: builder.mutation<JobResponse, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),
    applyJob: builder.mutation<
      ApplyJobResponse,
      {
        jobId: string;
        name: string;
        email: string;
        position: string;
        coverLetter: string;
        resume: File;
      }
    >({
      query: ({ jobId, name, email, position, coverLetter, resume }) => {
        const formData = new FormData();
        const payload = {
          name: name,
          email: email,
          position: position,
          coverLetter: coverLetter,
        };
        formData.append("bodyData", JSON.stringify(payload));
        formData.append("resume", resume);

        return {
          url: `/apply-jobs/${jobId}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Jobs"],
    }),

    getApplicant: builder.query<JobsApplication, string>({
      query: (id) => `/jobs/appliciants/${id}`,
      providesTags: ["Jobs"],
    }),
    // Add category endpoints
    getCategories: builder.query<CategoriesResponse, PaginationParams>({
      query: (params) => ({
        url: "/category",
        method: "GET",
        params,
      }),
      providesTags: ["Categories"],
    }),
    getSubCategories: builder.query<SubCategoriesResponse, void>({
      query: () => `/category/sub-categories`,
      providesTags: ["Categories"],
    }),
    getSubCategoriesByCategory: builder.query<
      SingleCategoriesResponse,
      { id?: string }
    >({
      query: ({ id }) => `/category/${id}`,
      providesTags: ["Categories"],
    }),
    getMyAppliedJobs: builder.query<JobsListResponse, void>({
      query: () => "/apply-jobs/my-applications",
      providesTags: ["Jobs"],
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetJobsQuery,
  useGetMyJobsQuery,
  useGetJobByIdQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useApplyJobMutation,
  useGetApplicantQuery,
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useGetSubCategoriesByCategoryQuery,
  useGetMyAppliedJobsQuery,
  useGetRelatedJobsQuery,
} = jobApi;
