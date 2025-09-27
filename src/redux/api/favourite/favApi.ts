import { AddFavoriteBody, FavoriteResponse, FavoritesListResponse } from "@/interfaces/global";
import baseApi from "../baseApi";



const favApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    toggleFavorite: builder.mutation<FavoriteResponse, AddFavoriteBody>({
      query: (body) => ({
        url: "/favorite/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Favorites", "Jobs", "Project"],
    }),

    getMyFavorites: builder.query<
      FavoritesListResponse,
      { itemType: "JOB" | "PROJECT"; page?: number; limit?: number }
    >({
      query: ({ itemType, page = 1, limit = 10 }) => ({
        url: `/favorite/my-favorites?itemType=${itemType}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Favorites"],
    }),
  }),
});

export const {
  useToggleFavoriteMutation,
  useGetMyFavoritesQuery,
  useLazyGetMyFavoritesQuery,
} = favApi;
