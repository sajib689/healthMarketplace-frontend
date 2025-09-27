"use client";

import banner from "@/assets/banner/DE34C76B-D816-4F68-AF8E-DA74966B3AF2.jpeg";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import Image from "next/image";
import PrimaryButton from "./shared/primaryButton/PrimaryButton";
import { useState, KeyboardEvent } from "react";
import { useSearchHomeQuery } from "@/redux/api/others/OthersApi";
import { useRouter } from "next/navigation";

// Suggestion item type
type SuggestionItem = {
  id: string | number;
  type: "job" | "project" | "consultation";
  jobPosition?: string;
  location?: string;
  reqSkills?: string[];
  name?: string;
  category?: string;
  skills?: string[];
  title?: string;
  adviceOn?: string;
};

function Banner() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const { data } = useSearchHomeQuery(searchTerm, {
    skip: !searchTerm.trim(),
  });

  const handleSubmit = (): void => {
    if (searchTerm.trim()) {
      setShowSuggestions(true);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSuggestionClick = (item: SuggestionItem): void => {
    let path = "";
    switch (item.type) {
      case "job":
        path = `/jobs/${item.id}`;
        break;
      case "project":
        path = `/project?ids=${item.id}`;
        break;
      case "consultation":
        path = `/experts/${item.id}`;
        break;
      default:
        path = "/";
    }
    router.push(path);
    setShowSuggestions(false);
  };

  return (
    <AnimatePresence>
      <div className="bg-[#f0f0e4] relative">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center justify-end">
            {/* Left Column */}
            <motion.div
              className="space-y-6 md:col-span-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-6xl font-bold leading-tight md:my-0 my-4 capitalize">
                Healthcare expertise
                <span className="block text-primary">
                  in one platform
                  <br />
                </span>
              </h1>

              <p className="text-gray-600 lg:text-lg">
                Connect with healthcare experts, offer your expertise, and
                unlock endless opportunities
              </p>

              {/* Search Bar */}
              <div className="relative">
                <div className="flex items-center gap-2 bg-white rounded-full p-1 lg:p-2 shadow-sm max-w-xl">
                  <Search className="w-5 h-5 text-gray-400 ml-2" />
                  <input
                    type="text"
                    placeholder="Search work"
                    className="flex-1 outline-none px-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowSuggestions(true)}
                  />
                  <PrimaryButton onClick={handleSubmit} text="Search" />
                </div>

                {/* Search Suggestions */}
                {showSuggestions && (data?.data?.length ?? 0) > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-auto max-w-xl "
                  >
                    {data?.data.map((item: SuggestionItem) => (
                      <div
                        key={item.id}
                        className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => handleSuggestionClick(item)}
                      >
                        {item.type === "job" && (
                          <>
                            <h4 className="font-medium">{item.jobPosition}</h4>
                            <p className="text-sm text-gray-600">
                              {item.location}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.reqSkills?.map((skill) => (
                                <span
                                  key={skill}
                                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </>
                        )}
                        {item.type === "project" && (
                          <>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-600">
                              {item.category}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.skills?.map((skill) => (
                                <span
                                  key={skill}
                                  className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </>
                        )}
                        {item.type === "consultation" && (
                          <>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-gray-600">
                              {item.adviceOn}
                            </p>
                          </>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              className="relative md:col-span-3 flex items-center lg:items-end justify-center lg:justify-end z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <Image
                src={banner}
                width={2000}
                height={1000}
                alt="Professional woman"
                className="2xl:w-[800px] 2xl:h-[832px] xl:w-[739px] xl:h-[788px] lg:w-[600px] lg:h-[589px] sm:w-[640px] sm:h-[583px] md:w-[400px] md:h-[580px] w-[350px] h-[450px]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}

export default Banner;
