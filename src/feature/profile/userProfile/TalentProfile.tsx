/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React from "react";
// import ProfileCard from "./card/ProfileCard";
// import SkillAndEarn from "./card/SkillnEarn";
// import ConsultationReviewCard from "@/feature/consultation/card/ConcultationReviewCard";
// import Education from "./card/Education";
// import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
// import { RiDriveFill } from "react-icons/ri";
// import ProfileConsultation from "@/feature/consultation/card/ProfileConsultation";
// import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";
// import { useGetUserBySlugQuery } from "@/redux/api/auth/authApi";

// const doctors = {
//   name: "Dr. John Smith",
//   title: "Cardiologist & Heart Specialist",
//   location: "New York, USA",
//   availability: true,
//   hourlyRate: "20",
//   rating: 4.9,
//   maxRating: 5.0,
//   skills: ["Cardiology", "Heart Surgery", "Patient Care"],
//   description:
//     "Dr. John Smith has over 15 years of experience specializing in heart diseases and cardiac surgery. He has successfully performed numerous life-saving procedures and is recognized for his expertise in heart disease management and prevention.",
//   imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
//   bio: "Dr. John Smith is known for his compassionate approach to patient care and his extensive expertise in heart surgery. He takes pride in making complex medical information accessible to patients and their families.",
// };
// const review = [
//   {
//     title: "I will do UX UI design for your mobile app design",
//     rating: 5.0,
//     started: "20/01/2025",
//     finished: "03/02/2025",
//     testimonial:
//       "He is very professional, great at meeting deadlines and excellent communication.",
//     response:
//       "Working with you was a fantastic experience! I truly appreciate your professionalism.",
//     price: 800,
//   },
//   {
//     title: "I will develop a full-stack web application",
//     rating: 4.8,
//     started: "10/02/2025",
//     finished: "25/02/2025",
//     testimonial:
//       "Delivered an outstanding project with clean code and great UI.",
//     response: "Thank you! It was a pleasure working on your project.",
//     price: 1200,
//   },
//   {
//     title: "I will create a custom eCommerce website",
//     rating: 5.0,
//     started: "05/03/2025",
//     finished: "20/03/2025",
//     testimonial: "The best developer I have worked with! Highly recommended.",
//     response: "Appreciate your kind words! Looking forward to future projects.",
//     price: 1500,
//   },
// ];

// const fakeEducationData = [
//   {
//     institution: "Harvard University",
//     degree: "Bachelor of Science in Computer Science",
//     startYear: "2015",
//     endYear: "2019",
//     description:
//       "Studied core concepts of programming, algorithms, and software development.",
//     imageSrc: "/images/harvard.png",
//   },
//   {
//     institution: "Stanford University",
//     degree: "Master of Science in AI & ML",
//     startYear: "2020",
//     endYear: "2022",
//     description:
//       "Focused on artificial intelligence, machine learning, and data science applications.",
//     imageSrc: "/images/stanford.png",
//   },
// ];

// const consultation = {
//   title: "General Health Checkup",
//   fee: 50,
//   nextConsultation: "3:00 PM",
//   services: ["Blood Pressure Check", "BMI Calculation", "Basic Consultation"],
//   timeSlots: ["10:00 AM - 11:00 AM", "2:00 PM - 3:00 PM"],
// };

// const TalentProfile = () => {
//   const path = usePathname();
//   const slug = path.split("/")[2];
//   //   const router = useRouter();

//   // Fetch blog data by slug
//   const { data: myData } = useGetUserBySlugQuery(slug);
//   console.log("doctor slug data :", myData);
//   console.log("doctor slug:", slug);

//   const handleBook = () => {
//     console.log("object");
//   };

//   return (
//     <div className="container space-y-6 mb-10">
//       <ProfileCard
//         availability={doctors.availability}
//         handleBook={handleBook}
//       />
//       <div className="grid lg:grid-cols-2 lg:gap-10 md:gap-7 gap-6">
//         <div className="space-y-6">
//           <SkillAndEarn earn skills={doctors.skills} />
//           <div>
//             <p className="md:text-2xl text-lg font-semibold mb-4">Education</p>
//             <div className="space-y-6">
//               {fakeEducationData.map((edu, index) => (
//                 <Education
//                   key={index}
//                   institution={edu.institution}
//                   degree={edu.degree}
//                   startYear={edu.startYear}
//                   endYear={edu.endYear}
//                   description={edu.description}
//                   imageSrc={edu.imageSrc}
//                 />
//               ))}
//             </div>
//           </div>
//           <div>
//             <p className="md:text-2xl text-lg font-semibold mb-4">
//               CV / Resume
//             </p>
//             <div className="w-fit">
//               <PrimaryButton onClick={() => {}}>
//                 <div className="flex items-center gap-2 w-fit">
//                   Download Resume <RiDriveFill />
//                 </div>
//               </PrimaryButton>
//             </div>
//           </div>
//         </div>
//         <div>
//           <ProfileConsultation
//             title={consultation.title}
//             fee={consultation.fee}
//             nextConsultation={consultation.nextConsultation}
//             services={consultation.services}
//           />
//           <p className="text-lg md:text-2xl font-semibold">Reviews</p>
//           {review.map((project, index) => (
//             <ConsultationReviewCard key={index} {...project} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TalentProfile;

"use client";
import ErrorState from "@/components/others/ErrorState";
import Loading from "@/components/others/Loading";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import ConsultationReviewCard from "@/feature/consultation/card/ConcultationReviewCard";
import ProfileConsultation from "@/feature/consultation/card/ProfileConsultation";
import { useGetUserBySlugQuery } from "@/redux/api/auth/authApi";
import { useGetConsultationByIdQuery } from "@/redux/api/consultation/consultationApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RiDriveFill } from "react-icons/ri";
import Education from "./card/Education";
import ProfileCard from "./card/ProfileCard";
import SkillAndEarn from "./card/SkillnEarn";
import UnauthorizedState from "@/components/others/UnAuthorized";
import { useCopyUrl } from "@/hooks/useCopyUrl";

