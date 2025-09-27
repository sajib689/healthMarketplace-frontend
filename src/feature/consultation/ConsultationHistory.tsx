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

const ConsultationHistory = () => {
  const { data: sessions, isLoading, isError } = useGetAllSessionsQuery({ history: true });

  console.log("session data", sessions);

  if (isLoading)
    return (
      <div>
        <Loading
          title="Loading consultation history ..."
          message="Please wait while we fetch your consultation history."
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
      {Array.isArray(sessions.data) ? (
        sessions.data.map((session: Session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0 }}
            animate
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.1 * (index + 1), ease: "easeIn" }}
          >
            <ConsultationBook
              history={true}
              title={session.consultation?.title || "Untitled Session"}
              fee={[]} // Placeholder; adjust if fee is available in backend
              services={["Session with Consultant"]} // Placeholder; adjust if services are available
              image={session.consultation?.user?.profilePicture || ""}
            />
          </motion.div>
        ))
      ) : sessions.data &&
        typeof sessions.data === "object" &&
        "consultation" in sessions.data ? (
        <motion.div
          key={sessions.id}
          initial={{ opacity: 0 }}
          animate
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.1, ease: "easeIn" }}
        >
          <ConsultationBook
            history={true}
            title={
              // Type assertion to help TypeScript understand the structure
              (
                sessions.data as {
                  consultation?: {
                    title?: string;
                    user?: { profilePicture?: string };
                  };
                }
              ).consultation?.title || "Untitled Session"
            }
            fee={[]} // Placeholder; adjust if fee is available in backend
            services={["Session with Consultant"]} // Placeholder; adjust if services are available
            image={
              (
                sessions.data as {
                  consultation?: { user?: { profilePicture?: string } };
                }
              ).consultation?.user?.profilePicture || ""
            }
          />
        </motion.div>
      ) : null}
    </div>
  );
};

export default ConsultationHistory;
