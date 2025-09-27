"use client";
import EmptyState from "@/components/others/EmptayState";
import Loading from "@/components/others/Loading";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { useGetProfileQuery } from "@/redux/api/profile/profileApi";
import { Edit, Save } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { RiDriveFill } from "react-icons/ri";
import { TiDocumentText } from "react-icons/ti";
import { Tag } from "../jobs/card/Tag";
import Education from "./userProfile/card/Education";
// import { useGetUserQuery } from "@/redux/api/auth/authApi";

const doctors = {
    skills: ["Cardiology", "Heart Surgery", "Patient Care"],
};

export default function ProfilePage() {
    const [profile, setProfile] = useState({
        bio: "Tessa was born on March 20, 2006, in Peoria, IL...",
    });

    const { data, isLoading, isError, error } = useGetProfileQuery();


    console.log("Profile Data", data);
    console.log("Experience Data", data?.data?.experiences);
    console.log("Education Data", data?.data?.education);

    const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});

    const toggleEdit = (field: string) => {
        setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleChange = (field: string, value: string) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error loading profile: {error.toString()}</div>;
    }

    if (!data?.data) {
        return <EmptyState />;
    }

    return (
        <div className="container section-gap bg-white">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
                <div className="relative w-52 h-52 rounded-full">
                    <Image
                        src="https://randomuser.me/api/portraits/women/2.jpg"
                        alt="Profile picture"
                        width={200}
                        height={200}
                        className="object-cover rounded-full"
                    />
                </div>
                <div>
                    <h1 className="md:text-3xl text-lg sm:text-xl lg:text-5xl font-semibold text-gray-900">
                        {data.data.firstName} {data.data.lastName}
                    </h1>
                    <p className="text-gray-600">UX Designer at Divin Technology</p>
                </div>
            </div>

            <div className="space-y-12">
                {/* About Section */}
                <section className="border-b pb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium w-fit pb-2 border-b-2 border-black">
                            About
                        </h2>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium flex items-center gap-1">
                            {" "}
                            <TiDocumentText /> Bio
                        </h2>
                        <button
                            className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
                            onClick={() => toggleEdit("bio")}
                        >
                            {isEditing.bio ? (
                                <Save className="w-4 h-4" />
                            ) : (
                                <Edit className="w-4 h-4" />
                            )}
                            <span className="text-sm">
                                {isEditing.bio ? "Save" : "Edit Bio"}
                            </span>
                        </button>
                    </div>
                    {isEditing.bio ? (
                        <textarea
                            className="w-full p-2 border rounded"
                            value={profile.bio}
                            onChange={(e) => handleChange("bio", e.target.value)}
                        />
                    ) : (
                        <p className="text-gray-700 text-sm leading-relaxed">
                            {profile.bio}
                        </p>
                    )}
                </section>
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium flex items-center gap-1">
                            {" "}
                            <TiDocumentText /> Experience
                        </h2>
                        <button
                            className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
                            onClick={() => toggleEdit("experience")}
                        >
                            {isEditing.experience ? (
                                <Save className="w-4 h-4" />
                            ) : (
                                <Edit className="w-4 h-4" />
                            )}
                            <span className="text-sm">{isEditing.bios ? "Save" : "Add"}</span>
                        </button>
                    </div>
                    <div className="space-y-6">
                        {data.data.experiences.map((edu, index) => (
                            <Education
                                showImage={false}
                                key={index}
                                institution={edu.companyName}
                                degree={edu.companyName}
                                startYear={edu.startDate}
                                endYear={edu.endDate as string}
                                description={edu.descriptions}
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium flex items-center gap-1">
                            {" "}
                            <TiDocumentText /> Expertise/Skills
                        </h2>
                        <button
                            className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
                            onClick={() => toggleEdit("skill")}
                        >
                            {isEditing.skill ? (
                                <Save className="w-4 h-4" />
                            ) : (
                                <Edit className="w-4 h-4" />
                            )}
                            <span className="text-sm">
                                {isEditing.skill ? "Save" : "Add"}
                            </span>
                        </button>
                    </div>

                    {/* till fake data  */}
                    {doctors.skills.map((skill, index) => (
                        <Tag key={index} name={skill} />
                    ))}
                </section>
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium flex items-center gap-1">
                            {" "}
                            <TiDocumentText /> Educations
                        </h2>
                        <button
                            className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
                            onClick={() => toggleEdit("education")}
                        >
                            {isEditing.education ? (
                                <Save className="w-4 h-4" />
                            ) : (
                                <Edit className="w-4 h-4" />
                            )}
                            <span className="text-sm">
                                {isEditing.education ? "Save" : "Add"}
                            </span>
                        </button>
                    </div>
                    <div className="space-y-6">
                        {data.data.education.map((edu, index) => (
                            <Education
                                key={index}
                                institution={edu.institute}
                                degree={edu.degree}
                                startYear={edu.startDate}
                                endYear={edu.endDate}
                                description={edu.descriptions}
                                imageSrc={"/images/harvard.png"}
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium flex items-center gap-1">
                            {" "}
                            <TiDocumentText /> Cv / Resume{" "}
                        </h2>
                        <button
                            className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
                            onClick={() => toggleEdit("cv")}
                        >
                            {isEditing.cv ? (
                                <Save className="w-4 h-4" />
                            ) : (
                                <Edit className="w-4 h-4" />
                            )}
                            <span className="text-sm">{isEditing.cv ? "Save" : "Add"}</span>
                        </button>
                    </div>
                    <div className="w-fit">
                        <PrimaryButton onClick={() => { }}>
                            <div className="flex items-center gap-2 w-fit">
                                Download Resume <RiDriveFill />
                            </div>
                        </PrimaryButton>
                    </div>
                </section>
            </div>
        </div>
    );
}

