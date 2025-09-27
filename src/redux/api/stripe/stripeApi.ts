import baseApi from "../baseApi";

export const stripeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStripeOnboarding: builder.mutation({
      query: () => ({
        url: "/stripe-account/onboarding",
        method: "POST",
      }),
      //   transformResponse: (response: {
      //     success: boolean;
      //     message: string;
      //     data: {
      //       status: "new" | "incomplete";
      //       url: string;
      //     };
      //   }) => response,
    }),
    createStripeLoginLink: builder.mutation({
      query: () => ({
        url: "/stripe-account/create-login-link",
        method: "POST",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: {
          url: string;
        };
      }) => response,
    }),
    getStripeAccountStatus: builder.query({
      query: () => "/stripe-account/account-status",
      //   transformResponse: (response: {
      //     success: boolean;
      //     message: string;
      //     data: {
      //       status: string;
      //       link: string;
      //       due: string[];
      //     };
      //   }) => response,
    }),
  }),
});

export const {
  useCreateStripeOnboardingMutation,
  useCreateStripeLoginLinkMutation,
  useGetStripeAccountStatusQuery,
} = stripeApi;
