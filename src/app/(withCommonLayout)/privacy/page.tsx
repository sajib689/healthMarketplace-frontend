import Privacy from "@/components/privacy/Privacy";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy and Policies",
};

const page = () => {
  return <Privacy />;
};

export default page;
