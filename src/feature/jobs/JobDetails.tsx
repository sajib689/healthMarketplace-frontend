"use client";
import useAuthUser from "@/hooks/useGetMe";
import { SvgBags, SvgJobType, SvgLocations, SvgSalaryRange } from "@/lib/icons";
import {
  useGetJobByIdQuery,
  useGetRelatedJobsQuery
} from "@/redux/api/job/jobApi";
import { Button, Col, Row, Skeleton, Tag } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import RelatedJobs from "./RelatedJobs";

const JobDetails = () => {
  const path = usePathname();
  const jobId = path.split("/")[2];
  const { user } = useAuthUser();
  const { data: jobResponse, isLoading: isLoadingJob } =
    useGetJobByIdQuery(jobId);
  const router = useRouter()
  const { data: relatedJobsResponse, isLoading: relatedJobsLoading, error } = useGetRelatedJobsQuery({
    subCategorySlug: jobResponse?.data.jobCategorySlug || "",
    location: jobResponse?.data.location || "",
    jobType: jobResponse?.data.jobType || "",
  });
  // const [applyJob, { isLoading: isApplying }] = useApplyJobMutation();

  if (isLoadingJob) {
    return (
      <div className="container section-gap">
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );
  }

  if (!jobResponse?.data) {
    return (
      <div className="container section-gap">
        <Title level={3}>Job not found</Title>
      </div>
    );
  }

  const job = jobResponse.data;
  const companyInfo = job.user?.companyInfo;

  const jobInfo = [
    {
      id: 1,
      title: "Location",
      description: job.location,
      icon: <SvgLocations />,
    },
    {
      id: 2,
      title: "Job Type",
      description: job.jobType,
      icon: <SvgJobType />,
    },
    {
      id: 3,
      title: "Salary Range",
      description: job.salaryRange,
      icon: <SvgSalaryRange />,
    },
    {
      id: 4,
      title: "Experience Level",
      description: job.experienceLevel,
      icon: <SvgBags />,
    },
  ];

  const responsibilities = job.responsibilities
    ? job.responsibilities.split(". ").filter((item) => item.trim() !== "")
    : [];

  const reqQualifications = job.reqQualifications
    ? job.reqQualifications.split(". ").filter((item) => item.trim() !== "")
    : [];

  const handleApply = async () => {
    router.push(`/applyJob?id=${jobId}`)
  };

  console.log(relatedJobsResponse)

  return (
    <div className="container section-gap">
      <div
        style={{
          border: "none",
          backgroundColor: "transparent",
          padding: "0px",
        }}
      >
        <div className="rounded-lg bg-primary text-white p-12">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Image
              width={100}
              height={100}
              className="size-[100px] rounded-full object-cover"
              src={job.user?.profilePicture || "https://img.freepik.com/premium-vector/home-building-logo-design-modern-minimalist_1022051-108.jpg?ga=GA1.1.603131680.1747477038&semt=ais_items_boosted&w=740"}
              alt={job.jobPosition}
            />
            <div className="flex-1">
              <Title className="!m-0 !font-medium !text-white" level={3}>
                {job.jobPosition}
              </Title>
              <Paragraph className="mt-2 !text-white">
                {job.yourPosition}
              </Paragraph>
            </div>
            <Button
              type="primary"
              size="large"
              className="bg-white text-primary border-white hover:bg-gray-100 font-semibold px-8"
              onClick={handleApply}
              disabled={!user?.id}
            // loading={isApplying}
            >
              Apply Now
            </Button>
          </div>

          <Row className="pt-12" gutter={[26, 26]}>
            {jobInfo.map((item) => (
              <Col key={item.id} md={12} xs={24} lg={6}>
                <div className="flex items-center gap-2">
                  <div className="w-10 flex items-center justify-center h-10 border-2 p-2 rounded-full">
                    {item.icon}
                  </div>
                  <div>
                    <Paragraph className="!text-white !m-0">
                      {item.title}
                    </Paragraph>
                    <Title
                      className="!mx-0 !mt-1 !font-semibold !text-white"
                      level={5}
                    >
                      {item.description}
                    </Title>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        <div className="mt-6">
          <Title>About The Job</Title>
          <Paragraph className="!text-xl">
            {job.aboutTheJob || "No job description provided."}
          </Paragraph>
        </div>

        {responsibilities.length > 0 && (
          <div className="mt-12">
            <Title>Responsibilities</Title>
            <ul className="text-xl text-icon-color list-disc pl-6">
              {responsibilities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {reqQualifications.length > 0 && (
          <div className="mt-12">
            <Title>Required Qualifications</Title>
            <ul className="text-xl text-icon-color list-disc pl-6">
              {reqQualifications.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {job.reqSkills && job.reqSkills.length > 0 && (
          <div className="mt-12 border-b pb-4 border-gray-200">
            <Title>Skills</Title>
            <div className="flex gap-3 flex-wrap">
              {job.reqSkills.map((skill, idx) => (
                <Tag
                  key={idx}
                  className="!rounded-full px-3 !sm:px-4 !py-2 !bg-primary text-sm !sm:text-base !text-white"
                >
                  {skill}
                </Tag>
              ))}
            </div>
          </div>
        )}

        {(companyInfo || job.user) && (
          <div className="mt-12">
            <Title className="!font-medium" level={3}>
              About Company
            </Title>
            <div className="flex items-center gap-3">
              <Image
                width={50}
                height={50}
                className="border border-gray-200 p-2 rounded-lg !size-[50px]"
                alt={
                  companyInfo?.companyName || (job.user?.firstName as string)
                }
                src={job.user?.profilePicture || "https://img.freepik.com/premium-vector/home-building-logo-design-modern-minimalist_1022051-108.jpg?ga=GA1.1.603131680.1747477038&semt=ais_items_boosted&w=740"}
              />
              <div>
                <Title className="!m-0 !font-medium !text-gray-800" level={4}>
                  {companyInfo?.companyName ||
                    `${job.user?.firstName} ${job.user?.lastName}`}
                </Title>
              </div>
            </div>
            <Paragraph className="!text-xl mt-4">
              {companyInfo?.companyDetails ||
                "No company description provided."}
            </Paragraph>
          </div>
        )}
      </div>

      <div className="mt-12">
        <RelatedJobs jobs={relatedJobsResponse?.data || []} isLoadingJobs={relatedJobsLoading} error={error} />
      </div>
    </div>
  );
};

export default JobDetails;
