"use client";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import SectionTitle from "./shared/sectionTitle/SectionTitle";
import { motion } from "framer-motion";
interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "What is Healixity?",
    answer:
      "Healixity is a 3-sided marketplace for healthcare work and collaboration where employers can post jobs, professionals can offer gigs or services, and professionals can collaborate with peers.",
  },
  {
    question: "Who can use Healixity?",
    answer:
      "All licensed or aspiring health professionals, including doctors, allied health workers, students, residents, and trainees, as well as healthcare employers like hospitals, clinics, agencies, and recruiters.",
  },
  {
    question: "How does Healixity work?",
    answer:
      "Employers can add jobs for professionals to apply to, professionals can post gigs or services for employers to hire, and professionals can offer services to peers. All communication, agreements, and payments happen securely on-platform.",
  },
  {
    question: "How do I create a profile?",
    answer:
      "Sign up and complete your profile with your education, skills, and services you offer.",
  },
  {
    question: "Can I post services for employers and peers?",
    answer:
      "Yes. You can post listings for tutoring, consulting, collaborative projects, and more.",
  },
  {
    question: "How do I apply for clinical work?",
    answer:
      "Browse job listings, review details, and apply directly through Healixity.",
  },
  {
    question: "How do I hire another professional?",
    answer:
      "Browse gig listings, view profiles, and book services directly through the platform.",
  },
  {
    question: "How do I get paid?",
    answer:
      "Payments are processed via Stripe and sent to your linked bank account after work is approved.",
  },
  {
    question: "When do I get paid?",
    answer:
      "Funds are released within a few business days after the work is marked complete and approved.",
  },
  {
    question: "Are there platform fees?",
    answer:
      "Yes. A service fee is deducted from each completed transaction as per the Terms & Conditions.",
  },
  {
    question: "Can I message outside Healixity?",
    answer:
      "No. All messaging is kept on-platform for security, tracking, and dispute resolution.",
  },
  {
    question: "What types of jobs can employers add?",
    answer:
      "Both clinical and nonclinical work requiring licensed or aspiring health professionals.",
  },
  {
    question: "How do employers add work?",
    answer:
      "Create an account, select “Add Jobs,” fill in role details, and publish the listing.",
  },
  {
    question: "What is the payment model for job postings?",
    answer:
      "Employers follow a pay-per-click model for job posts, as outlined in the Terms & Conditions.",
  },
  {
    question: "Can employers hire professionals for posted gigs?",
    answer:
      "Yes. Employers can hire professionals directly from their gig listings.",
  },
  {
    question: "How do employers pay professionals?",
    answer:
      "All payments go through Stripe and are released after work completion and approval.",
  },
  {
    question: "Are there employer fees?",
    answer:
      "Yes. A service fee is deducted from completed transactions as per the Terms & Conditions.",
  },
  {
    question: "Is payment data secure?",
    answer:
      "Yes. All transactions use Stripe, a PCI-compliant payment processor.",
  },
  {
    question: "What if there’s a dispute?",
    answer:
      "Healixity reviews agreements, communication, and work records to resolve disputes fairly.",
  },
  {
    question: "What happens if a job, gig, or booking is canceled?",
    answer:
      "Our cancellation policy protects both parties based on timing and work completed.",
  },
  {
    question: "What if I forget my password?",
    answer:
      "Click “Forgot Password” and follow the instructions sent to your email.",
  },
  {
    question: "Can I change my payment method?",
    answer:
      "Yes. You can update your payout or payment details anytime in account settings.",
  },
  {
    question: "What devices does Healixity work on?",
    answer:
      "Healixity works on all major browsers and is mobile-friendly for iOS and Android.",
  },
];

const FaqItem: React.FC<{
  item: FaqItem;
  isOpen: boolean;
  onClick: () => void;
}> = ({ item, isOpen, onClick }) => {
  return (
    <div
      className={`border-b px-4 rounded-md border-gray-200 last:border-0 ${
        isOpen ? "bg-gray-100" : ""
      }`}
    >
      <button
        className="w-full py-6 text-left flex justify-between items-center focus:outline-none"
        onClick={onClick}
      >
        <span className="md:text-xl text-lg lg:text-2xl font-medium text-gray-900">
          {item.question}
        </span>
        <span className="ml-6 flex-shrink-0 transition-all duration-300">
          {isOpen ? (
            <div className="text-white bg-primary p-2 rounded-full">
              <Minus className={`w-6 h-6   ${isOpen ? "" : ""}`} />
            </div>
          ) : (
            <div>
              <Plus className={`w-6 h-6 text-primary ${isOpen ? "" : ""}`} />
            </div>
          )}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 pb-6 " : "max-h-0"
        }`}
      >
        <p className="text-gray-600 md:text-lg sm:text-base text-sm lg:text-xl">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number>(1); // Second item open by default

  return (
    <div className="container section-gap">
      <SectionTitle
        miniTitle="FAQs"
        title="Frequently Asked Questions"
        subtitle="Have questions? We've got answers! Find everything you need to know about using our platform."
      />

      <div className="bg-white rounded-xl shadow-sm">
        {faqData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }} // Start slightly below
            animate
            whileInView={{ opacity: 1 }} // Animate when in viewport
            viewport={{ once: true, amount: 0.2 }} // Trigger once when 20% visible
            transition={{ duration: 0.1 * (index + 1), ease: "easeIn" }}
          >
            <FaqItem
              item={item}
              isOpen={index === openIndex}
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
