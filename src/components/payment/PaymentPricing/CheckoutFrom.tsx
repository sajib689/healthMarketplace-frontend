/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const CheckoutForm = ({
  clientSecret,
  user,
}: {
  clientSecret: string;
  user: any;
  joinData: { tournamentId: string; userId?: string; clanId?: string };
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [stripeError, setStripeError] = useState<string | null>(null);

  // const [] = useJoinTournamentsMutation()

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.fullName || user?.userName || "",
      address: "",
      additional: "",
      region: "",
      zipCode: "",
    },
  });

  const onSubmit = async (data: any) => {
    if (!stripe || !elements) {
      return;
    }

    setStripeError(null);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              name: user?.fullName || user?.userName,
              address: {
                line1: data.address,
                city: data.region,
                postal_code: data.zipCode,
                country: "US",
              },
              email: user?.email,
            },
          },
        }
      );
      // console.log(paymentIntent);
      if (error) {
        setStripeError(error.message || "Payment failed");
      } else if (paymentIntent?.status === "succeeded") {
        // const joinRes = await joinTournments(joinData)
        // console.log(joinRes);
        // if (joinRes.data?.success) {
        //   toast.success("Payment Successful");
        //   router("/confirmation");
        // }
        // else {
        //   toast.error("Payment FailedF");
        // }
        // console.log(joinData);
        toast.success("Payment Successful");
        router.push("/confirmation");
      }
    } catch (err) {
      setStripeError("An unexpected error occurred");
      console.error(err);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#374151",
        backgroundColor: "transparent",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
        "::placeholder": {
          color: "#9ca3af",
        },
      },
      invalid: {
        color: "#ef4444",
      },
      complete: {
        color: "#10b981",
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Complete Your Purchase
          </h1>
          <p className="text-gray-600 text-lg">
            Secure checkout powered by Stripe
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Left column - Billing Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 shadow-md border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Billing Information
                </h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="address"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <input
                        id="address"
                        {...field}
                        type="text"
                        className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        placeholder="Enter your street address"
                      />
                    )}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Address is required
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="additional"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Additional Information
                  </label>
                  <Controller
                    name="additional"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        id="additional"
                        {...field}
                        className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 min-h-[120px] resize-none"
                        placeholder="Any special instructions or notes..."
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Payment */}
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 shadow-md border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Payment Method
                </h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Card Information <span className="text-red-500">*</span>
                  </label>
                  <div className="p-4 bg-white border border-gray-300 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200">
                    <CardElement options={cardElementOptions} />
                  </div>
                </div>

                {stripeError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center gap-2 text-red-600">
                      <svg
                        className="w-5 h-5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">{stripeError}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    Billing Address <span className="text-red-500">*</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City/Region
                      </label>
                      <Controller
                        name="region"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <input
                            id="region"
                            {...field}
                            type="text"
                            className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                            placeholder="City or region"
                          />
                        )}
                      />
                      {errors.region && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Required
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label
                        htmlFor="zipCode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        ZIP Code
                      </label>
                      <Controller
                        name="zipCode"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <input
                            id="zipCode"
                            {...field}
                            type="text"
                            className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                            placeholder="ZIP code"
                          />
                        )}
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Required
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!stripe}
                  className="w-full py-4 px-6 bg-primary disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-xl transition-all duration-200 transform  hover:shadow-xl disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {!stripe ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      Complete Secure Payment
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Secured by 256-bit SSL encryption
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
