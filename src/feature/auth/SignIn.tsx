/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Logo from "@/components/shared/navbar/Logo";
import Link from "next/link";
import { useSignInMutation } from "@/redux/api/auth/authApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setUser } from "@/redux/features/user/userSlice";
import { toast } from "sonner";

// Define Zod schema for validation
const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters long" })
    .min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  // Use React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const [signIn, { isLoading }] = useSignInMutation();

  const router = useRouter();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await signIn(data).unwrap();
      if (response?.success) {
        if (response.data.verify) {
          Cookies.set("token", response.data.accessToken);
          dispatch(
            setUser({
              token: response.data.accessToken,
            })
          );
          toast.success("Login successful");
          router.push("/");
        } else {
          router.push("/otp");
        }
      }
    } catch (error: any) {
      console.log("Error during sign-in:", error);
      return toast.error(error?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-full lg:min-w-[500px] ">
      <div className="flex flex-col items-center mb-8">
        <Logo />
        <h1 className="text-2xl font-bold mb-2">Hi, Welcome Back! 👋</h1>
        <p className="text-gray-500 text-sm">
          Please Enter Your Email And Password Below!
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        {/* Email Input */}
        <div className="space-y-2 ">
          <label htmlFor="email" className="text-sm font-medium block">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="georgiayoung@example.com"
            {...register("email")}
            className={`w-full px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-200"
            } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium block">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••"
              {...register("password")}
              className={`w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-200"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
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

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              {...register("rememberMe")}
              className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
              Remember Me
            </label>
          </div>
          <Link
            href="/forget-password"
            className="text-sm text-red-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-primary/80 text-white py-2 px-4 rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>

      {/* Register Link */}
      <div className="text-center mb-3 mt-6 text-sm text-gray-600">
        Don&apos;t have a company account?{" "}
        <Link href="/company-signUp" className="text-primary hover:underline">
          Register as a Company!
        </Link>
      </div>

      <p className="text-center">Or</p>

      <div className="text-center mb-3 mt-3 text-sm text-gray-600">
        Are you an individual?{" "}
        <Link href="/signUp" className="text-primary hover:underline">
          Register as an Individual!
        </Link>
      </div>
    </div>
  );
}
