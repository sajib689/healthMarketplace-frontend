import { BookmarkIcon } from "lucide-react";
import Image from "next/image";
import { Tag } from "./Tag";

interface BidProps {
    name: string;
    id?: string;
    avatar: string;
    title: string;
    postedTime: string;
    tags?: { name: string }[];
    priceMin: number;
    priceMax: number;
    priceType: string;
    deadline: string;
    description?: string;
    className: string;
    scopeWork?: string;
    pending?: boolean;
    location: string,
    availability: boolean,
    hourlyRate: number,
    rating: number
}


type CloseModal = {
    onAggrement: () => void
}
export const SeeBid = ({
    name,
    avatar,
    title,
    postedTime,
    tags,
    priceMin,
    priceMax,
    priceType,
    deadline,
    description,
    className,
    scopeWork,
    onAggrement,
    id,
    location,
    availability,
    hourlyRate,
    rating
}: BidProps & CloseModal) => {
    return (
        <div className={`w-full bg-white border-gray-200 p-3 space-y-4 ${className}`}>
            {/* Header with avatar and bookmark */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <Image
                        width={40}
                        height={40}
                        src={avatar}
                        alt={name}
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <h2 className="font-medium text-gray-900">{name}</h2>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-500">
                    <BookmarkIcon className="w-6 h-6 hover:text-secondary" />
                </button>
            </div>

            {/* Title */}
            <div>
                <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                <p className="text-sm text-gray-500 mt-1">Posted {postedTime}</p>
            </div>

            {/* Tags */}
            <div>
                <div className="flex flex-wrap gap-2 border-y py-4">
                    {tags?.map((tag, index) => (
                        <Tag key={index} name={tag.name} />
                    ))}
                </div>

                {/* Price and Deadline */}
                <div className="grid grid-cols-2 gap-4 border-b py-4">
                    <div>
                        <h3 className="md:text-xl lg:text-lg text-sm font-semibold">
                            ${priceMin} - ${priceMax}/hr
                        </h3>
                        <p className="text-sm text-gray-500">{priceType}</p>
                    </div>
                    <div>
                        <h3 className="md:text-xl lg:text-lg text-sm font-semibold">Deadline</h3>
                        <p className="text-sm text-gray-500">{deadline}</p>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <p className="text-gray-600  max-w-lg">
                    <span className="my-1 font-bold">
                        Project Goal
                    </span>
                    <br />
                    {description}
                </p>
            </div>
            <div className="space-y-2 border-y py-2">
                <p className="text-gray-600  max-w-lg">
                    <span className="my-1 font-bold">
                        Scope Of Work
                    </span>
                    <br />
                    {scopeWork}
                </p>
            </div>
            {/* Header with avatar and bookmark */}
            <h1 className="font-semibold text-black">Bid Request</h1>
            <div className="flex flex-col gap-2 items-start justify-between">
                <div className="flex items-center gap-3">
                    <Image
                        width={100}
                        height={100}
                        src={avatar}
                        alt={name}
                        className="w-20 h-20 rounded-full"
                    />
                    <div>
                        <p className="pr-1 border-r flex items-center gap-1 mb-3">
                            <span
                                className={`${availability ? "bg-green-600" : "bg-gray-400"
                                    } w-2 h-2 rounded-full p-[3px]`}
                            />
                            <span
                                className={availability ? "text-green-600" : "text-gray-400"}
                            >
                                {availability ? "Available Now" : "Offline"}
                            </span>
                        </p>
                        <h2 className="font-medium text-gray-900">{name}</h2>
                        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                        <div className="text-sm text-gray-500 mt-1 flex flex-wrap items-center gap-2">
                            <p className="pr-2 border-r">{location}</p>
                        </div>
                        <div className="text-sm text-gray-500 mt-1 flex flex-wrap items-center gap-2">
                            <p className="pr-1 border-r">${hourlyRate} / Hour</p>
                            <p className="pr-1">{rating} out of 5</p>
                        </div>
                    </div>
                </div>
                {
                    id && <button onClick={onAggrement} className="w-full sm:w-auto px-6 py-2 bg-primary/80 hover:bg-primary text-white font-medium rounded-xl transition-colors">
                        Make Agreement
                    </button>
                }

            </div>

        </div>
    );
};
