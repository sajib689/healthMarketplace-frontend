/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Logo from "@/components/shared/navbar/Logo";
import Link from "next/link";
import { useSignUpMutation } from "@/redux/api/auth/authApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Define Zod schema for validation
const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .email({ message: "Please enter a valid company email address" })
    .min(1, { message: "Company email is required" }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters long" })
    .min(1, { message: "Password is required" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Confirm Password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // This shows the error on confirmPassword field
});

type FormValues = z.infer<typeof formSchema>;

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [signUp, { isLoading }] = useSignUpMutation();
  const router = useRouter();

  // Use React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    localStorage.setItem("email", data.email);
    console.log("Form Data:", data);
    // Handle form submission (e.g., API call)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = data;

    // Add role to the payload
    const payload = {
      ...rest,
      role: "INDIVIDUAL",
    };

    try {
      const response = await signUp(payload).unwrap();
      if (response?.success) {
        router.push("/otp");
      }
    } catch (error: any) {
      // console.error("Error during sign up:", error);
      toast.error(error?.data?.message || "Sign up failed");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full lg:min-w-[500px]">
      <div className="flex flex-col items-center mb-8">
        <Logo />
        <h1 className="text-2xl font-bold mb-2">
          Create your Individual User Account!
        </h1>
        <p className="text-gray-500 text-sm text-center">
          Welcome to Healixity <br />
          Please enter the information requested to create your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div className="flex items-center gap-4">
          {/* First Name Input */}
          <div className="space-y-2 w-full">
            <label htmlFor="firstName" className="text-sm font-medium block">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="John"
              {...register("firstName")}
              className={`w-full px-3 py-2 border ${errors.firstName ? "border-red-500" : "border-gray-200"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name Input */}
          <div className="space-y-2 w-full">
            <label htmlFor="lastName" className="text-sm font-medium block">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Doe"
              {...register("lastName")}
              className={`w-full px-3 py-2 border ${errors.lastName ? "border-red-500" : "border-gray-200"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Company Email Input */}
        <div className="space-y-2 w-full">
          <label htmlFor="email" className="text-sm font-medium block">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@company.com"
            {...register("email")}
            className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-200"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

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
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      {/* Login Link */}
      <div className="text-center mb-3 mt-3 text-sm text-gray-600">
        Are you an individual?{" "}
        <Link href="/signIn" className="text-primary hover:underline">
          Sign In as an Individual!
        </Link>
      </div>
    </div>
  );
}
