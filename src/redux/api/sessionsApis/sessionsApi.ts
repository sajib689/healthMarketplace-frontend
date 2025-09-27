import { baseApi } from "@/redux/api/baseApi";

export interface SessionResponse {
  id: string | number | null | undefined;
  success: boolean;
  message: string;
  data: Session[];
}

export interface Session {
  id: string;
  consultationId: string;
  bookingId: string;
  zoomMeetingId: string | null;
  zoomJoinUrl: string | null;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  isReminder: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  booking: {
    id: number;
    user: User;
  };
  consultation: {
    user: User;
    title: string;
  };
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  email: string;
}

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSessions: builder.query<SessionResponse, {history: boolean}>({
      query: (history) => ({
        url: "/session",
        method: "GET",
        params: { history: history.history },
      }),
    }),
  }),
});

export const { useGetAllSessionsQuery } = bookingApi;
