/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loading from "@/components/others/Loading";
import useAuthUser from "@/hooks/useGetMe";
import { useUpdateUserMutation } from "@/redux/api/profile/profileApi";
import React, { useState } from "react";
import { toast } from "sonner";
import AboutSection from "./profile/AboutSection";
import EducationSection from "./profile/EducationSection";
import ExperienceSection from "./profile/ExperienceSection";
import ProfileHeader from "./profile/ProfileHeader";
import ResumeSection from "./profile/ResumeSection";
import SkillsSection from "./profile/SkillsSection";
import { useGetStripeAccountStatusQuery } from "@/redux/api/stripe/stripeApi";
import { UserPlaceholder } from "@/lib/placeholder";

type ProfileSection = "bio" | "skills" | "profilePicture" | "resume";

const ProfilePage: React.FC = () => {
  const { user, isLoading } = useAuthUser();

  const [updateUser] = useUpdateUserMutation();

  const { data, refetch } = useGetStripeAccountStatusQuery({});

  const [bioLoading, setBioLoading] = useState(false);
  // Function to update profile data locally AND send to server
  const updateProfileData = async (section: ProfileSection, data: any) => {
    console.log(section, data);
    // Update local state optimistically
    const formData = new FormData();

    if (section === "profilePicture") {
      if (data) {
        formData.append("profilePicture", data);
        // Only send what's needed
        // formData.append("bodyData", JSON.stringify({}));
      }
    } else if (section === "resume") {
      if (data) {
        formData.append("resume", data);
        // formData.append("bodyData", JSON.stringify({}));
      }
    } else if (section === "bio") {
      setBioLoading(true);
      formData.append(
        "bodyData",
        JSON.stringify({
          about: { bio: data },
        })
      );
    } else if (section === "skills") {
      formData.append(
        "bodyData",
        JSON.stringify({
          about: { skills: data },
        })
      );
    }

    // Send the update request
    try {
      const res = await updateUser({ formData: formData });

      if (res.data?.success) {
        toast.success(`${section.toLocaleUpperCase()} updated successfully!`);
      } else {
        toast.error(`Failed to update ${section}`);
      }
    } catch (error) {
      console.error(`Failed to update ${section}:`, error);
      toast.error(`Failed to update ${section}`);
    } finally {
      setBioLoading(false); // Always runs regardless of success/failure
    }
  };

  if (isLoading) {
    return (
      <Loading
        title="Loading Profile Data"
        message="Proffessional Profile Gets more bids"
      />
    );
  }
  return (
    <div className="container section-gap bg-white">
      <ProfileHeader
        profileImage={
          user?.profilePicture ?? UserPlaceholder.src
        }
        firstName={user?.firstName ?? ""}
        lastName={user?.lastName ?? ""}
        title={""}
        onImageUpdate={(image) => updateProfileData("profilePicture", image)}
        status={data?.data?.status}
        refetch={refetch}
      />

      <div className="space-y-12 mt-8">
        <AboutSection
          bio={user?.about?.bio ?? ""}
          onBioUpdate={(bio) => updateProfileData("bio", bio)}
          loading={bioLoading}
        />

        <ExperienceSection experiences={user?.experiences || []} />

        <SkillsSection
          skills={user?.about?.skills || []}
          onSkillsUpdate={(skills) => updateProfileData("skills", skills)}
        />

        <EducationSection education={user?.education || []} />

        <ResumeSection
          resume={user?.about?.resume ?? ""}
          onResumeUpdate={(resume) => updateProfileData("resume", resume)}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
