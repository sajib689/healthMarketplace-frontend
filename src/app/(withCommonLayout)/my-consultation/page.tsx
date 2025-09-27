import SharedTabs from "@/components/tabsCompoenets/TabsComponents";
import BookedConsultation from "@/feature/consultation/BookedConsultation";
import ConsultationHistory from "@/feature/consultation/ConsultationHistory";
import MyConsultation from "@/feature/consultation/MyConsultation";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Consultation",
};

const TAB_ITEMS = [
  {
    value: "my-consultation",
    label: "My Consultations",
    component: <MyConsultation />,
  },
  {
    value: "history",
    label: "History",
    component: <ConsultationHistory />,
  },
  {
    value: "booking-schedule",
    label: "Booking Schedule",
    component: <BookedConsultation />,
  },
];

const page = () => {
  return (
    <div className="container section-gap">
      <SharedTabs tabItems={TAB_ITEMS} />
    </div>
  );
};

export default page;
