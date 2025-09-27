/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "../baseApi";

// Types for the suggestion response
export interface Suggestion {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface SuggestionsResponse {
  success: boolean;
  message: string;
  meta: Meta;
  data: Suggestion[];
}

// Types for search home (if you need them)
export interface SearchHomeResponse {
  // Add the actual response structure for searchHome here
  // Example placeholder:
  success: boolean;
  message: string;
  data: any[]; // Replace with actual data structure
}

export const othersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchHome: builder.query<SearchHomeResponse, string>({
      query: (searchTerm) => `/search/home?searchTerm=${searchTerm}`,
    }),
    suggestions: builder.query<SuggestionsResponse, string>({
      query: (searchTerm) => `/suggestion?searchTerm=${searchTerm}`,
    }),
    notifications: builder.query({
      query: () => `/notification`,
    }),
  }),
});

export const { useSearchHomeQuery, useSuggestionsQuery, useNotificationsQuery } = othersApi;