"use client";

import Logo from "@/components/shared/navbar/Logo";
import { useForgetPasswordMutation } from "@/redux/api/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Define Zod schema for validation
const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Email is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ForgetPassPage() {
  const router = useRouter();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  // Use React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Form Data:", data);
    try {
      const response = await forgetPassword(data).unwrap();
      if (response?.success) {
        console.log("OTP sent successfully");
        toast.success("OTP sent successfully to your email");
        router.push("/signIn");
      }
      // router.push("/otp")
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error sending OTP. Please try again.");
    }
  };

  return (
    <div className="w-full lg:min-w-[500px] ">
      <div className="flex flex-col items-center mb-8">
        <Logo />
        <h1 className="text-2xl font-bold mb-2">Forget Password!</h1>
        <p className="text-gray-500 text-sm">
          Enter your registered email below
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

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-primary/80 text-white py-2 px-4 rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {isLoading ? "Loading..." : "Send OTP"}
        </button>
      </form>

      {/* Register Link */}
      <div className="text-center mb-3 mt-3 text-sm text-gray-600">
        Remembered the Account?{" "}
        <Link href="/signIn" className="text-primary hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}
