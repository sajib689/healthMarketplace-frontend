import {
  EducationPayload,
  EducationResponse,
  ExperiencePayload,
  ExperienceResponse,
  ProfileResponse,
} from "@/interfaces/global";
import baseApi from "../baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: "/auth/get-me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateUser: builder.mutation<
      ProfileResponse,
      { role?: "company" | "user"; formData: FormData }
    >({
      query: ({ role, formData }) => ({
        url: `${
          role === "company" ? "/user/update-company" : "/user/update-user"
        } `,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    createEducation: builder.mutation<EducationResponse, EducationPayload>({
      query: (body) => ({
        url: "/education/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    updateEducation: builder.mutation<
      EducationResponse,
      { id: string; body: EducationPayload }
    >({
      query: ({ id, body }) => ({
        url: `/education/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    deleteEducation: builder.mutation<EducationResponse, string>({
      query: (id) => ({
        url: `/education/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    createExperience: builder.mutation<ExperienceResponse, ExperiencePayload>({
      query: (body) => ({
        url: "/experience/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    updateExperience: builder.mutation<
      ExperienceResponse,
      { id: string; body: ExperiencePayload }
    >({
      query: ({ id, body }) => ({
        url: `/experience/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    deleteExperience: builder.mutation<ExperienceResponse, string>({
      query: (id) => ({
        url: `/experience/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateUserMutation,
  useCreateEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = profileApi;
