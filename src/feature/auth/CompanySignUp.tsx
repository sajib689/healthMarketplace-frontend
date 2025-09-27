/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Logo from "@/components/shared/navbar/Logo";
import Link from "next/link";
import { useCompanySignUpMutation } from "@/redux/api/auth/authApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Define Zod schema for validation
const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  companyName: z.string().min(1, { message: "Company name is required" }),
  companyDetails: z
    .string()
    .min(1, { message: "Company details are required" }),
  companyEmail: z
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
});

type FormValues = z.infer<typeof formSchema>;

export default function CompanySignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [companySignUp, { isLoading }] = useCompanySignUpMutation();
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
      companyName: "",
      companyDetails: "",
      companyEmail: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    // console.log("Form Data:", data);
    const apiData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.companyEmail,
      password: data.password,
      role: "COMPANY",
      companyInfo: {
        companyName: data.companyName,
        companyDetails: data.companyDetails,
      },
    };
    // console.log("API Data:", apiData);
    // Handle form submission (e.g., API call)

    try {
      const response = await companySignUp(apiData).unwrap();
      if (response?.success) {
        toast.success("Sign up successful");
        router.push("/otp");
      }
    } catch (error: any) {
      console.error("Error:", error);
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
          Create your Company Account!
        </h1>
        <p className="text-gray-500 text-sm text-center ">
          Welcome to Healixity <br /> Please enter the information requested to
          create your account
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

        {/* Company Name Input */}
        <div className="space-y-2 w-full">
          <label htmlFor="companyName" className="text-sm font-medium block">
            Company Name
          </label>
          <input
            id="companyName"
            type="text"
            placeholder="Tech Corp"
            {...register("companyName")}
            className={`w-full px-3 py-2 border ${errors.companyName ? "border-red-500" : "border-gray-200"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          />
          {errors.companyName && (
            <p className="text-red-500 text-xs">{errors.companyName.message}</p>
          )}
        </div>

        {/* Company Details Input */}
        <div className="space-y-2 w-full">
          <label htmlFor="companyDetails" className="text-sm font-medium block">
            Company Details
          </label>
          <textarea
            id="companyDetails"
            placeholder="Details about your company"
            {...register("companyDetails")}
            className={`w-full px-3 py-2 border min-h-[100px] ${errors.companyDetails ? "border-red-500" : "border-gray-200"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          />
          {errors.companyDetails && (
            <p className="text-red-500 text-xs">
              {errors.companyDetails.message}
            </p>
          )}
        </div>

        {/* Company Email Input */}
        <div className="space-y-2 w-full">
          <label htmlFor="companyEmail" className="text-sm font-medium block">
            Company Email Address
          </label>
          <input
            id="companyEmail"
            type="email"
            placeholder="example@company.com"
            {...register("companyEmail")}
            className={`w-full px-3 py-2 border ${errors.companyEmail ? "border-red-500" : "border-gray-200"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          />
          {errors.companyEmail && (
            <p className="text-red-500 text-xs">
              {errors.companyEmail.message}
            </p>
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
      <div className="text-center mb-3 mt-6 text-sm text-gray-600">
        Already have a company account?{" "}
        <Link href="/signIn" className="text-primary hover:underline">
          Sign in as a Company!
        </Link>
      </div>
    </div>
  );
}
