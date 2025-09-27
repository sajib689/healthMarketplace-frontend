/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
  role: string; // Or use a union type like "INDIVIDUAL" | "ORGANIZATION" | etc. if you know all possible values
  slug: string;
  stripeAccountId: string | null;
  isOnline: boolean;
  lastSeen: string | null;
  isDeleted: boolean;
  emailVerified: boolean;
  userStatus: string; // Or use a union type like "ACTIVE" | "INACTIVE" | etc. if you know possible values
  createdAt: string; // or Date if you'll convert it
  updatedAt: string; // or Date if you'll convert it
  about: string | null;
  education: any[]; // Replace 'any' with a proper type if you know the structure
  experiences: any[]; // Replace 'any' with a proper type if you know the structure
  wallet: any | null; // Replace 'any' with a proper wallet export interface if known
}

type UserRole = "INDIVIDUAL" | "ORGANIZATION" | "ADMIN";
type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export interface Education {
  id?: string;
  institute: string;
  degree: string;
  startDate: string;
  endDate: string;
  descriptions: string;
}

export interface Experience {
  id?: string;
  companyName: string;
  position?: string;
  location: string;
  employmentType?: string;
  startDate: string;
  endDate: string | null;
  isCurrent?: boolean;
  descriptions: string;
  skillsUsed?: string[];
}

export interface AboutData {
  bio: string;
  skills: string[];
  resume: string | null;
}

export interface ProfileData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
  role: UserRole;
  isOnline?: boolean;
  isDeleted?: boolean;
  emailVerified?: boolean;
  userStatus: UserStatus;
  createdAt?: string;
  updatedAt?: string;
  about: AboutData | null;
  education: Education[];
  experiences: Experience[];
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: ProfileData;
}
export interface EducationResponse {
  success: boolean;
  message: string;
  data: Education;
}
export interface ExperienceResponse {
  success: boolean;
  message: string;
  data: Experience;
}

export interface UpdateUserPayload {
  bodyData: {
    about?: {
      bio: string;
      skills: string[];
    };
  };
  profilePicture?: File;
  resume?: File;
}

export interface EducationPayload {
  institute?: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  descriptions?: string;
}

export interface ExperiencePayload {
  companyName?: string;
  position?: string;
  location?: string;
  employmentType?: string;
  startDate?: string;
  endDate?: string | null;
  isCurrent?: boolean;
  descriptions?: string;
  skillsUsed?: string[];
}

export type bidUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
  about: {
    address: string | null;
    bio: string | null;
    skills: string[] | null;
  };
  companyInfo: string | null;
};
// Types for the project data
export interface Project {
  id: string;
  userId: string;
  name: string;
  category?: string;
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
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: string;
    about?: string | null;
    companyInfo?: string | null;
  };
  bid?: Array<{
    id: string;
    userId: string;
    projectId: string;
    amount: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    bidUser: bidUser;
  }>;
  isFavorite: boolean;
  isBid: boolean;
}

export interface ProjectResponse {
  success: boolean;
  message: string;
  data: Project;
}

export interface ProjectsResponse {
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Project[];
}

export type Delivery = {
  id: string;
  name: string;
  agreementId: string;
  message: string;
  fileUrl: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  agreement: Agreement;
  project: string;
};
export interface DeliveryResponse {
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Delivery[];
}

export interface AgreementWithProject extends Omit<Agreement, "project"> {
  project: {
    id: string;
    userId: string;
    name: string;
    category?: string;
    skills: string[];
    budget: string;
    priceType: string;
    deadline: string;
    goal: string;
    scopeOfWork: string;
    experienceLevel: string | null;
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
  freelancer: bidUser;
}

export interface DetailedDelivery {
  id: string;
  agreementId: string;
  message: string;
  fileUrl: string | null;
  status: string;
  cancelReason: string | null;
  createdAt: string;
  updatedAt: string;
  agreement: AgreementWithProject;
}

export interface SingleDeliveryResponse {
  success: boolean;
  message: string;
  data: DetailedDelivery;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errorMessages?: Array<{
    path: string;
    message: string;
  }>;
  err?: {
    name?: string;
    clientVersion?: string;
    statusCode?: number;
  };
  stack?: string;
}

export interface CreateProjectBody {
  name: string;
  skills: string[];
  budget: string;
  priceType: string;
  deadline: string;
  goal: string;
  scopeOfWork: string;
  category: string;
}

// Removed redundant UpdateProjectBody export interface; use Partial<CreateProjectBody> directly.

export interface PaginationParams {
  limit?: number;
  page?: number;
  searchTerm?: string;
  sort?: string;
  subCategorySlug?: string;
  jobCategorySlug?: string;
  category?: string;
  data?: any
}

type Applicant = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
  companyInfo: any | null; // You might want to replace 'any' with a more specific type
  createdAt?: string;
  updatedAt?: string;
};

