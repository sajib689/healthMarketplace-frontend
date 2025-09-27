// bookingApi.ts
import { BookingResponse, CreateBookingPayload } from "@/interfaces/global";
import baseApi from "../baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<BookingResponse, CreateBookingPayload>({
      query: (body) => ({
        url: "/booking/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Bookings", "Consultation"],
    }),
    getBookings: builder.query<BookingResponse, void>({
      query: () => "/booking",
      providesTags: ["Bookings"],
    }),
    getMyBookings: builder.query<BookingResponse, void>({
      query: () => "/booking/my-booking",
      providesTags: ["Bookings"],
    }),
    getConsultationBookings: builder.query<BookingResponse, void>({
      query: () => "/booking/consultation-booking",
      providesTags: ["Bookings"],
    }),
    getBookingById: builder.query<BookingResponse, string>({
      query: (id) => `/booking/${id}`,
      providesTags: (result, error, id) => [{ type: "Bookings", id }],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingsQuery,
  useGetMyBookingsQuery,
  useGetConsultationBookingsQuery,
  useGetBookingByIdQuery,
} = bookingApi;
