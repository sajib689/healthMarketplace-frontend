/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReviewPayload } from '@/redux/api/review/reviewApi';
import { Star } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

const ConfirmModal = ({ setModalState, samplePost, reviewedUserId, projectId, handleCreteReview }: { setModalState: React.Dispatch<React.SetStateAction<string>>, samplePost: any, reviewedUserId: string, projectId: string, handleCreteReview: (payload: ReviewPayload) => void }) => {

    const [rating, setRating] = useState(1)
    const [review, setReview] = useState("")
    const [hoveredStar, setHoveredStar] = useState(0)
    const [error, setError] = useState("")

    const handleSubmit = () => {
        if (!review.trim()) {
            setError("Review is required")
            return;
        }
        setError("")

        const payLoad = {
            reviewedUserId,
            projectId,
            rating,
            content: review
        }
        handleCreteReview(payLoad)
    };

    return (
        <div className='p-4 lg:min-w-[500px]'>
            <h1 className='text-lg mb-2 font-semibold'>Sent Review</h1>
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <Image
                        width={100}
                        height={100}
                        src={samplePost.avatar}
                        alt={samplePost.name}
                        className="w-20 h-20 rounded-full"
                    />
                    <div>
                        <h2 className="font-medium text-gray-900">{samplePost.name}</h2>
                        <h1 className="text-xl font-semibold text-gray-900">{samplePost.title}</h1>
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-normal mt-4 mb-4 text-[#333]">Review</h2>

            {/* Star Rating */}
            <div className="flex gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="focus:outline-none"
                    >
                        <Star
                            className={`w-8 h-8 ${star <= (hoveredStar || rating) ? "fill-[#FF9B42] stroke-[#FF9B42]" : "fill-none stroke-[#FF9B42]"
                                } transition-colors`}
                            strokeWidth={1.5}
                        />
                    </button>
                ))}
            </div>

            {/* Review Text */}
            <div className="mb-6">
                <h3 className="text-base mb-2 text-[#333]">Review by word</h3>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    // placeholder="Best Talented person........."
                    className="w-full min-h-[120px] p-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00BA88] resize-none text-[#333]"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center justify-end gap-4 mt-4">
                <button
                    onClick={() => setModalState("infoModal")}
                    className="w-full sm:w-auto px-6 py-2 bg-gray-300/80 text-black hover:bg-gray-300  font-medium rounded-xl transition-colors"
                >
                    Back
                </button>
                <button
                    onClick={handleSubmit}
                    className="w-full sm:w-auto px-6 py-2 bg-secondary/80 hover:bg-secondary text-white font-medium rounded-xl transition-colors"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default ConfirmModal;
