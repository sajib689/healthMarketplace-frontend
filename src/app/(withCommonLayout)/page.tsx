import Banner from "@/components/Banner";
import JobCategories from "@/components/Categories";
import WorkProcess from "@/components/WorkProcess";
import RecentJobs from "@/feature/jobs/RecentJobs";
import RecentProjects from "@/feature/projects/RecentProjects";

const page = () => {
  return (
    <div>
      <Banner />
      {/* <Demo /> */}
      <WorkProcess />
      <JobCategories />
      <RecentProjects />
      <RecentJobs />

      {/* <Testimonials /> */}
      {/* <HomeBlogsSlider /> */}
      {/* <Faq /> */}
    </div>
  );
};

export default page;
