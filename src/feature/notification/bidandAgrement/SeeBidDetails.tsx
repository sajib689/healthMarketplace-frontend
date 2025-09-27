"use client";
import PayCard from "@/components/payCard/PayCard";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ModalTransition } from "../../../components/modal/ModalTransition";
import { SeeBid } from "./SeeBid";
import { SeeProfile } from "./SeeProfile";
import { AgreementStatus } from "./AgreementStatus";
import { Notification } from "@/interfaces/global";

const post = {
  id: "112",
  name: "Dr. Olivia Adams",
  avatar: "https://randomuser.me/api/portraits/women/30.jpg",
  title: "Medical Researcher Needed",
  postedTime: "2 days ago",
  tags: [
    { name: "Medical Research" },
    { name: "Clinical Trials" },
    { name: "Data Analysis" },
  ],
  priceMin: 100,
  priceMax: 150,
  priceType: "Fixed-price",
  deadline: "10/05/2025",
  description:
    "Seeking a researcher to analyze clinical trial data for a pharmaceutical study. The ideal candidate should have experience in statistical analysis, medical research, and report writing. Responsibilities include data interpretation, compiling reports, and ensuring accuracy of findings. Knowledge of FDA guidelines is a plus.",
  scopeOfWork:
    "Analyze clinical trial data, interpret results, compile comprehensive reports, and ensure compliance with regulatory standards.",
  location: "New York, USA",
  availability: true,
  hourlyRate: 120,
  rating: 4.8,
};

const doctor = {
  name: "Dr. John Smith",
  title: "Cardiologist & Heart Specialist",
  location: "New York, USA",
  availability: true,
  hourlyRate: "20",
  rating: 4.9,
  maxRating: 5.0,
  skills: ["Cardiology", "Heart Surgery", "Patient Care"],
  description:
    "Dr. John Smith has over 15 years of experience specializing in heart diseases and cardiac surgery. He has successfully performed numerous life-saving procedures and is recognized for his expertise in heart disease management and prevention.",
  imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  bio: "Dr. John Smith is known for his compassionate approach to patient care and his extensive expertise in heart surgery. He takes pride in making complex medical information accessible to patients and their families.",
};

const SeeBidDetails = ({ data }: { data: Notification }) => {
  const [modalState, setModalState] = useState("bidModal");
  const router = useRouter();

  console.log(data);
  return (
    <div className="overflow-hidden">
      {modalState === "bidModal" && (
        <ModalTransition>
          <SeeBid
            className=""
            name={`${data.sender?.firstName} ${data.sender?.lastName}`}
            avatar={post.avatar}
            title={data.metadata.projectName || ""}
            postedTime={post.postedTime}
            tags={post.tags}
            priceMin={post.priceMin}
            priceMax={post.priceMax}
            priceType={post.priceType}
            deadline={post.deadline}
            description={post.description}
            scopeWork={post.scopeOfWork as string}
            onAggrement={() => setModalState("agreement")}
            availability
            hourlyRate={post.hourlyRate}
            location={post.location}
            rating={post.rating}
            id={post.id}
          />
        </ModalTransition>
      )}
      {modalState === "agreement" && (
        <ModalTransition>
          <SeeProfile
            bio={doctor.bio}
            name={doctor.name}
            title={doctor.title}
            location={doctor.location}
            availability={doctor.availability}
            hourlyRate={doctor.hourlyRate}
            rating={doctor.rating}
            skills={doctor.skills}
            description={doctor.description}
            imageUrl={doctor.imageUrl}
            onMessage={() => router.push(`/messaging?${doctor.name}`)}
            onVisitProfile={() => setModalState(`payNow`)}
          />
        </ModalTransition>
      )}
      {modalState === "payNow" && (
        <ModalTransition>
          <PayCard
            nextPhase={() => setModalState("agreementComplete")}
            title="Your Agreement Request Accepted "
            subTitle="Pay Your Project Balance Now"
            amount={1000}
            button={"Pay Now"}
          />
        </ModalTransition>
      )}
      {modalState === "agreementComplete" && (
        <ModalTransition>
          <AgreementStatus
            className=""
            name={post.name}
            avatar={post.avatar}
            title={post.title}
            postedTime={post.postedTime}
            tags={post.tags}
            priceMin={post.priceMin}
            priceMax={post.priceMax}
            priceType={post.priceType}
            deadline={post.deadline}
            description={post.description}
            scopeWork={post.scopeOfWork as string}
            onAggrement={() => setModalState("bidModal")}
            availability
            hourlyRate={post.hourlyRate}
            location={post.location}
            rating={post.rating}
            id={post.id}
          />
        </ModalTransition>
      )}
    </div>
  );
};

export default SeeBidDetails;
