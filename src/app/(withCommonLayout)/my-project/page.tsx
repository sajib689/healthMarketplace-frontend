import SharedTabs from "@/components/tabsCompoenets/TabsComponents";
import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Projects",
};

// Dynamic imports with loading states
const MyProjects = dynamic(() => import("@/feature/projects/MyProjects"), {
  loading: () => (
    <div className="flex justify-center p-4">Loading My Projects...</div>
  ),
});

const DeliveredProjects = dynamic(
  () => import("@/feature/projects/DelivaredProjects"),
  {
    loading: () => (
      <div className="flex justify-center p-4">
        Loading Delivered Projects...
      </div>
    ),
  }
);

const ProjectsReviews = dynamic(() => import("@/feature/projects/AllReviews"), {
  loading: () => (
    <div className="flex justify-center p-4">Loading Reviews...</div>
  ),
});

const AllPendingProjects = dynamic(
  () => import("@/feature/projects/AllPendingProjects"),
  {
    loading: () => (
      <div className="flex justify-center p-4">Loading Pending Projects...</div>
    ),
  }
);

const AgreementRequest = dynamic(
  () => import("@/feature/projects/AggrementRequest"),
  {
    loading: () => (
      <div className="flex justify-center p-4">
        Loading Agreement Requests...
      </div>
    ),
  }
);

const CancelProjects = dynamic(
  () => import("@/feature/projects/CancelProjects"),
  {
    loading: () => (
      <div className="flex justify-center p-4">Loading Cancel Requests...</div>
    ),
  }
);

const PendingAgreement = dynamic(
  () => import("@/feature/projects/PendingAgreement"),
  {
    loading: () => (
      <div className="flex justify-center p-4">
        Loading Pending Agreement...
      </div>
    ),
  }
);

const TAB_ITEMS = [
  {
    value: "my-project",
    label: "My Projects",
    component: <MyProjects />,
  },
  {
    value: "delivered-project",
    label: "Delivered Projects",
    component: <DeliveredProjects />,
  },
  {
    value: "reviews",
    label: "Project Reviews",
    component: <ProjectsReviews />,
  },
  {
    value: "pending-project",
    label: "Pending Projects",
    component: <AllPendingProjects />,
  },
  {
    value: "agreement-request",
    label: "Agreement Requests",
    component: <AgreementRequest />,
  },
  {
    value: "cancel-request",
    label: "Cancel Requests",
    component: <CancelProjects />,
  },
  {
    value: "pending-agreement",
    label: "Pending Agreements",
    component: <PendingAgreement />,
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
