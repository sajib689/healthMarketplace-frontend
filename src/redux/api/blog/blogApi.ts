import { Blog } from "@/interfaces/global";
import baseApi from "../baseApi";

interface MetaData {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

interface BlogsResponse {
  success: boolean;
  message: string;
  meta: MetaData;
  data: Blog[];
}

interface BlogQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
}

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query<BlogsResponse, BlogQueryParams>({
      query: (params) => ({
        url: "/blogs",
        method: "GET",
        params: {
          page: params.page,
          limit: params.limit,
          searchTerm: params.searchTerm,
        },
      }),
    }),
    getBlogBySlug: builder.query<BlogsResponse, string>({
      query: (slug) => `/blogs/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Blogs", slug }],
    }),
  }),
});

export const { useGetAllBlogsQuery, useGetBlogBySlugQuery } = blogApi;
