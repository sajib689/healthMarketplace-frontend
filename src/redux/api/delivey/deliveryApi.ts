/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DeliveryResponse,
  PaginationParams,
  SingleDeliveryResponse,
} from "@/interfaces/global";
import baseApi from "@/redux/api/baseApi";

export const deliveryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDeliverySubmitted: builder.query<DeliveryResponse, PaginationParams>({
      query: ({ limit, page }) => ({
        url: "/delivery/freelancer",
        params: { limit, page },
      }),
      providesTags: ["Delivery"],
    }),

    getAllCancelledDelivery: builder.query({
      query: () => {
        return {
          url: "/delivery?status=CANCEL_APPROVED",
          method: "GET",
        };
      },
      providesTags: ["Delivery"],
    }),

    createDelivery: builder.mutation({
      query: ({ agreementId, message, file }) => {
        const formData = new FormData();
        if (message) {
          formData.append("message", message);
        }
        if (file) {
          formData.append("file", file);
        }

        return {
          url: `/delivery/${agreementId}`,
          method: "POST",
          body: formData,
          // No content-type header needed - browser will set it automatically with boundary
        };
      },
      invalidatesTags: ["Delivery", "Project"], // This will refetch deliveries after creation
    }),
    getSingleDelivery: builder.query<SingleDeliveryResponse, string>({
      query: (id) => {
        return {
          url: `/delivery/project/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Delivery"],
    }),
   cancelDelivery: builder.mutation<
  SingleDeliveryResponse,               
  { id: string; body: Record<string, any> } 
>({
  query: ({ id, body }) => ({
    url: `/delivery/status/${id}`,
    method: "PUT",
    body,
  }),
  invalidatesTags: ["Delivery", "Project"],
}),


  }),
});

export const {
  useGetAllDeliverySubmittedQuery,
  useGetAllCancelledDeliveryQuery,
  useCreateDeliveryMutation,
  useGetSingleDeliveryQuery,
    useCancelDeliveryMutation,
} = deliveryApi;
