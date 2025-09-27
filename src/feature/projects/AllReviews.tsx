"use client";

import React from "react";
import ReviewCard from "./card/Project-Review";
import { useGetAllMyReviewsQuery } from "@/redux/api/review/reviewApi";
import Loading from "@/components/others/Loading";
import ErrorState from "@/components/others/ErrorState";
import EmptyState from "@/components/others/EmptayState";

const ProjectsReviews = () => {
  const { data: Reviews, isLoading, isError } = useGetAllMyReviewsQuery();

  // Debugging logs
  console.log("isLoading:", isLoading);
  console.log("isError:", isError);
  console.log("Reviews:", Reviews);
  console.log("Reviews.success:", Reviews?.success);
  console.log("Reviews.data:", Reviews?.data);
  console.log("Reviews.data length:", Reviews?.data?.length);

  if (isLoading) {
    return (
      <div>
        <Loading
          title="Loading Reviews"
          message="Fetching all review data..."
        />
      </div>
    );
  }

  if (isError || !Reviews?.success) {
    return (
      <div>
        <ErrorState />
      </div>
    );
  }

  // Handle empty or invalid data
  if (
    !Reviews?.data ||
    !Array.isArray(Reviews.data) ||
    Reviews.data.length === 0
  ) {
    console.log("No reviews to display: Reviews.data is empty or invalid");
    return (
      <div className="flex justify-center items-center h-full">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {Reviews.data.map((review, index) => {
        const project = review.project || {};
        const price = project.budget
          ? parseInt(project.budget.split(" - ")[0]) || 0
          : 0;

        const reviewCardProps = {
          title: project.name || "Unnamed Project",
          rating: review.rating || 0,
          started: review.createdAt
            ? new Date(review.createdAt).toLocaleDateString()
            : "Unknown",
          finished: review.updatedAt
            ? new Date(review.updatedAt).toLocaleDateString()
            : "Unknown",
          testimonial: review.content || "No testimonial provided",

          price: price,
          isPriceFixable: true,
        };

        console.log(`ReviewCard props [${index}]:`, reviewCardProps);

        return (
          <div key={index} className=" p-2">
            <ReviewCard {...reviewCardProps} />
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsReviews;
