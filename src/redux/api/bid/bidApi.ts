import baseApi from "../baseApi";

// Types
type Bid = {
  id: string;
  userId: string;
  projectId: string;
  amount: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
};

type Project = {
  id: string;
  userId: string;
  name: string;
  skills: string[];
  budget: string;
  priceType: string;
  deadline: string;
  goal: string;
  scopeOfWork: string;
  experienceLevel: string;
  status: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    profilePicture: string | null;
  };
};

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profilePicture: string | null;
};

type MyBid = Bid & {
  project: Project;
};

type ProjectBid = Bid & {
  bidUser: User;
};

type CreateBidRequest = {
  projectId: string;
  amount: number;
};

type CreateBidResponse = {
  success: boolean;
  message: string;
  data: Bid;
};

type MyBidsResponse = {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: MyBid[];
};

type ProjectBidsResponse = {
  success: boolean;
  message: string;
  data: ProjectBid[];
};

type DeleteBidResponse = {
  success: boolean;
  message: string;
};

const bidApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBid: builder.mutation<CreateBidResponse, CreateBidRequest>({
      query: (body) => ({
        url: "/bids",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Bid", "Project"],
    }),
    getMyBids: builder.query<MyBidsResponse, void>({
      query: () => "/bids/my-bids",
      providesTags: ["Bid"],
    }),
    getProjectBids: builder.query<ProjectBidsResponse, string>({
      query: (projectId) => `/bids/${projectId}`,
      providesTags: ["Bid"],
    }),
    withdrawBid: builder.mutation<DeleteBidResponse, string>({
      query: (id) => ({
        url: `/bids/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bid"],
    }),
  }),
});

export const {
  useCreateBidMutation,
  useGetMyBidsQuery,
  useGetProjectBidsQuery,
  useWithdrawBidMutation,
} = bidApi;
