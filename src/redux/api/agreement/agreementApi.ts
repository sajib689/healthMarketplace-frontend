// agreementApi.ts
import { AgreementResponse, MakeAgreementPayload } from "@/interfaces/global";
import baseApi from "../baseApi";

const agreementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    makeAgreement: builder.mutation<AgreementResponse, MakeAgreementPayload>({
      query: (body) => ({
        url: "/agreement/make",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Aggrements", "Bid", "Project"],
    }),
    getAgreements: builder.query<AgreementResponse, void>({
      query: () => "/agreement",
      providesTags: ["Aggrements"],
    }),
    getAgreementRequests: builder.query<AgreementResponse, void>({
      query: () => "/agreement/agreement-request",
      providesTags: ["Aggrements"],
    }),
    getMyAgreements: builder.query<AgreementResponse, void>({
      query: () => "/agreement/my-agreements",
      providesTags: ["Aggrements"],
    }),
    getMyPendingProject: builder.query<AgreementResponse, void>({
      query: () => "/agreement/pending-projects",
      providesTags: ["Aggrements", "Project", "Bid"],
    }),
    updateAgreementStatus: builder.mutation<
      AgreementResponse,
      { id: string; status: "ACCEPTED" | "REJECTED" }
    >({
      query: ({ id, status }) => ({
        url: `/agreement/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Aggrements", "Project", "Bid"],
    }),
  }),
});

export const {
  useMakeAgreementMutation,
  useGetAgreementsQuery,
  useGetAgreementRequestsQuery,
  useGetMyAgreementsQuery,
  useUpdateAgreementStatusMutation,
  useGetMyPendingProjectQuery
} = agreementApi;
