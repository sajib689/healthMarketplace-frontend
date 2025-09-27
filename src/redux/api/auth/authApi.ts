// import baseApi from "../baseApi";

// type AuthSuccessResponse = {
//   success: boolean;
//   message: string;
// };
// type CompanyInfo = {
//   companyName: string;
//   companyDetails: string;
// };

// // User Registration Base Type (could be reused for other roles)
// type UserRegistrationBase = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   role: string;
// };

// // Company SignUp Request Type (extends base with specific company info)
// type CompanySignUpRequest = UserRegistrationBase & {
//   role: string;
//   companyInfo: CompanyInfo;
// };

// // Types for the response
// type ResetPasswordResponse = {
//   success: boolean;
//   message: string;
// };

// // Type for the mutation argument
// type ResetPasswordMutationArg = {
//   userId: string;
//   password: string;
//   token: string;
// };

// export const authApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     signIn: builder.mutation({
//       query: (body) => ({
//         url: "/auth/login",
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: ["User"],
//     }),
//     signUp: builder.mutation({
//       query: (body) => ({
//         url: "/user/register",
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: ["User"],
//     }),
//     companySignUp: builder.mutation<
//       AuthSuccessResponse, // Response type
//       CompanySignUpRequest // Request body type
//     >({
//       query: (body) => ({
//         url: "/user/register",
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: ["User"],
//     }),

//     verifyEmail: builder.mutation({
//       query: (body) => ({
//         url: "/auth/verify-otp",
//         method: "POST",
//         body,
//       }),
//     }),
//     resendCode: builder.mutation({
//       query: (body) => ({
//         url: "/auth/send-otp",
//         method: "POST",
//         body,
//       }),
//     }),
//     forgetPassword: builder.mutation({
//       query: (body) => ({
//         url: "/auth/forgot-password",
//         method: "POST",
//         body,
//       }),
//     }),

//     logout: builder.mutation({
//       query: () => ({
//         url: "/auth/logout",
//         method: "POST",
//       }),
//     }),
//     resetPassword: builder.mutation<
//       ResetPasswordResponse,
//       ResetPasswordMutationArg
//     >({
//       query: ({ userId, password, token }) => ({
//         url: `/auth/reset-password`,
//         method: "POST",
//         body: { userId, password },
//         headers: {
//           Authorization: `${token}`,
//         },
//       }),
//     }),
//   }),
// });

// export const {
//   useSignInMutation,
//   useSignUpMutation,
//   useCompanySignUpMutation,
//   useLogoutMutation,
//   useVerifyEmailMutation,
//   useResendCodeMutation,
//   useForgetPasswordMutation,
//   useResetPasswordMutation,
// } = authApi;

import baseApi from "../baseApi";

type AuthSuccessResponse = {
  success: boolean;
  message: string;
};

type CompanyInfo = {
  companyName: string;
  companyDetails: string;
};

// User Registration Base Type (could be reused for other roles)
type UserRegistrationBase = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

// Company SignUp Request Type (extends base with specific company info)
type CompanySignUpRequest = UserRegistrationBase & {
  role: string;
  companyInfo: CompanyInfo;
};

// Types for the response
type ResetPasswordResponse = {
  success: boolean;
  message: string;
};

// Type for the mutation argument
type ResetPasswordMutationArg = {
  userId: string;
  password: string;
  token: string;
};

// User Response Type (adjust based on actual API response)
type UserResponse = {
  success: boolean;
  message?: string;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    companyInfo?: CompanyInfo;
    // Add other fields as per your API response
  };
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    signUp: builder.mutation({
      query: (body) => ({
        url: "/user/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    companySignUp: builder.mutation<AuthSuccessResponse, CompanySignUpRequest>({
      query: (body) => ({
        url: "/user/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    verifyEmail: builder.mutation({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
    }),
    resendCode: builder.mutation({
      query: (body) => ({
        url: "/auth/send-otp",
        method: "POST",
        body,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordMutationArg
    >({
      query: ({ userId, password, token }) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: { userId, password },
        headers: {
          Authorization: `${token}`,
        },
      }),
    }),
    // New endpoint for fetching user by slug
    getUserBySlug: builder.query<UserResponse, string>({
      query: (slug) => ({
        url: `/user/${slug}`, // Matches http://localhost:3909/api/v1/user/:slug
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getSingleUserById: builder.query<UserResponse, string>({
      query: (id) => {
        return {
          url: `/user/single/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useCompanySignUpMutation,
  useLogoutMutation,
  useVerifyEmailMutation,
  useResendCodeMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  // Export the new hook
  useGetUserBySlugQuery,
  useGetSingleUserByIdQuery,
} = authApi;
