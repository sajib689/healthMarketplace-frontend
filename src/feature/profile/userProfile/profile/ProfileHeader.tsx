/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef } from "react";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { AccountStatus } from "./stripe/AccStatus";
import { OnboardingButton } from "./stripe/Onboarding";
import { DashboardButton } from "./stripe/StripeDashboard";
import Image from "next/image";
import stripe from "@/assets/pay/stripe.png";
interface ProfileHeaderProps {
  profileImage: string;
  firstName: string;
  lastName: string;
  title: string;
  onImageUpdate: (file: File) => void; // Now expects a File object
  status?: string;
  refetch?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profileImage,
  firstName,
  lastName,
  title,
  onImageUpdate,
  refetch,
  status,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(file.type)) {
      toast.error("Please select a valid image file (JPEG, PNG, or GIF)");
      return;
    }

    // Immediately pass the file to parent component
    onImageUpdate(file);

    // Show loading state
    setIsLoading(true);

    // Generate preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewImage(result);
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid lg:grid-cols-3 items-center gap-10">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 col-span-2">
        <div
          className="relative w-52 h-52 rounded-full overflow-hidden group cursor-pointer shadow-lg"
          onClick={handleImageClick}
        >
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <img
                src={previewImage || profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <h1 className="md:text-3xl text-lg sm:text-xl lg:text-5xl font-semibold text-gray-900">
            {firstName} {lastName}
          </h1>
          <p className="text-gray-600">{title}</p>
        </div>
      </div>
      {/* stripe account  */}
      <div className="border p-4 rounded-md shadow-lg ">
        <div className="flex items-center gap-1 mb-4">
          <Image src={stripe} alt="stripe logo" width={100} height={100} />
          <h2 className="text-4xl font-bold text-primary ">Account</h2>
        </div>
        <AccountStatus
          refetch={refetch ? refetch : () => {}}
          status={status || ""}
        />
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          {status === "new " || status === "completed" ? (
            <DashboardButton />
          ) : (
            <div>
              <OnboardingButton />
              <p className="text-warning mt-1 text-sm">
                *Please Connect your stripe account
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
