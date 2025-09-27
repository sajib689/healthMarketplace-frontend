/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/navbar/Logo";
import { useRouter } from "next/navigation";
import {
  useResendCodeMutation,
  useVerifyEmailMutation,
} from "@/redux/api/auth/authApi";
import { toast } from "sonner";

interface OtpFormValues {
  otp: string[];
}

export default function OtpVerification() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<OtpFormValues>({
    defaultValues: {
      otp: ["", "", "", "", "", ""],
    },
  });

  const router = useRouter();
  const [activeInput, setActiveInput] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [verifyEmail] = useVerifyEmailMutation();
  const [resendCode] = useResendCodeMutation();

  // Resend OTP Timer
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300 seconds

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Convert timeLeft to MM:SS format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Resend OTP handler
  const handleResendOTP = () => {
    const email = localStorage.getItem("email");
    setTimeLeft(300); // Reset timer
    console.log("Resending OTP...");
    resendCode({ email });
  };

  // Focus the first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const onSubmit = async (data: OtpFormValues) => {
    const email = localStorage.getItem("email");
    const otpValue = data.otp.join("");
    console.log("OTP submitted:", otpValue);
    try {
      const response = await verifyEmail({ email, otp: otpValue }).unwrap();
      if (response?.success) {
        toast.success("Verification successful!");
        router.push("/signIn");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Verification failed. Please try again."
      );
      // Handle error (e.g., show a notification)
    }

    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // router.push("/reset-password");
  };

  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (value.length > 1) return;
    setValue(`otp.${index}`, value);

    if (value !== "" && index < 5) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      index > 0 &&
      !inputRefs.current[index]?.value
    ) {
      setActiveInput(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      setActiveInput(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    if (/^\d{6}$/.test(pastedData)) {
      pastedData.split("").forEach((digit, index) => {
        setValue(`otp.${index}`, digit);
      });
      setActiveInput(5);
      inputRefs.current[5]?.focus();
    }
  };

  return (
    <div className="">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-4 flex flex-col items-center">
          <Logo />
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-blue-500">
            <Check className="h-20 w-20 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Success</h1>
          <p className="text-sm text-gray-600">
            Please Check Your Email For Verification Code
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-center gap-2">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className={`h-14 w-14 rounded-md border border-gray-300 text-center text-xl focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${activeInput === index
                  ? "border-blue-500 ring-1 ring-blue-500"
                  : ""
                  }`}
                {...register(`otp.${index}`, {
                  required: true,
                  pattern: /^[0-9]$/,
                })}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                onChange={(e) => handleInputChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                autoComplete="off"
              />
            ))}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Submit"}
          </Button>
        </form>

        {/* Resend OTP Section */}
        <div className="text-center mt-4">
          {timeLeft > 0 ? (
            <p className="text-sm text-gray-600">
              Resend OTP in{" "}
              <span className="font-medium text-blue-500">
                {formatTime(timeLeft)}
              </span>
            </p>
          ) : (
            <button
              onClick={handleResendOTP}
              className="text-sm text-blue-500 hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