// Define types locally with all fields optional to handle partial data
export type CompanyInfo = {
  companyName: string;
  companyDetails: string;
};

export interface About {
  id?: string;
  userId?: string;
  phoneNumber?: string | null;
  address?: string | null;
  dateOfBirth?: string | null;
  bio?: string | null;
  skills?: string[];
  resume?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Education {
  id?: string;
  userId?: string;
  institute?: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  descriptions?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Experience {
  id?: string;
  userId?: string;
  companyName?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  descriptions?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id?: string;
  userId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  slug?: string;
  profilePicture?: string | null;
  stripeAccountId?: string;
  isOnline?: boolean;
  lastSeen?: string | null;
  isDeleted?: boolean;
  emailVerified?: boolean;
  userStatus?: string;
  otp?: string | null;
  otpExpiresAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  about?: About;
  companyInfo?: CompanyInfo | null;
  education?: Education[];
  experiences?: Experience[];
  averageRating?: number;
  totalRatings?: number;
}

export type UserResponse = {
  success?: boolean;
  message?: string;
  data?: User;
};

const TalentProfile = () => {
  const path = usePathname();
  const slug = path.split("/")[2];
  const searchParams = useSearchParams();
  const consultationId = searchParams.get("con");
  const router = useRouter();
  console.log("searchparam :", consultationId);
  const copyUrl = useCopyUrl();
  const { data: singleConsultation } = useGetConsultationByIdQuery(
    consultationId!
  );

  console.log("Consultation ID:", consultationId);
  console.log("Consultation Data:", singleConsultation);

  // Fetch user data by slug
  const {
    data: myData,
    isLoading,
    error
  } = useGetUserBySlugQuery(slug, {
    skip: !slug,
  });

  console.log("doctor slug data:", myData); // Log full response
  console.log("user data:", myData?.data); // Log user object

  const user: User | undefined = myData?.data;

  const handleBook = (user: User) => {
    router.push(`/messaging?user=${user.id}`)
  };

  if (isLoading) {
    return (
      <Loading
        title="Loading Profile"
        message="Fetching user profile data..."
      />
    );
  }

  if (error || !user) {
    if (typeof error === "object" && error !== null && "status" in error && (error as any).status === 401) {
      return <UnauthorizedState />
    }
    return (
      <ErrorState
      />
    );
  }
  return (
    <div className="container space-y-6 mb-10">
      <ProfileCard
        copyUrl={copyUrl}
        availability={!!user.userStatus && user.userStatus === "ACTIVE"}
        handleBook={() => handleBook(user)}
        name={`${user.firstName || "Unknown"} ${user.lastName || "User"}`}
        title={user.role || "Talent"}
        location={user.experiences?.[0]?.location || "Location not specified"}
        hourlyRate={user.averageRating ? `${user.averageRating * 10}` : "N/A"}
        rating={user.averageRating || 0}
        maxRating={5.0}
        skills={user.about?.skills || []}
        description={user.about?.bio || "No bio available"}
        imageUrl={user.profilePicture || "https://via.placeholder.com/100"}
        bio={user.about?.bio || "No bio available"}
      />
      <div className="grid lg:grid-cols-2 lg:gap-10 md:gap-7 gap-6">
        <div className="space-y-6">
          <SkillAndEarn
            earn={!!user.averageRating}
            skills={user.about?.skills || []}
          />
          <div>
            <p className="md:text-2xl text-lg font-semibold mb-4">Education</p>
            <div className="space-y-6">
              {user.education && user.education.length > 0 ? (
                user.education.map((edu: Education, index: number) => (
                  <Education
                    key={index}
                    institution={edu.institute || "Unknown Institution"}
                    degree={edu.degree || "N/A"}
                    startYear={edu.startDate?.split("-")[0] || "N/A"}
                    endYear={edu.endDate?.split("-")[0] || "N/A"}
                    description={edu.descriptions || "No description"}
                    imageSrc="/images/default-edu.png"
                  />
                ))
              ) : (
                <p className="text-gray-500">No education listed</p>
              )}
            </div>
          </div>
          <div>
            <p className="md:text-2xl text-lg font-semibold mb-4">
              CV / Resume
            </p>
            <div className="w-fit">
              <PrimaryButton
                onClick={() => window.open(user.about?.resume || "", "_blank")}
              >
                <div className="flex items-center gap-2 w-fit">
                  Download Resume <RiDriveFill />
                </div>
              </PrimaryButton>
            </div>
          </div>
        </div>
        <div>
          <ProfileConsultation
            title={singleConsultation?.data?.title || ""}
            fee={singleConsultation?.data?.pricing || []}
            services={singleConsultation?.data?.adviceOn || []}
            id={singleConsultation?.data?.id as string}
          />

          <p className="text-lg md:text-2xl font-semibold">Reviews</p>
          {user.experiences && user.experiences.length > 0 ? (
            user.experiences.map((exp: Experience, index: number) => (
              <ConsultationReviewCard
                key={index}
                title={exp.companyName || "No Title"}
                rating={user.averageRating || 0}
                started={exp.startDate || "N/A"}
                finished={exp.endDate || "N/A"}
                testimonial={exp.descriptions || "No testimonial"}
                response="N/A"
                price={user.averageRating ? user.averageRating * 100 : 0}
              />
            ))
          ) : (
            <p className="text-gray-500">No reviews available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TalentProfile;
