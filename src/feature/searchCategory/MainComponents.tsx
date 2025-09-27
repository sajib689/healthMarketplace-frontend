"use client";
import React, { useState, JSX } from "react";
import { useRouter } from "next/navigation";
import { ModalTransition } from "@/components/modal/ModalTransition";

type Category = {
    id: number;
    icon: JSX.Element;
    title: string;
    slug: string;
    description: string;
};

const MainChoice = ({ onSelect }: { onSelect: (value: string) => void }) => (
    <div className="grid grid-cols-2 items-center justify-center gap-4 mb-4">
        <button
            onClick={() => onSelect("Project")}
            className="p-10 shadow-lg border rounded-lg text-white bg-primary hover:bg-white hover:text-black hover:border-primary transition-all duration-300 relative overflow-hidden text-lg font-semibold"
        >
            Projects
            <div className="absolute p-5 right-2 bottom-2 bg-white/30 rounded-full" />
            <div className="absolute p-6 -right-3 -bottom-4 bg-white/40 rounded-full" />

        </button>
        <button
            onClick={() => onSelect("Jobs")}
            className="p-10 shadow-lg border rounded-lg text-white bg-secondary hover:bg-white hover:text-black hover:border-secondary transition-all duration-300 relative overflow-hidden text-lg font-semibold"
        >
            Jobs
            <div className="absolute p-5 right-2 bottom-2 bg-white/30 rounded-full" />
            <div className="absolute p-6 -right-3 -bottom-4 bg-white/40 rounded-full" />
        </button>
    </div>
);

const ClinicalChoice = ({
    selected,
    onSelect,
    handleRedirect,
}: {
    selected: string;
    onSelect: (value: string) => void;
    handleRedirect: (main: string, sub: string, type?: string) => void;
}) => (
    <div className="grid grid-cols-2 items-center justify-center gap-4 mb-4">
        <button
            onClick={() => {
                onSelect("Clinical");
                if (selected === "Project") {
                    handleRedirect("project", "clinical");
                }
            }}
            className="p-10  shadow-lg border rounded-lg text-white bg-primary hover:bg-white hover:text-black hover:border-primary transition-all duration-300 relative overflow-hidden text-lg font-semibold"
        >
            Clinical
            <div className="absolute p-5 right-2 bottom-2 bg-white/30 rounded-full" />
            <div className="absolute p-6 -right-3 -bottom-4 bg-white/40 rounded-full" />
        </button>
        <button
            onClick={() => {
                onSelect("Nonclinical");
                if (selected === "Project") {
                    handleRedirect("project", "nonclinical");
                }
            }}
            className="p-10 shadow-lg border rounded-lg text-white bg-secondary hover:bg-white hover:text-black hover:border-secondary transition-all duration-300 relative overflow-hidden text-lg font-semibold"
        >
            Nonclinical
            <div className="absolute p-5 right-2 bottom-2 bg-white/30 rounded-full" />
            <div className="absolute p-6 -right-3 -bottom-4 bg-white/40 rounded-full" />
        </button>
    </div>
);

const JobTypeChoice = ({
    subSelected,
    handleRedirect,
}: {
    subSelected: string;
    handleRedirect: (main: string, sub: string, type?: string) => void;
}) => (
    <div className="grid grid-cols-3 items-center justify-center gap-2 mb-4">
        {["Full-time", "Part-time", "Contract"].map((type) => (
            <button
                key={type}
                onClick={() => handleRedirect("jobs", subSelected, type)}
                className="p-10 border rounded-lg shadow-lg hover:bg-secondary/40 transition-colors duration-300 relative overflow-hidden text-lg font-semibold"
            >
                {type}
                <div className="absolute p-5 right-2 bottom-2 bg-primary/30 rounded-full" />
                <div className="absolute p-6 -right-3 -bottom-4 bg-secondary/40 rounded-full" />
            </button>
        ))}
    </div>
);

const MainComponents = ({ activeCategory }: { activeCategory: Category }) => {
    const router = useRouter();
    const [selected, setSelected] = useState<string | null>(null);
    const [subSelected, setSubSelected] = useState<string | null>(null);

    const handleRedirect = (main: string, sub: string, type?: string) => {
        let url = `/${main.toLowerCase()}?category=${sub.toLowerCase()}`;
        if (type) url += `&type=${type.toLowerCase()}`;
        router.push(url);
    };

    return (
        <div className="p-6 w-[calc(100vw-40px)] md:w-fit overflow-hidden">
            <h2 className="text-xl font-semibold mb-4">{activeCategory.title}</h2>
            <p className="text-gray-600 mb-6">{activeCategory.description}</p>

            {/* Step 1 */}
            {!selected && <ModalTransition> <MainChoice onSelect={setSelected} /> </ModalTransition>}

            {/* Step 2 */}
            {selected && !subSelected && (
                <ModalTransition>

                    <ClinicalChoice
                        selected={selected}
                        onSelect={setSubSelected}
                        handleRedirect={handleRedirect}
                    />
                </ModalTransition>
            )}

            {/* Step 3 */}
            {selected === "Jobs" && subSelected && (
                <ModalTransition>
                    <JobTypeChoice
                        subSelected={subSelected}
                        handleRedirect={handleRedirect}
                    />
                </ModalTransition>
            )}
        </div>
    );
};

export default MainComponents;