export type JobApplication = {
  id: string;
  userId: string;
  jobId: string;
  createdAt: string;
  updatedAt: string;
  user: Applicant;
};

// Types for Job data
export type Job = {
  id: string;
  userId: string;
  jobPosition: string;
  yourPosition: string;
  location: string;
  jobType: string;
  jobCategorySlug: string;
  salaryRange: string;
  experienceLevel: string;
  aboutTheJob: string;
  responsibilities: string;
  reqQualifications: string;
  reqSkills: string[];
  companyName: string | null;
  aboutTheCompany: string | null;
  companyLogo: string | null;
  workScheduleBenefits: string | null;
  createdAt: string;
  updatedAt: string;
  totalApplicants?: number;
  isPaid: boolean;
  ApplyJob?: JobApplication[];
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string | null;
    companyInfo?: {
      id: string;
      userId: string;
      companyName: string;
      companyDetails: string;
      phoneNumber: string;
      address: string;
      establish: string | null;
      createdAt: string;
      updatedAt: string;
    };
  };
  isFavorite: boolean;
};

// Type for Job creation request
export type CreateJobRequest = {
  jobPosition: string;
  yourPosition: string;
  location: string;
  jobType: string;
  salaryRange: string;
  experienceLevel: string;
  aboutTheJob: string;
  responsibilities: string;
  reqQualifications: string;
  reqSkills: string[] | string;
};

// Type for Job update request
export type UpdateJobRequest = Partial<CreateJobRequest>;

// Type for API responses
export type JobResponse = {
  success: boolean;
  message: string;
  data: Job;
};

export type JobsListResponse = {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Job[];
};
export type JobsApplication = {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Job;
};

export type FavoriteItem = {
  id: string;
  userId: string;
  itemId: string;
  itemType: "JOB" | "PROJECT";
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    slug: string;
  };
  project?: Project; // Replace with your Project type
  job?: Job; // Replace with your Job type
};

export type FavoriteResponse = {
  success: boolean;
  message: string;
  data?: {
    id: string;
    userId: string;
    itemId: string;
    itemType: "JOB" | "PROJECT";
    createdAt: string;
    updatedAt: string;
  };
};

export type FavoritesListResponse = {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: FavoriteItem[];
};

export type AddFavoriteBody = {
  itemId: string;
  itemType: "JOB" | "PROJECT";
};

// Define types for the consultation data
export type Pricing = {
  duration: number;
  price: number;
};
export type Available = {
  id: string;
  consultationId: string;
  dayOfWeek: string;
  isAvailable: boolean;
  timeSlots: {
    startTime: string;
    endTime: string;
  }[];
};

export type Consultation = {
  id: string;
  userId: string;
  title: string;
  image: string | null;
  adviceOn: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
  pricing?: Pricing[];
  available?: Available[];
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    profilePicture: string | null;
    slug: string;
    about: {
      bio: string;
      skills: string[];
    };
    isOnline: boolean;
  };
};

export type CreateConsultationRequest = {
  title: string;
  adviceOn: string[];
  description: string;
  pricing: Pricing[];
  available: Available[];
  image?: File;
};

export type ConsultationResponse = {
  success: boolean;
  message: string;
  data: Consultation;
};

export type ConsultationsListResponse = {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Consultation[];
};

export interface Blog {
  id: string;
  userId: string;
  title: string;
  category: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  categoryId: string;
  categoryBlog: string;
}

