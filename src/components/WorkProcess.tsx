"use client";
import React from "react";
import SectionTitle from "./shared/sectionTitle/SectionTitle";
import { motion } from "framer-motion";

const ProcessCard = ({
  title,
  steps,
}: {
  title: string;
  steps: Array<{ number: string; title: string; description: string }>;
}) => (
  <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
    <h2 className="text-xl md:text-2xl xl:text-3xl font-semibold mb-6">
      {title}
    </h2>
    <div className="relative">
      {/* Single continuous line for all steps - send to back */}
      {steps.length > 1 && (
        <div className="absolute left-4 lg:left-6 top-4 lg:top-6 bottom-16 border-l-2 border-dashed border-primary/80 z-0" />
      )}

      {steps.map((step, index) => (
        <div
          key={index}
          className="flex items-start gap-6 relative mb-8 last:mb-0"
        >
          {/* Step Number Container - bring to front */}
          <div className="relative z-10">
            <div className="w-8 lg:w-12 h-8 lg:h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium bg-white border-2 border-primary">
              {step.number}
            </div>
          </div>

          {/* Step Content */}
          <div className="flex-1 pt-1">
            <h3 className="font-medium mb-3 text-xl">{step.title}</h3>
            <p className="text-gray-600 text-[16px] leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

function WorkProcess() {
  const clientSteps = [
    {
      number: "01",
      title: "Create a Profile",
      description: "Showcase qualifications, skills & certifications.",
    },
    {
      number: "02",
      title: "Post a Job",
      description: "Describe your project and required skills.",
    },
    {
      number: "03",
      title: "Review Proposals",
      description: "Receive applications from qualified experts.",
    },
    {
      number: "04",
      title: "Hire & Collaborate",
      description: "Use messaging & video calls for discussions.",
    },
    {
      number: "05",
      title: "Secure Payment",
      description: "Funds held in escrow until job completion.",
    },
    {
      number: "06",
      title: "Approve & Rate",
      description: "Release payment & leave feedback.",
    },
  ];

  const talentSteps = [
    {
      number: "01",
      title: "Create a Profile",
      description: "Showcase qualifications, skills & certifications.",
    },
    {
      number: "02",
      title: "Find Jobs & Apply",
      description: "Browse listings and submit proposals.",
    },
    {
      number: "03",
      title: "Communicate & Work",
      description: "Use built-in messaging & virtual sessions.",
    },
    {
      number: "04",
      title: "Get Paid Securely",
      description: "Payment released upon project approval.",
    },
    {
      number: "05",
      title: "Build Reputation",
      description: "Earn ratings & reviews for future projects.",
    },
  ];

  const companySteps = [
    {
      number: "01",
      title: "Create a Profile",
      description: "Register your company and provide essential details.",
    },
    {
      number: "02",
      title: "Post Job Listings",
      description: "List job openings or freelance opportunities.",
    },
    {
      number: "03",
      title: "Connect with Experts",
      description: "Receive and evaluate proposals for posted jobs.",
    },
  ];

  return (
    <div className=" container section-gap">
      <SectionTitle
        miniTitle="Steps"
        subtitle="How Our Service Works for You"
        title="How it Works"
      />
      <div className="lg:mt-12 md:mt-8 mt-6">
        <motion.div
          initial={{ opacity: 0 }} // Start slightly below
          animate
          whileInView={{ opacity: 1 }} // Animate when in viewport
          viewport={{ once: true, amount: 0.2 }} // Trigger once when 20% visible
          transition={{ duration: 0.2, ease: "easeIn" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <motion.div
            initial={{ opacity: 0 }} // Start slightly below
            animate
            whileInView={{ opacity: 1 }} // Animate when in viewport
            viewport={{ once: true, amount: 0.2 }} // Trigger once when 20% visible
            transition={{ duration: 0.5, ease: "easeIn" }}
          >
            <ProcessCard title="For Clients (Hiring)" steps={clientSteps} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }} // Start slightly below
            animate
            whileInView={{ opacity: 1 }} // Animate when in viewport
            viewport={{ once: true, amount: 0.2 }} // Trigger once when 20% visible
            transition={{ duration: 0.7, ease: "easeIn" }}
          >
            <ProcessCard title="For Experts" steps={talentSteps} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }} // Start slightly below
            animate
            whileInView={{ opacity: 1 }} // Animate when in viewport
            viewport={{ once: true, amount: 0.2 }} // Trigger once when 20% visible
            transition={{ duration: 0.9, ease: "easeIn" }}
          >
            <ProcessCard title="For Companies" steps={companySteps} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default WorkProcess;
