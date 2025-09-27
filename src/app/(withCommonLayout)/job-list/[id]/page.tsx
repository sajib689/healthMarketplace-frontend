import GetAllApplicant from "@/feature/jobs/GetAllApplicant";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Jobs Applicant Details",
};

const page = () => {
  return (
    <div>
      <GetAllApplicant />
    </div>
  );
};

export default page;
