import baseApi from "../baseApi";

// TypeScript Types
export interface Review {
  id: string;
  review: string;
  rating: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  isVisible: boolean;
  project: string;
  content: string;
  user: {
    id: string;
    name: string;
    imageURL: string;
  };
}

export interface ReviewAverage {
  _avg: {
    rating: number;
  };
}

export interface ReviewPayload {
  reviewedUserId: string
  projectId: string
  content: string;
  rating: number;
}

export interface ReviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  average: ReviewAverage;
  reviews: Review[];
  data: string;
}

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation<ReviewResponse, ReviewPayload>({
      query: (data) => ({
        url: "/review/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),
    getAllReviews: builder.query<ReviewResponse, void>({
      query: () => ({
        url: "/reviews",
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),
    getAllMyReviews: builder.query<ReviewResponse, void>({
      query: () => ({
        url: "/review/my-reviews",
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetAllReviewsQuery,
  useGetAllMyReviewsQuery,
} = reviewApi;
