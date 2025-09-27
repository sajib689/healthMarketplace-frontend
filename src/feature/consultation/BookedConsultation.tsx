"use client";
import React from "react";
import ConsultationBook from "./card/ConsultationBook";
import { motion } from "framer-motion";
import {
  Session,
  useGetAllSessionsQuery,
} from "@/redux/api/sessionsApis/sessionsApi";
import Loading from "@/components/others/Loading";
import ErrorState from "@/components/others/ErrorState";
import EmptyState from "@/components/others/EmptayState";

const BookedConsultation = () => {
  const { data: sessions, isLoading, isError } = useGetAllSessionsQuery({ history: false });

  console.log("booked schedule data", sessions);

  if (isLoading)
    return (
      <div>
        <Loading
          title="Loading consultation Booking history..."
          message="Please wait while we fetch your consultation Booking history."
        ></Loading>
      </div>
    );
  if (isError || !sessions?.success)
    return (
      <div>
        <ErrorState></ErrorState>
      </div>
    );

  if (!sessions?.data || sessions.data.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <EmptyState />
      </div>
    );
  }
  return (
    <div>
      {(Array.isArray(sessions.data) ? sessions.data : [sessions.data]).map(
        (session: Session, index: number) => (
          <motion.div
            key={
              "id" in session
                ? session.id
                : (session as Session).booking?.id || index
            }
            initial={{ opacity: 0 }}
            animate
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.1 * (index + 1), ease: "easeIn" }}
          >
            <ConsultationBook
              booking={true}
              history={false}
              title={session.consultation.title || "Untitled Session"}
              fee={[]} // Placeholder; adjust if fee is available
              services={["Session with Consultant"]} // Placeholder; adjust if services are available
              image={session.consultation.user.profilePicture || ""}
              sessionData={session} // Pass session data for validation
            />
          </motion.div>
        )
      )}
    </div>
  );
};

export default BookedConsultation;
