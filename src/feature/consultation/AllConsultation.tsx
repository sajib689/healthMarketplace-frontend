/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Pagination from "@/components/shared/pagination/Pagination";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ConsultationCard } from "./card/ConsultationCard";
import ConsultationFilter from "./consultationFilter";
import doctors from "./fakeConcultation";
import { Modal } from "@/components/modal/Modal";
import { ConsultationModal } from "./card/ConsultationModal";
import { useRouter } from "next/navigation";
import { useGetConsultationsQuery } from "@/redux/api/consultation/consultationApi";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import WithEmptyState from "@/components/others/AllState";
import { Consultation } from "@/interfaces/global";
import { Suggestion, useSuggestionsQuery } from "@/redux/api/others/OthersApi";

const healthProjectKeywords = [
  "Patient Tracker",
  "Meal Planning",
  "Physiotherapy Guide",
  "Medication Reminder",
  "Telemedicine",
  "Vitals Monitoring",
  "Symptom Checker",
  "Hospital Sanitation",
  "Healthcare Networking",
  "Sleep Tracker",
];

const AllConsultation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<number | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { data: suggestion } = useSuggestionsQuery("")
  const router = useRouter();

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
    const allSuggestions = [
      ...healthProjectKeywords,
      ...doctors.map((doctor) => doctor.name),
      ...doctors.flatMap((doctor) => doctor.skills),
    ].filter(
      (item, index, self) => self.indexOf(item) === index // Remove duplicates
    );

    const filteredSuggestions = allSuggestions
      .filter((item) => item.toLowerCase().includes(searchLower))
      .slice(0, 5); // Limit to 5 suggestions

    setSuggestions(filteredSuggestions);
  }, [search]);

  // Build search term for filtering
  const searchTerm = useMemo(() => {
    const terms = [];

    // Add text search
    if (debouncedSearch.trim()) {
      terms.push(debouncedSearch.trim());
    }

    // Add active filters (except "All")
    const skillFilters = activeFilters.filter((filter) => filter !== "All");
    if (skillFilters.length > 0) {
      terms.push(...skillFilters);
    }

    return terms.join(" ");
  }, [debouncedSearch, activeFilters]);

  // Filter doctors based on search term
  const filteredDoctors = useMemo(() => {
    if (!searchTerm) return doctors;

    const searchWords = searchTerm.toLowerCase().split(" ");

    return doctors.filter((doctor) => {
      const searchableText = `
                ${doctor.name.toLowerCase()}
                ${doctor.title.toLowerCase()}
                ${doctor.bio.toLowerCase()}
                ${doctor.description.toLowerCase()}
                ${doctor.skills.join(" ").toLowerCase()}
            `;

      return searchWords.every((word) => searchableText.includes(word));
    });
  }, [searchTerm]);

  const toggleFilter = (keyword: string) => {
    setActiveFilters((prev) =>
      prev.includes(keyword)
        ? prev.filter((item) => item !== keyword)
        : [...prev, keyword]
    );
  };

  // const filterCategory = ["All", ...healthProjectKeywords];

  const {
    data: myConsultation,
    isLoading,
    error,
  } = useGetConsultationsQuery({
    limit: 10,
    page: currentPage,
    searchTerm: searchTerm || undefined,
  });

  const totalPages = myConsultation?.meta?.totalPage || 1;

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: string) => {
    setSearch(suggestion);
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="">
      <ConsultationFilter
        search={search}
        setSearch={setSearch}
        activeFilters={activeFilters}
        filterCategory={suggestion?.data as Suggestion[]}
        toggleFilter={toggleFilter}
        suggestions={suggestions}
        onSuggestionSelect={handleSuggestionSelect}
      />
      <WithEmptyState
        data={myConsultation?.data || []}
        emptyStateProps={{
          title: "No Consultations found",
          description: "There are currently no Consultations available.",
        }}
        action={
          <PrimaryButton
            onClick={() => { }}
          // onClick={() => refreshProjects()}
          >
            Refresh Projects
          </PrimaryButton>
        }
        loading={isLoading}
        error={error as any}
        spinnerSize="lg"
        errorMessage=" Failed to fetch Consultation. Please try again later."
        errorTitle="Error Fetching Consultation"
        loadingMessage="Fetching latest Consultation..."
        loadingTitle=" Loading Consultation"
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
                className={`border-t lg:odd:border-r ${index >= filteredDoctors.length - 2 ? "border-b" : ""
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
                {
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
                        router.push(
                          `/experts/${doctor.user?.slug}?con=${doctor.id}`
                        )
                      }
                    />
                  </Modal>
                }
              </motion.div>
            ))}
          </div>
        )}
      </WithEmptyState>

      {/* Search Results Info */}
      <div className="mb-4 mt-4 text-center text-sm text-gray-600">
        {searchTerm && (
          <p>
            Showing {filteredDoctors.length} of {doctors.length} results
            {searchTerm && ` for "${searchTerm}"`}

          </p>
        )}
        {!searchTerm && (
          <p>
            Showing {filteredDoctors.length} of {doctors.length} consultations
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
