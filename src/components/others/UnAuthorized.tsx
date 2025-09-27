"use client"

import React from "react";
import PrimaryButton from "../shared/primaryButton/PrimaryButton";
import { useRouter } from "next/navigation";

const UnauthorizedState: React.FC = () => {
    const router = useRouter();

    const goToSignIn = () => {
        router.push("/signIn"); // change path if needed
    };

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="rounded-xl p-8 max-w-md w-full text-center border shadow-lg">
                {/* Lock Icon */}
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 11c.828 0 1.5-.672 1.5-1.5V7a4.5 4.5 0 00-9 0v2.5c0 .828.672 1.5 1.5 1.5h6zM5 11h14v10H5V11z"
                        />
                    </svg>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">Unauthorized</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    You don’t have permission to access this page.
                    Please sign in to continue.
                </p>

                <PrimaryButton onClick={goToSignIn}>
                    <span className="flex items-center justify-center">
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12H3m0 0l4-4m-4 4l4 4m8 4h4V8h-4"
                            />
                        </svg>
                        Go to Sign In
                    </span>
                </PrimaryButton>
            </div>
        </div>
    );
};

export default UnauthorizedState;
