/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Pagination from "@/components/shared/pagination/Pagination";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ConsultationCard } from "./card/ConsultationCard";
import { Modal } from "@/components/modal/Modal";
import { ConsultationModal } from "./card/ConsultationModal";
import { useRouter } from "next/navigation";
import { useGetConsultationsQuery } from "@/redux/api/consultation/consultationApi";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import WithEmptyState from "@/components/others/AllState";
import { Consultation } from "@/interfaces/global";
import { Suggestion, useSuggestionsQuery } from "@/redux/api/others/OthersApi";

const AllConsultation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [activeFilters, ] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<number | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const [, setSuggestions] = useState<string[]>([]);
  const { data: suggestion } = useSuggestionsQuery("");

  const router = useRouter();

  // category state
  const [category, setCategory] = useState<string>("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1); // Reset to first page when search changes
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters]);

  // Generate suggestions based on search input
  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }

    const searchLower = search.toLowerCase();
    const allSuggestions =
      (suggestion?.data as Suggestion[])?.map((s) => s.name) ?? [];

    const filteredSuggestions = allSuggestions
      .filter((item) => item.toLowerCase().includes(searchLower))
      .slice(0, 5); // Limit to 5 suggestions

    setSuggestions(filteredSuggestions);
  }, [search, suggestion]);

  // Build search term for filtering
  const searchTerm = useMemo(() => {
    const terms: string[] = [];
    if (debouncedSearch.trim()) {
      terms.push(debouncedSearch.trim());
    }
    const skillFilters = activeFilters.filter((filter) => filter !== "All");
    if (skillFilters.length > 0) {
      terms.push(...skillFilters);
    }
    return terms.join(" ");
  }, [debouncedSearch, activeFilters]);

  // Fetch consultations from API using search term and page
  const {
    data: myConsultation,
    isLoading,
    error,
  } = useGetConsultationsQuery({
    limit: 10,
    page: currentPage,
    // Make sure this key matches what your endpoint expects:
    title: searchTerm || undefined,
    jobCategorySlug: category || undefined,
  });

  const totalPages = myConsultation?.meta?.totalPage || 1;
  const totalResults = myConsultation?.meta?.total || 0;

  // handle category change
  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
  };

  return (
    <div className="">
      {/* Search */}
      <div className="relative flex items-center gap-2 bg-white rounded-full p-1 lg:p-2 shadow-sm w-full max-w-md lg:max-w-xl border">
        <input
          type="text"
          placeholder="Search work"
          className="flex-1 outline-none px-2 py-2 rounded-lg text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <PrimaryButton
          onClick={() => setDebouncedSearch(search)}
          text="Search"
        />
      </div>

      {/* Category filter */}
      <div className="w-full md:w-64 mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Filter by category
        </label>
        <div className="relative">
          <select
            value={category || ""}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="
              block w-full rounded-xl bg-white
              py-3 pl-4 pr-10 text-sm text-gray-700 font-medium shadow-md
              border border-gray-300
              hover:border-gray-400 transition-all duration-200 ease-in-out
              focus:bg-white focus:border-primary/80 focus:ring-2 focus:ring-primary/80 focus:ring-offset-1
              appearance-none
            "
          >
            <option value="">All</option>
            <option value="clinical">Clinical</option>
            <option value="non-clinical">Non Clinical</option>
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className="h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>

      <WithEmptyState
        data={myConsultation?.data || []}
        emptyStateProps={{
          title: "No Consultations found",
          description: "There are currently no Consultations available.",
        }}
        action={
          <PrimaryButton
            onClick={() => {
              // optionally trigger refetch if you want
            }}
          >
            Refresh Consultations
          </PrimaryButton>
        }
        loading={isLoading}
        error={error as any}
        spinnerSize="lg"
        errorMessage="Failed to fetch Consultation. Please try again later."
        errorTitle="Error Fetching Consultation"
        loadingMessage="Fetching latest Consultation..."
        loadingTitle="Loading Consultation"
      >
        {(data: Consultation[]) => (
          <div className="grid grid-cols-1 lg:grid-cols-2 mt-4 md:mt-6">
            {data.map((doctor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.1 * (index + 1), ease: "easeIn" }}
                className={`border-t lg:odd:border-r ${
                  index >= data.length - 2 ? "border-b" : ""
                }`}
              >
                <ConsultationCard
                  bio={doctor.user?.about?.bio || ""}
                  name={`${doctor.user?.firstName} ${doctor.user?.lastName}`}
                  title={doctor.title}
                  availability={doctor.user?.isOnline as boolean}
                  hourlyRate={doctor.pricing || []}
                  rating={0}
                  skills={doctor.adviceOn}
                  description={doctor.description}
                  imageUrl={doctor.user?.profilePicture || null}
                  onMessage={() =>
                    router.push(`/messaging?user=${doctor.user?.id}`)
                  }
                  onVisitProfile={() => setIsModalOpen(index)}
                />
                <Modal
                  isOpen={isModalOpen === index}
                  onClose={() => setIsModalOpen(null)}
                >
                  <ConsultationModal
                    bio={doctor.user?.about?.bio || ""}
                    name={`${doctor.user?.firstName} ${doctor.user?.lastName}`}
                    title={doctor.title}
                    availability={doctor.user?.isOnline as boolean}
                    hourlyRate={doctor.pricing || []}
                    rating={0}
                    skills={doctor.adviceOn}
                    description={doctor.description}
                    imageUrl={doctor.user?.profilePicture || null}
                    onMessage={() =>
                      router.push(`/messaging?user=${doctor.user?.id}`)
                    }
                    onVisitProfile={() =>
                      router.push(`/experts/${doctor.user?.slug}?con=${doctor.id}`)
                    }
                  />
                </Modal>
              </motion.div>
            ))}
          </div>
        )}
      </WithEmptyState>

      {/* Search Results Info */}
      <div className="mb-4 mt-4 text-center text-sm text-gray-600">
        {searchTerm ? (
          <p>
            Showing {myConsultation?.data?.length || 0} of {totalResults} results
            for {searchTerm}
          </p>
        ) : (
          <p>
            Showing {myConsultation?.data?.length || 0} of {totalResults} consultations
          </p>
        )}
      </div>

      <div className="my-6 md:my-12">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AllConsultation;
