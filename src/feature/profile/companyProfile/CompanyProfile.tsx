/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loading from "@/components/others/Loading";
import useAuthUser from "@/hooks/useGetMe";
import { useUpdateUserMutation } from "@/redux/api/profile/profileApi";
import { Edit, Mail, MapPin, Phone, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { TiDocumentText } from "react-icons/ti";
import { toast } from "sonner";
import AboutSection from "../userProfile/profile/AboutSection";
import ProfileHeader from "../userProfile/profile/ProfileHeader";

type ProfileSection = "bio" | "phone" | "contact" | "email" | "profilePicture";

export default function CompanyProfilePage() {
  const { user: oldUser, isLoading: userLoading } = useAuthUser();

  const [user, setUser] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

  const [contact, setContact] = useState({
    phoneNumber: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    setUser(oldUser);
    setContact({
      phoneNumber: oldUser?.companyInfo?.phoneNumber,
      email: oldUser?.email,
      address: oldUser?.companyInfo?.address,
    });
  }, [oldUser]);

  const toggleLoading = (field: string, value: boolean) => {
    setIsLoading((prev) => ({ ...prev, [field]: value }));
  };

  const toggleEdit = (field: string) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const [updateUser] = useUpdateUserMutation();

  // Function to update profile data locally AND send to server
  const updateProfileData = async (section: ProfileSection, data: any) => {
    // Update local state optimistically
    const formData = new FormData();
    if (section === "profilePicture") {
      if (data) {
        formData.append("profilePicture", data);
        // Only send what's needed
        // formData.append("bodyData", JSON.stringify({}));
      }
    } else if (section === "contact") {
      toggleLoading("contact", true);
      if (data) {
        formData.append(
          "bodyData",
          JSON.stringify({
            companyInfo: {
              phoneNumber: data.phoneNumber,
              address: data.address,
            },
          })
        );
        // Only send what's needed
        // formData.append("bodyData", JSON.stringify({}));
      }
    } else if (section === "bio") {
      toggleLoading("bio", true);
      formData.append(
        "bodyData",
        JSON.stringify({
          companyInfo: { companyDetails: data },
        })
      );
    }
    // Send the update request
    try {
      const res = await updateUser({ formData: formData, role: "company" });

      if (res.data?.success) {
        toggleLoading("bio", false);
        toast.success(`${section.toLocaleUpperCase()} updated successfully!`);
      } else {
        toggleLoading("bio", false);
        toast.error(`Failed to update ${section}`);
      }
    } catch (error) {
      toggleLoading("bio", false);
      console.error(`Failed to update ${section}:`, error);

      toast.error(`Failed to update ${section}`);
    } finally {
      toggleLoading("bio", false); // Always runs regardless of success/failure
    }
  };

  if (userLoading) {
    return (
      <Loading
        title="Loading Profile Data"
        message="Proffessional Profile Gets more bids"
      />
    );
  }

  return (
    <div className="container section-gap bg-white">
      <div className="space-y-12">
        {/* About Section */}

        <ProfileHeader
          profileImage={
            user?.profilePicture ??
            "https://img.freepik.com/premium-vector/home-building-logo-design-modern-minimalist_1022051-108.jpg?ga=GA1.1.603131680.1747477038&semt=ais_items_boosted&w=740"
          }
          firstName={user?.firstName ?? ""}
          lastName={user?.lastName ?? ""}
          title={user?.companyInfo?.companyName ?? ""}
          onImageUpdate={(image) => updateProfileData("profilePicture", image)}

          //   onImageUpdate={() => {}}
        />

        <AboutSection
          role={"company"}
          bio={user?.companyInfo?.companyDetails ?? ""}
          onBioUpdate={(bio) => updateProfileData("bio", bio)}
          loading={isLoading.bio}
        />

        <section className="border-b pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium flex items-center gap-1">
              {" "}
              <TiDocumentText />
              Contact
            </h2>
            <button
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
              onClick={() => {
                if (isEditing.contact) {
                  updateProfileData("contact", contact);
                }
                toggleEdit("contact");
              }}
            >
              {isEditing.contact ? (
                <>
                  <Save className="w-4 h-4" />
                  <span className="text-sm">Save</span>
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4" />
                  <span className="text-sm">Edit Contact</span>
                </>
              )}
            </button>
          </div>
          {isEditing.contact ? (
            <div className="space-y-3">
              <input
                className="w-full p-2 border rounded"
                value={contact.phoneNumber || ""}
                onChange={(e) =>
                  setContact({ ...contact, phoneNumber: e.target.value })
                }
                type="tel"
              />
              <input
                readOnly
                className="w-full p-2 border rounded"
                value={contact.email || ""}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
                type="email"
              />
              <input
                className="w-full p-2 border rounded"
                value={contact.address || ""}
                onChange={(e) =>
                  setContact({ ...contact, address: e.target.value })
                }
              />
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm">
                <Phone className="inline w-4 h-4 text-gray-500" />{" "}
                {contact.phoneNumber || "No phone number provided"}
              </p>
              <p className="text-sm">
                <Mail className="inline w-4 h-4 text-gray-500" />{" "}
                {contact.email || "No email provided"}
              </p>
              <p className="text-sm">
                <MapPin className="inline w-4 h-4 text-gray-500" />{" "}
                {contact.address || "No address provided"}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
