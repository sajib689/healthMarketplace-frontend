"use client";
import React from "react";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { useGetMyAgreementsQuery } from "@/redux/api/agreement/agreementApi";
import Loading from "@/components/others/Loading";
import ErrorState from "@/components/others/ErrorState";
import { useCreatePaymentAgreementMutation } from "@/redux/api/payment/paymentApi";
import { toast } from "sonner";



// Type safety for agreement data
type Agreement = {
  id: string;
  project?: { name: string };
  client?: { firstName: string; lastName: string };
  freelancer?: { firstName: string; lastName: string };
  amount: number;
  status: string;
  paymentStatus: string;
};

const PendingAgreement = () => {
  const { data: agreements, isLoading, isError } = useGetMyAgreementsQuery();
  const [createPaymentAgreement, { isLoading: isPaying, error }] =
    useCreatePaymentAgreementMutation();

  console.log("Pending Agreements Data:", agreements);
  console.log("Mutation Error:", error);

  if (isLoading)
    return (
      <div className="flex justify-center p-4">
        <Loading
          title="Loading Pending Agreement..."
          message="Please wait while we fetch the pending agreements."
        />
      </div>
    );

  if (isError || !agreements?.success)
    return (
      <div className="text-red-500 p-4">
        <ErrorState />
      </div>
    );

  const handlePay = async (agreement: Agreement) => {
    console.log("Sending agreementId:", agreement.id); // Log the ID being sent
    try {
      const response = await createPaymentAgreement({
        agreementId: agreement.id,
      });
      console.log("Mutation Response:", response); // Log the full response
      if (
        "data" in response &&
        response.data?.success &&
        response.data.data.clientSecret
      ) {
        window.location.href = `/make-payment?clientSecret=${response.data.data.clientSecret}`;
      } else {
        toast.error(
          "Failed to retrieve payment client secret. Please try again."
        );
        console.error("Failed to retrieve client secret:", response);
      }
    } catch (error) {
      console.error("Mutation Error Details:", error); // Log any caught errors
      toast.error(
        "An error occurred while processing payment. Please try again."
      );
    }
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-sm font-semibold text-gray-700  border border-gray-200">
          <thead>
            <tr className="bg-slate-50 text-left ">
              <th className="py-4 px-4 border-b">Project Name</th>
              <th className="py-4 px-4 border-b">Client</th>
              <th className="py-4 px-4 border-b">Freelancer</th>
              <th className="py-4 px-4 border-b">Amount</th>
              <th className="py-4 px-4 border-b">Status</th>
              <th className="py-4 px-4 border-b">Payment Status</th>
              <th className="py-4 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {agreements.data.map((agreement: Agreement) => (
              <tr key={agreement.id} className="border-b ">
                <td className="py-2 text-sm text-gray-500 px-4">
                  {(agreement.project?.name ?? "n/a")}
                </td>
                <td className="py-2 text-sm text-gray-500 px-4 capitalize">
                  {(
                    `${agreement.client?.firstName ?? ""} ${agreement.client?.lastName ?? ""
                    }`
                  )}
                </td>
                <td className="py-2 text-sm text-gray-500 px-4 capitalize">
                  {(
                    `${agreement.freelancer?.firstName ?? ""} ${agreement.freelancer?.lastName ?? ""
                    }`
                  )}
                </td>
                <td className="py-2 text-sm text-gray-500 px-4 capitalize">
                  {(`$${agreement.amount}`)}
                </td>
                <td className="py-2 text-sm text-gray-500 px-4 capitalize">
                  {(agreement.status)}
                </td>
                <td className="py-2 text-sm text-gray-500 px-4 capitalize">
                  <span
                    className={`inline-block px-2 py-1 rounded ${agreement.paymentStatus === "PENDING"
                      ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                      : agreement.paymentStatus === "COMPLETED"
                        ? "bg-green-100 text-green-800 border border-green-300"
                        : "bg-gray-100 text-gray-800 border border-gray-300"
                      }`}
                  >
                    {agreement.paymentStatus.toLowerCase()}
                  </span>
                </td>
                <td className="py-2 px-6">
                  {agreement.status.toLowerCase() === "accepted" && agreement.paymentStatus !== "COMPLETED"  && (
                    <PrimaryButton
                      onClick={() => handlePay(agreement)}
                      loading={isPaying}
                      text="Pay Now"
                    >
                    </PrimaryButton>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {agreements.data.length === 0 && (
        <p className="text-center mt-4">No pending agreements found.</p>
      )}
    </div>
  );
};

export default PendingAgreement;
