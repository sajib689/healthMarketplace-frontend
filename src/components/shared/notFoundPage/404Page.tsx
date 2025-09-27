"use client"
import Link from "next/link";
import React from "react";
import PrimaryButton from "../primaryButton/PrimaryButton";

interface PageNotFoundProps {
    title?: string;
    message?: string;
    showHomeButton?: boolean;
    showBackButton?: boolean;
    showSearchButton?: boolean;
    onHome?: () => void;
    onBack?: () => void;
    onSearch?: () => void;
    customLinks?: Array<{
        label: string;
        onClick: () => void;
        primary?: boolean;
    }>;
}

const PageNotFound: React.FC<PageNotFoundProps> = ({
    title = "404 - Page Not Found",
    message = "The page you're looking for doesn't exist or has been moved to a different location.",
    showHomeButton = true,
    showBackButton = true,
    showSearchButton = false,
    onHome = () => window.location.href = "/",
    onBack = () => window.history.back(),
    onSearch,
    customLinks = [],
}) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-16 px-4">
            <div className="rounded-xl p-8 max-w-lg w-full text-center border shadow-lg">
                {/* 404 Icon */}
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.9.785-5.291 2.09m6.291-4.09L16 10m0 0l3-3m-3 3l-3-3m3 3v6"
                        />
                    </svg>
                </div>

                {/* Large 404 Text */}
                <div className="mb-4">
                    <h1 className="text-6xl font-bold text-gray-300 mb-2">404</h1>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed">{message}</p>

                {/* Action Buttons */}
                <div className="space-y-3">
                    {showHomeButton && (
                        <PrimaryButton onClick={onHome}>
                            <span className="flex items-center justify-center">
                                <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                                Go Home
                            </span>
                        </PrimaryButton>
                    )}

                    <div className="flex gap-3">
                        {showBackButton && (
                            <button
                                onClick={onBack}
                                className="flex-1 px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-full transition-colors"
                            >
                                <span className="flex items-center justify-center">
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                        />
                                    </svg>
                                    Go Back
                                </span>
                            </button>
                        )}

                        {showSearchButton && onSearch && (
                            <button
                                onClick={onSearch}
                                className="flex-1 px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-full transition-colors"
                            >
                                <span className="flex items-center justify-center">
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                    Search
                                </span>
                            </button>
                        )}
                    </div>

                    {/* Custom Links */}
                    {customLinks.map((link, index) => (
                        <button
                            key={index}
                            onClick={link.onClick}
                            className={`w-full px-6 py-2 font-medium rounded-full transition-colors ${link.primary
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                                }`}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                {/* Helpful Links */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-3">You might be looking for:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        <Link
                            href="/"
                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        >
                            Home
                        </Link>
                        <span className="text-gray-300">•</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;