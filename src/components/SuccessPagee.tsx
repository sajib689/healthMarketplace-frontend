"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const SuccessPage = () => {
    const searchParams = useSearchParams();
    const sessionId = searchParams?.get("session_id"); // optional chaining

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
                <div className="mb-6">
                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-4xl text-green-500">✓</span>
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
                <p className="text-gray-600 mb-6">
                    Thank you for your purchase. Your payment has been processed successfully.
                </p>

                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6 ">
                    <p className="text-sm text-green-800">
                        Order Confirmation #:{" "}
                        <span className="font-mono font-semibold break-all">
                            {sessionId ?? "N/A"}
                        </span>

                    </p>
                </div>

                <div className="space-y-3">
                    <Link
                        href="/"
                        className="block w-full py-3 px-4 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