// types.ts
export interface Agreement {
  id: string;
  name: string;
  title: string;
  avatar: string;
  scopeOfWork: string;
  deadline: string;
  description: string;
  priceType: string;
  priceMin: number;
  postedTime: string;
  priceMax: number;
  projectId: number;
  bidId: string;
  clientId: string;
  freelancerId: string;
  amount: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED" | "CANCELLED";
  paymentStatus: "PENDING" | "PAID" | "PARTIALLY_PAID" | "REFUNDED";
  createdAt: string;
  updatedAt: string;
  project?: Project;
  client?: User;
  freelancer?: User;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  category?: string;
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
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: string;
    about?: string | null;
    companyInfo?: string | null;
  };
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  profilePicture: string | null;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface AgreementResponse {
  success: boolean;
  message: string;
  data: Agreement[];
  meta?: Meta;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
  errorMessages: Array<{
    path: string;
    message: string;
  }>;
  err: {
    statusCode: number;
  };
  stack?: string;
}

export interface MakeAgreementPayload {
  bidId: string;
}

// types.ts
export interface Booking {
  id: string;
  userId: string;
  consultationId: string;
  hour: number;
  amount: number;
  payment: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  createdAt: string;
  updatedAt: string;
  user?: User;
  // consultation?: Consultation;
  map: string;
  session?: Session;
  booking: string;
  consultation: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      profilePicture: string;
      email: string;
    };
    title: string;
  };
}

export interface Session {
  id: string;
  consultantId: string;
  userId: string;
  zoomMeetingId: string | null;
  zoomJoinUrl: string | null;
  startTime: string;
  endTime: string;
  isReminder: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  profilePicture: string | null;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  data: Booking | Booking[] | { booking: Booking; session: Session };
  meta?: Meta;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
  errorMessages: Array<{
    path: string;
    message: string;
  }>;
  err: {
    statusCode: number;
  };
  stack?: string;
}

export interface CreateBookingPayload {
  consultationId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  durationInMinutes: number; // 30 or 60
}

export interface NotificationResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Notification[];
}

export interface Notification {
  id: string;
  userId: string;
  senderId: string | null;
  type: NotificationType;
  entityType: EntityType;
  entityId: string;
  metadata: NotificationMetadata;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  sender: Sender | null;
  entity: Entity | null;
}

export type NotificationType =
  | "BID_RECEIVED"
  | "BID_ACCEPTED"
  | "BID_REJECTED"
  | "PROJECT_DELIVERED"
  | "WITHDRAWAL_REQUESTED"
  | "WITHDRAWAL_APPROVED"
  | "WITHDRAWAL_REJECTED"
  | "AGREEMENT_REQUESTED"
  | "AGREEMENT_ACCEPTED"
  | "AGREEMENT_REJECTED"
  | "PAYMENT_RECEIVED"
  | "PAYMENT_SENT"
  | "NEW_MESSAGE"
  | "CONSULTATION_BOOKED"
  | "SESSION_REMINDER"
  | "REVIEW_RECEIVED"
  | "RATING_RECEIVED";

export type EntityType =
  | "BID"
  | "PROJECT"
  | "AGREEMENT"
  | "WITHDRAWAL"
  | "PAYMENT"
  | "CONSULTATION"
  | "SESSION"
  | "REVIEW"
  | "RATING";

export interface NotificationMetadata {
  projectId?: string;
  projectName?: string;
  content?: string;
  rating?: number;
  projectSlug?: string;
  bidAmount?: number;
  amount?: number;
  bookingId?: string | null;
  agreementId?: string | null;
  sessionId: string;
  startTime: string; // ISO date string
  joinUrl: string | null;
  minutesLeft: number;
}

interface Sender {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

interface Entity {
  id: string;
  // Common fields
  userId?: string;
  amount?: number;
  status?: string;
  createdAt: string;
  updatedAt: string;

  // BID specific
  projectId?: string;
  howManyTimes?: null;

  // WITHDRAWAL specific
  stripeTransferId?: string;
  adminNote?: string;

  // PAYMENT specific
  agreementId?: string | null;
  bookingId?: string | null;
  payerId?: string;
  receiverId?: string;
  platformFee?: number;
  netAmount?: number;
  payment?: string;
  stripePaymentId?: string;
  stripeChargeId?: string;

  // AGREEMENT specific
  bidId?: string;
  clientId?: string;
  freelancerId?: string;
  paymentStatus?: string;
  deliveryDeadline?: null;

  consultationId: string;
  zoomMeetingId: string | null;
  zoomJoinUrl: string | null;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  isReminder: boolean;
}
