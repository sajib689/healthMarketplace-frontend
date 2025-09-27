"use client";
import { useCreateStripeOnboardingMutation } from "@/redux/api/stripe/stripeApi";

export function OnboardingButton() {
  const [createOnboarding, { isLoading }] = useCreateStripeOnboardingMutation();

  const handleOnboarding = async () => {
    try {
      const result = await createOnboarding({});
      if (result.data?.success) {
        window.open(result?.data?.data?.url, "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      console.error("Failed to create onboarding:", err);
    }
  };

  return (
    <button
      onClick={handleOnboarding}
      disabled={isLoading}
      className="w-full sm:w-auto px-6 py-2 bg-secondary/80 hover:bg-secondary text-white font-medium rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? "Processing..." : "Setup Stripe Account"}
    </button>
  );
}
