/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Logo from "@/components/shared/navbar/Logo";
import { useResetPasswordMutation } from "@/redux/api/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Define Zod schema for validation
const formSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password should be at least 6 characters long" })
      .min(1, { message: "Password is required" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormValues = z.infer<typeof formSchema>;

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const [resetPassword] = useResetPasswordMutation();
  const router = useRouter();
  const userId = searchParams.get("userId") || "";
  const token = searchParams.get("token") || "";

  // Use React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  console.log(userId, token);
  const onSubmit = async (data: FormValues) => {
    try {
      const response = await resetPassword({
        userId,
        password: data.password,
        token,
      }).unwrap();

      if (response?.success) {
        console.log("Password reset successfully");
        toast.success("Password reset successfully");
        router.push("/signIn");
      } else {
        console.error("Failed to reset password");
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error?.data?.message || "Failed to reset password");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full lg:min-w-[500px]">
      <div className="flex flex-col items-center mb-8">
        <Logo />
        <h1 className="text-2xl font-bold mb-2">Change New Password!!</h1>
        <p className="text-gray-500 text-sm text-center">
          Welcome to Healixity <br />
          Enter a different password with the previous!
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        {/* Password Input */}
        <div className="space-y-2 w-full">
          <label htmlFor="password" className="text-sm font-medium block">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••"
              {...register("password")}
              className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-200"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="space-y-2 w-full">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium block"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••••"
            {...register("confirmPassword")}
            className={`w-full px-3 py-2 border ${errors.confirmPassword ? "border-red-500" : "border-gray-200"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">
              {typeof errors.confirmPassword.message === "string"
                ? errors.confirmPassword.message
                : "Password confirmation does not match the password."}
            </p>
          )}
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full bg-primary/80 text-white py-2 px-4 rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Reset
        </button>
      </form>
    </div>
  );
}
