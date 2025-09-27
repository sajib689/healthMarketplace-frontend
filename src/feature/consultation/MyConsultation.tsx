/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import WithEmptyState from "@/components/others/AllState";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { Consultation } from "@/interfaces/global";
import {
  useDeleteConsultationMutation,
  useGetMyConsultationsQuery,
} from "@/redux/api/consultation/consultationApi";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import ConsultationBook from "./card/ConsultationBook";
import { getDayName } from "@/lib/getDay";
import { toast } from "sonner";

const MyConsultation = () => {
  const router = useRouter();
  const {
    data: myConsultation,
    isLoading,
    error,
  } = useGetMyConsultationsQuery();

  const [deleteConsultation] = useDeleteConsultationMutation();
  const today = new Date();
  const day = today.getDay();

  const handleDeleteProject = async (id: string) => {
    try {
      const res = await deleteConsultation(id);
      if (res.data?.success) {
        toast.success("consultation deleted successfully:");
      } else {
        toast.error("Failed to delete consultation:");
      }
    } catch (err) {
      console.error("Failed to delete consultation:", err);
      toast.error("Failed to delete consultation. Please try again later.");
    }
  };

  return (
    <div>
      <div className="w-fit ml-auto mb-4">
        <PrimaryButton onClick={() => router.push("/add-consultation")}>
          <div className="flex items-center gap-1 p-1">
            <Plus />
            <span>Add Consultation</span>
          </div>
        </PrimaryButton>
      </div>

      <WithEmptyState
        data={myConsultation?.data || []}
        emptyStateProps={{
          title: "No Consultations found",
          description: "No Consultations found.",
        }}
        action={
          <PrimaryButton
            onClick={() => {}}
            // onClick={() => refreshProjects()}
          >
            Refresh Projects
          </PrimaryButton>
        }
        loading={isLoading}
        error={error as any}
        spinnerSize="lg"
        errorMessage=" Failed to fetch Consultation. Please try again later."
        errorTitle="Error Fetching Consultation"
        loadingMessage="Fetching latest Consultation..."
        loadingTitle=" Loading Consultation"
      >
        {(data: Consultation[]) => (
          <div className="">
            {data.map((consultation: Consultation, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.1 * (index + 1), ease: "easeIn" }}
              >
                <ConsultationBook
                  history={true}
                  image={consultation.image || null}
                  key={index}
                  title={consultation.title}
                  fee={(consultation.pricing || []).map((p) => ({
                    ...p,
                    duration: String(p.duration),
                  }))}
                  services={consultation.adviceOn}
                  timeSlots={consultation.available || []}
                  today={getDayName(day)}
                  handleDelete={() => handleDeleteProject(consultation.id)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </WithEmptyState>
    </div>
  );
};

export default MyConsultation;
