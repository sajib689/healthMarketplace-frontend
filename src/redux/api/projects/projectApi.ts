import {
  CreateProjectBody,
  PaginationParams,
  ProjectResponse,
  ProjectsResponse,
} from "@/interfaces/global";
import baseApi from "../baseApi";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation<ProjectResponse, CreateProjectBody>({
      query: (data) => ({
        url: "/project/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),
    updateProject: builder.mutation<
      ProjectResponse,
      { id: string; data: Partial<CreateProjectBody> }
    >({
      query: ({ id, data }) => ({
        url: `/project/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),
    getMyProjects: builder.query<ProjectsResponse, void>({
      query: () => "/project/my-projects",
      providesTags: ["Project"],
    }),
    getAllProjects: builder.query<ProjectsResponse, PaginationParams>({
      query: ({ limit, page, searchTerm, category  }) => ({
        url: "/project",
        params: { limit, page, searchTerm, category  },
      }),
      providesTags: ["Project"],
    }),
    getProjectBySlug: builder.query<ProjectResponse, string>({
      query: (slug) => `/project/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Project", slug }],
    }),
    deleteProject: builder.mutation<ProjectResponse, string>({
      query: (id) => ({
        url: `/project/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useGetMyProjectsQuery,
  useGetAllProjectsQuery,
  // call it
  useGetProjectBySlugQuery,
  useDeleteProjectMutation,
} = projectApi;
