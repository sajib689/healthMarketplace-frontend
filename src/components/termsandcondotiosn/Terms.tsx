import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">
        Healixity LLC Terms & Conditions
      </h1>
      <p className="mb-2">Effective Date: May 5th, 2025</p>
      <p className="mb-4">Last Updated: May 5th, 2025</p>

      <p className="mb-6">
        These Terms & Conditions (“Terms”) govern the access to and use of the
        Healixity platform (“Platform”) operated by Healixity LLC (“Company,”
        “we,” “our,” or “us”). By creating an account, accessing, or using the
        Platform, you (“User,” “you,” or “your”) agree to be bound by these
        Terms. If you do not agree, you must not use the Platform.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Definitions</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>Platform</strong> refers to Healixity, an online marketplace
          facilitating healthcare-related jobs, gigs, tutoring, consulting, and
          collaborative projects.
        </li>
        <li>
          <strong>Employer</strong> refers to individuals or entities posting
          healthcare roles.
        </li>
        <li>
          <strong>Health Professional</strong> refers to licensed practitioners,
          allied health professionals, students, residents, and trainees.
        </li>
        <li>
          <strong>Service Fee</strong> means the percentage retained by the
          Company per transaction.
        </li>
        <li>
          <strong>PPC Fee</strong> means the pay-per-click fee charged to
          Employers.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Eligibility</h2>
      <p className="mb-4">
        You must be at least eighteen (18) years old to use the Platform.
        Employers and Health Professionals must be in the healthcare sector.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Platform Use</h2>
      <p className="mb-4">
        Employers can post jobs, Health Professionals can apply for work, offer
        services, and collaborate. All communication must occur on the Platform.
        Off-platform communication for transactions is prohibited.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Fees and Payments</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          Employers agree to a pay-per-click fee of $0.25 per click on job
          postings.
        </li>
        <li>A 20% service fee applies to all completed transactions.</li>
        <li>
          Payments are processed through Stripe and require valid payment
          details.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        5. Healixity Cancellation Policy
      </h2>
      <p className="mb-4">
        The policy covers early/late cancellations, no-shows, refunds, disputes,
        and rescheduling. Refunds follow the outlined timeframes, and service
        fees may be non-refundable.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        6. User Responsibilities
      </h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          Employers must ensure postings are accurate, lawful, and within
          healthcare.
        </li>
        <li>
          Health Professionals must accurately represent their skills and
          complete work in good faith.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        7. Prohibited Conduct
      </h2>
      <p className="mb-4">
        Users may not circumvent fees, post unrelated opportunities, or engage
        in unlawful conduct.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        8. Privacy and Data Use
      </h2>
      <p className="mb-4">
        Data is handled per our Privacy Policy. The Platform is not for storing
        Protected Health Information (PHI) under HIPAA. No warranties are
        provided, and Healixity assumes no responsibility for user actions.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">9. Indemnification</h2>
      <p className="mb-4">
        You agree to defend, indemnify, and hold harmless Healixity LLC from
        claims and liabilities arising from your use of the Platform or
        violation of these Terms.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        10. Governing Law and Dispute Resolution
      </h2>
      <p className="mb-4">
        Governed by Florida law. Disputes will be resolved through binding
        arbitration in Florida under the American Arbitration Association rules.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">11. Amendments</h2>
      <p className="mb-4">
        Healixity may modify these Terms at any time. Continued use of the
        Platform means acceptance of the changes.
      </p>

      <p className="mt-6">
        By using Healixity, you acknowledge that you have read, understood, and
        agree to be bound by these Terms & Conditions.
      </p>
    </div>
  );
};

export default TermsAndConditions;
