import SharedTabs from "@/components/tabsCompoenets/TabsComponents";
import FavoriteJobs from "@/feature/jobs/FavoriteJobs";
import FavoriteProjects from "@/feature/projects/FavoriteProjects";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorites",
};

const TAB_ITEMS = [
  {
    value: "project",
    label: "Projects",
    component: <FavoriteProjects />,
  },
  {
    value: "history",
    label: "Jobs",
    component: <FavoriteJobs />,
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
