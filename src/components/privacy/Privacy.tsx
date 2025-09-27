import React from "react";

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Healixity LLC Privacy Policy</h1>
      <p className="mb-2">Effective Date: May 5th, 2025</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Introduction</h2>
      <p className="mb-4">
        Healixity LLC (“Healixity,” “we,” “us,” or “our”) values your privacy.
        This Privacy Policy describes how we collect, use, disclose, and
        safeguard your personal information when you use our website, platform,
        and related services (collectively, the “Platform”). This policy applies
        solely to activities within the United States and is governed
        exclusively by U.S. law.
      </p>
      <p className="mb-4">
        The Platform is not intended for the storage, transmission, or
        processing of protected health information (“PHI”) as defined under
        HIPAA. Users are prohibited from submitting or making PHI available
        through the Platform.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        2. Information We Collect
      </h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          Account Information: Name, email address, profile details,
          professional background.
        </li>
        <li>
          Transaction Information: Payment details processed via third-party
          providers (e.g., Stripe).
        </li>
        <li>
          Communications: Messages exchanged on the platform, including Zoom
          calls.
        </li>
        <li>
          Usage Data: IP address, browser type, operating system, and activity
          logs.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        3. How We Use Your Information
      </h2>
      <ul className="list-disc pl-6 mb-4">
        <li>To operate, maintain, and improve the Platform.</li>
        <li>To facilitate transactions and payments.</li>
        <li>To provide customer support.</li>
        <li>To enforce our Terms & Conditions and comply with laws.</li>
        <li>
          To prevent, detect, and investigate fraudulent or unlawful activities.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        4. Disclosure of Information
      </h2>
      <p className="mb-2">
        We do not sell personal information. We may share it as follows:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>
          With service providers like Stripe and Zoom, bound by confidentiality.
        </li>
        <li>When required by law or legal process.</li>
        <li>In business transfers like mergers or acquisitions.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Data Retention</h2>
      <p className="mb-4">
        We retain personal data only as long as necessary for business, legal,
        or dispute resolution purposes.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Your Rights</h2>
      <p className="mb-4">
        You may request access, correction, or deletion of your data by emailing{" "}
        <a href="mailto:contact@healixity.com" className="text-blue-600">
          contact@healixity.com
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Security</h2>
      <p className="mb-4">
        We use commercially reasonable safeguards to protect data but cannot
        guarantee complete security.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        8. Children’s Privacy
      </h2>
      <p className="mb-4">
        The Platform is not directed to individuals under 18, and we do not
        knowingly collect data from minors.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        9. Changes to this Privacy Policy
      </h2>
      <p className="mb-4">
        We may update this policy periodically. Continued use after changes
        indicates acceptance.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">10. Contact Us</h2>
      <p>
        For questions, email:{" "}
        <a href="mailto:contact@healixity.com" className="text-blue-600">
          contact@healixity.com
        </a>
      </p>
    </div>
  );
};

export default Privacy;
