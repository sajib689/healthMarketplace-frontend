"use client";

import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { useCreateStripeLoginLinkMutation } from "@/redux/api/stripe/stripeApi";

export function DashboardButton() {
  const [createLoginLink, { isLoading, error }] =
    useCreateStripeLoginLinkMutation();

  const handleDashboard = async () => {
    try {
      const result = await createLoginLink({}).unwrap();
      // Open Stripe dashboard in new tab
      window.open(result.data.url, "_blank");
    } catch (err) {
      console.error("Failed to create login link:", err);
    }
  };

  console.log(error);
  return (
    <PrimaryButton onClick={handleDashboard} loading={isLoading}>
      <span>Open Stripe Dashboard</span>
    </PrimaryButton>
  );
}
