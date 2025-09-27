"use client";

import Loading from "@/components/others/Loading";
import PaymentValidation from "@/components/others/PaymentValidation";
import { useGetApplicantQuery } from "@/redux/api/job/jobApi";
import { useInitiateJobPaymentMutation } from "@/redux/api/payment/paymentApi";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import ApplicantTable from "./ApplicationTable";
import EmptyState from "@/components/others/EmptayState";

const GetAllApplicant = () => {
  const path = usePathname();
  const id = path.split("/")[2];
  const router = useRouter();
  const { data, isLoading } = useGetApplicantQuery(id);
  const [initiateJobPayment] = useInitiateJobPaymentMutation();

  const handleJobPayment = async (jobId: string) => {
    try {
      const response = await initiateJobPayment({ jobId }).unwrap();
      router.push(`/make-payment?clientSecret=${response.data.clientSecret}`);
    } catch (error) {
      console.error("Job payment failed:", error);

      throw error;
    }
  };

  if (isLoading) {
    return (
      <Loading
        title="Loading Job Data"
        message="Checking everything please wait"
      />
    );
  }

  console.log(data);
  return (
    <div className="container section-gap">
      <div className="rounded-lg bg-primary text-white p-12">
        <div className="flex items-center gap-4">
          <Image
            width={100}
            height={100}
            className="size-[100px] rounded-full object-cover"
            src={
              data?.data.companyLogo ||
              "https://img.freepik.com/premium-vector/home-building-logo-design-modern-minimalist_1022051-108.jpg?ga=GA1.1.603131680.1747477038&semt=ais_items_boosted&w=740"
            }
            alt={data?.data.companyName || ""}
          />
          <div className="flex-1">
            <Title className="!m-0 !font-medium !text-white" level={3}>
              {data?.data.jobPosition}
            </Title>
            <Paragraph className="mt-2 !text-white">
              {data?.data.yourPosition}
            </Paragraph>
          </div>
        </div>
      </div>

      {/* 👉 Extra Job Details Section */}
      <div className="mt-8 space-y-6">
        <div>
          <Title level={4}>About the Job</Title>
          <Paragraph>{data?.data.aboutTheJob}</Paragraph>
        </div>

        <div>
          <Title level={4}>Responsibilities</Title>
          <Paragraph>{data?.data.responsibilities}</Paragraph>
        </div>

        <div>
          <Title level={4}>Required Qualifications</Title>
          <Paragraph>{data?.data.reqQualifications}</Paragraph>
        </div>

        <div>
          <Title level={4}>Required Skills</Title>
          <ul className="list-disc list-inside">
            {data?.data.reqSkills?.map((skill: string, idx: number) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>

        <div>
          <Title level={4}>Salary Range</Title>
          <Paragraph>{data?.data.salaryRange}</Paragraph>
        </div>

        <div>
          <Title level={4}>Experience Level</Title>
          <Paragraph>{data?.data.experienceLevel}</Paragraph>
        </div>

        <div>
          <Title level={4}>Location</Title>
          <Paragraph>{data?.data.location}</Paragraph>
        </div>
      </div>

      {/* Keep your existing paid/unpaid logic */}
      {data?.data.isPaid ? (
        <div className="mt-4">
          {data?.data?.ApplyJob && (
            <ApplicantTable applicants={data.data.ApplyJob} />
          )}
        </div>
      ) : (
        data?.data.totalApplicants ?
          data?.data.totalApplicants >= 0 && (
            <div className="mt-8">
              <PaymentValidation
                error={{
                  success: false,
                  message:
                    "Please Complete Payment Process to see applicant data..!!",
                  applicant: data?.data.totalApplicants,
                  cost: 2000,
                  errorMessages: [
                    {
                      path: "",
                      message:
                        "Please Complete Payment Process to see applicant data..!!",
                    },
                  ],
                  err: {
                    statusCode: 400,
                  },
                  stack:
                    "Error: Please Complete Payment Process..!!\n    at C:\\Users\\tajis\\Projects\\sbateh-backend\\src\\app\\modules\\Job\\Job.service.ts:154:11\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\tajis\\Projects\\sbateh-backend\\src\\app\\modules\\Job\\Job.service.ts:5:58)",
                }}
                handleJobPayment={() => handleJobPayment(data?.data.id)}
              />
            </div>
          ) : <div>
            <p className="text-xl font-bold">Applicants</p>
            <EmptyState title="No one is Applied yet" description="Applicants will appear here once they apply for this position.
" />
          </div>
      )}
    </div>

  );
};

export default GetAllApplicant;
