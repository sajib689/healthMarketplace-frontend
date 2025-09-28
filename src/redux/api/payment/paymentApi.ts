import { baseApi } from "@/redux/api/baseApi";

// Define types
type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profilePicture: string | null;
};

type Project = {
  id: string;
  name: string;
  skills: string[];
  deadline: string;
  goal: string;
  scopeOfWork: string;
};

type Consultation = {
  id: string;
  title: string;
  adviceOn: string[];
  description: string;
};

type Agreement = {
  project: Project;
};

type Booking = {
  id: string;
  hour: number;
  amount: number;
  consultation: Consultation;
};

type Payment = {
  id: string;
  agreementId: string | null;
  bookingId: string | null;
  jobId?: string | null;
  payerId: string;
  receiverId: string;
  amount: number;
  fee: number; // Matches platformFee in API response
  netAmount: number;
  payment: string; // e.g., "COMPLETED"
  stripePaymentId: string;
  stripeChargeId: string | null;
  createdAt: string;
  updatedAt: string;
  payer?: User;
  receiver?: User;
  agreement?: Agreement | null;
  booking?: Booking | null;
};

type PaymentResponse = {
  success: boolean;
  message: string;
  data: {
    payment: Payment;
    clientSecret: string;
  };
};

type PaymentHistoryResponse = {
  success: boolean;
  message: string;
  data: {
    payments: Payment[];
    metaData: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
  };
};

type PaymentAgreementRequest = {
  agreementId: string;
};

type PaymentBookingRequest = {
  bookingId: string;
};

type JobPaymentRequest = {
  jobId: string;
};

type PaymentQueryParams = {
  limit?: number;
  page?: number;
};

// Subscription Plan types
type SubscriptionPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  currency: string;
  limitedJobPosts: number;
  stripeProductId: string;
  stripePriceId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type SubscriptionPlansResponse = {
  success: boolean;
  message: string;
  data: SubscriptionPlan[];
};

type SubscriptionCheckoutRequest = {
  planId: string;
};

type SubscriptionCheckoutResponse = {
  success: boolean;
  message: string;
  data: {
    url: {
      id: string;
      object: string;
      url: string;
      // Other Stripe checkout session properties can be added as needed
    };
  };
};

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentAgreement: builder.mutation<
      PaymentResponse,
      PaymentAgreementRequest
    >({
      query: (body) => ({
        url: "/payment/agreement",
        method: "POST",
        body,
      }),
    }),
    createPaymentBooking: builder.mutation<
      PaymentResponse,
      PaymentBookingRequest
    >({
      query: (body) => ({
        url: "/payment/booking",
        method: "POST",
        body,
      }),
    }),
    initiateJobPayment: builder.mutation<PaymentResponse, JobPaymentRequest>({
      query: (body) => ({
        url: "/job-payment/initiate",
        method: "POST",
        body,
      }),
    }),
    getReceiverPayments: builder.query<
      PaymentHistoryResponse,
      PaymentQueryParams
    >({
      query: ({ limit = 10, page = 1 }) => ({
        url: "/payment/receiver",
        method: "GET",
        params: { limit, page },
      }),
    }),
    getPayerPayments: builder.query<PaymentHistoryResponse, PaymentQueryParams>(
      {
        query: ({ limit = 10, page = 1 }) => ({
          url: "/payment/payer",
          method: "GET",
          params: { limit, page },
        }),
      }
    ),
    createWithdrawalRequest: builder.mutation({
      query: (body) => ({
        url: "/withdrawal/request",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Bid"],
    }),

    // New subscription endpoints
    getSubscriptionPlans: builder.query<SubscriptionPlansResponse, void>({
      query: () => ({
        url: "/subscription-plan",
        method: "GET",
      }),
      providesTags: ["Subscription"],
    }),

    createSubscriptionCheckout: builder.mutation<
      SubscriptionCheckoutResponse,
      SubscriptionCheckoutRequest
    >({
      query: (body) => ({
        url: "/subscription-routes/checkout",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCreatePaymentAgreementMutation,
  useCreatePaymentBookingMutation,
  useInitiateJobPaymentMutation,
  useGetPayerPaymentsQuery,
  useGetReceiverPaymentsQuery,
  useCreateWithdrawalRequestMutation,
  // New subscription hooks
  useGetSubscriptionPlansQuery,
  useCreateSubscriptionCheckoutMutation,
} = bookingApi;