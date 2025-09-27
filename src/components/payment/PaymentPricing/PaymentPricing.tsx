"use client"; // for client component

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import useAuthUser from "../../../hooks/useGetMe";
import CheckoutForm from "./CheckoutFrom";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function PaymentPricing() {
  const searchParams = useSearchParams();

  const clientSecret = searchParams.get("clientSecret") || "";
  const tournamentsId = searchParams.get("tournamentsId") || "";
  const clanId = searchParams.get("clanId");
  const userId = searchParams.get("userId");

  const joinData: { tournamentId: string; userId?: string; clanId?: string } =
    useMemo(() => {
      if (userId) return { tournamentId: tournamentsId, userId };
      if (clanId) return { tournamentId: tournamentsId, clanId };
      return { tournamentId: tournamentsId };
    }, [tournamentsId, userId, clanId]);

  const { user } = useAuthUser();

  return (
    <div className="container mx-auto section-gap">
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm
            clientSecret={clientSecret}
            joinData={joinData}
            user={user}
          />
        </Elements>
      )}
    </div>
  );
}
