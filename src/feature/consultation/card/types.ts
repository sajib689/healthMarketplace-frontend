import { Pricing } from "@/interfaces/global";

type ConsultationProps = {
  name: string;
  title: string;
  availability: boolean;
  hourlyRate: Pricing[];
  rating: number;
  skills: string[];
  description: string;
  imageUrl: string | null;
  bio: string;
};

export type ConsultationCardProps = ConsultationProps & {
  onMessage: () => void;
  onVisitProfile: () => void;
};
