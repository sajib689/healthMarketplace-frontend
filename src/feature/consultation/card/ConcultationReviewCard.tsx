/* eslint-disable @typescript-eslint/no-unused-vars */
import { Star } from "lucide-react";

interface ReviewCardProps {
  title: string;
  rating: number;
  started: string;
  finished: string;
  testimonial: string;
  response?: string;
  price: number;
  isPriceFixable?: boolean;
}

export default function ConsultationReviewCard({
  title,
  rating,
  started,
  finished,
  testimonial,
  response,
  price,
}: ReviewCardProps) {
  return (
    <div className=" border-b border-gray-800 p-6">
      <h2 className="text-lg  text-gray-900 font-semibold">{title}</h2>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
        <span className="text-sm text-gray-600">|</span>
        <span className="text-sm text-gray-600">
          {started} - {finished}
        </span>
      </div>

      <blockquote className="mt-4 text-gray-700">
        &quot;{testimonial}&quot;
      </blockquote>

      <div className="mt-6">
        <p className="text-2xl font-semibold text-gray-900">${price}</p>
        <span className="text-sm text-gray-600">Fixable-price</span>
      </div>
    </div>
  );
}
