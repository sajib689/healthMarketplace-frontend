/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import userPlaceholder from "@/assets/placeholder/user.jpg";
import { Modal } from "@/components/modal/Modal";
import WithEmptyState from "@/components/others/AllState";
import Pagination from "@/components/shared/pagination/Pagination";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import useAuthUser from "@/hooks/useGetMe";
import { Project } from "@/interfaces/global";
import { useToggleFavoriteMutation } from "@/redux/api/favourite/favApi";
import { Suggestion, useSuggestionsQuery } from "@/redux/api/others/OthersApi";
import { useGetAllProjectsQuery } from "@/redux/api/projects/projectApi";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { BidNowModal } from "./BidNowModal";
import { ProjectsCard } from "./card/ProjectsCard";
import ProjectsFilter from "./ProjectsFilter";

const AllProjects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const { data: suggestions } = useSuggestionsQuery("")
  const id = searchParams.get("ids") || "";
  const { user } = useAuthUser();
  console.log(suggestions)
  // Use debounced search to avoid too many API calls
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1); // Reset to first page when search changes
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Reset to first page when filters change



  // Build search term for API
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

  const {
    data: projects,
    isLoading,
    error,
  } = useGetAllProjectsQuery({
    limit: 10,
    page: currentPage,
    searchTerm: searchTerm || undefined,
  });


  useEffect(() => {
    if (id) {
      const projectExists = projects?.data.some(d => d.id === id);

      if (!projectExists) {
        setCurrentPage(2);
      }
    } else {
      setCurrentPage(1);
    }
  }, [activeFilters, id]);


  const toggleFilter = (keyword: string) => {
    setActiveFilters((prev) => {
      if (keyword === "All") {
        return []; // Clear all filters when "All" is selected
      }

      return prev.includes(keyword)
        ? prev.filter((item) => item !== keyword)
        : [...prev, keyword];
    });
  };

  // const filterCategory = ["All", ...healthcareSkillSuggestions];

  // Calculate total pages from API response
  const totalPages = projects?.meta?.totalPage || 1;
  const totalProjects = projects?.meta?.total || 0;

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [toggleFavorite] = useToggleFavoriteMutation();

  const handleToggleFavorite = async (
    itemId: string,
    itemType: "JOB" | "PROJECT"
  ) => {
    try {
      const res = await toggleFavorite({ itemId, itemType }).unwrap();
      if (res.success) {
        toast.success("Project added to favorites!");
      } else {
        toast.error("Failed to add project to favorites.");
      }
      // Handle success
    } catch (error) {
      console.error("Error adding favorite:", error);
      toast.error("Failed to add project to favorites.");
    }
  };



  return (
    <div className="">
      <ProjectsFilter
        search={search}
        setSearch={setSearch}
        activeFilters={activeFilters}
        filterCategory={suggestions?.data as Suggestion[]}
        toggleFilter={toggleFilter}
      />

      <WithEmptyState
        data={projects?.data || []}
        emptyStateProps={{
          title: "No projects found",
          description: "There are currently no projects available.",
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
        errorMessage=" Failed to fetch projects. Please try again later."
        errorTitle="Error Fetching Projects"
        loadingMessage="Fetching latest projects..."
        loadingTitle=" Loading Projects"
      >
        {(data: Project[]) => (
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {data.map((post: Project, index: number) => (
              <motion.div
                key={`${post.id || index}-${currentPage}`} // Use unique key with page
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className={`border-t lg:odd:border-r ${index >= data.length - 2 ? "border-b" : ""
                  }`}
              >
                <div className={`${id === post.id ? "border " : ""} border-primary `}>
                  <ProjectsCard
                    isOpen={isModalOpen === index}
                    onOpen={() => setIsModalOpen(index)}
                    onClose={() => setIsModalOpen(null)}
                    className=""
                    name={post.user?.firstName + " " + post.user?.lastName}
                    avatar={
                      (post.user?.profilePicture as string) || userPlaceholder.src
                    }
                    title={post.name}
                    postedTime={post.createdAt}
                    tags={post.skills}
                    budget={post.budget}
                    priceType={post.priceType}
                    deadline={post.deadline}
                    description={post.goal}
                    id={post.userId === user?.id}
                    projectId={post.id}
                    isFavorite={post.isFavorite}
                    favorite={!(post.userId === user?.id)}
                    handleToggleFavorite={handleToggleFavorite}
                    isBid={post.isBid}
                  />
                </div>

                <Modal
                  isOpen={isModalOpen === index}
                  onClose={() => setIsModalOpen(null)}
                >
                  <BidNowModal
                    className="md:min-w-[500px]  min-w-[calc(100vw-30px)]"
                    name={post.user?.firstName + " " + post.user?.lastName}
                    avatar={post.user?.profilePicture as string}
                    title={post.name}
                    postedTime={post.createdAt}
                    tags={post.skills}
                    budget={post.budget}
                    priceType={post.priceType}
                    deadline={post.deadline}
                    description={post.goal}
                    scopeWork={post.scopeOfWork as string}
                    onClose={() => setIsModalOpen(null)}
                    id={post.userId === user?.id}
                    projectId={post.id}
                    isFavorite={post.isFavorite}
                    favorite={!(post.userId === user?.id)}
                    handleToggleFavorite={handleToggleFavorite}
                  />
                </Modal>
              </motion.div>
            ))}
          </div>
        )}
      </WithEmptyState>
      {/* Search Results Info */}
      <div className="mb-4 mt-4 text-center text-sm text-gray-600">
        {searchTerm && (
          <p>
            Showing {projects?.data?.length || 0} of {totalProjects} results
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        )}
        {!searchTerm && (
          <p>
            Showing {projects?.data?.length || 0} of {totalProjects} projects
          </p>
        )}
      </div>
      {/* Pagination */}
      {projects?.data && projects.data.length > 0 && totalPages > 1 && (
        <div className="my-6 md:my-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default AllProjects;
