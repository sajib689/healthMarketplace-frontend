import consultationImage from "@/assets/consultation/consultation.png";
import Image from "next/image";
import { Tag } from "./Tag";
import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

// Assuming these types are globally available
interface Session {
  id: string;
  consultationId: string;
  bookingId: string;
  zoomMeetingId: string | null;
  zoomJoinUrl: string | null;
  startTime: string;
  endTime: string;
  isReminder: boolean;
  createdAt: string;
  updatedAt: string;
  booking: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      profilePicture: string;
      email: string;
    };
  };
  consultation: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      profilePicture: string;
      email: string;
    };
    title: string;
  };
}

interface Pricing {
  price: number;
  duration: string;
}

interface Available {
  dayOfWeek: string;
  timeSlots: { startTime: string; endTime: string }[];
}

export default function ConsultationBook({
  title,
  fee,
  services,
  timeSlots,
  history,
  booking,
  image,
  today,
  handleDelete,
  sessionData,
}: {
  image: string | null;
  title: string;
  today?: string;
  fee: Pricing[];
  services: string[];
  timeSlots?: Available[];
  history: boolean;
  booking?: boolean;
  handleDelete?: () => void;
  sessionData?: Session;
}) {
  const [showJoinButton, setShowJoinButton] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (sessionData && booking) {
      const now = new Date();
      const startTime = new Date(sessionData.startTime);
      const fifteenMinutesBefore = new Date(startTime.getTime() - 15 * 60000);

      setShowJoinButton(now >= fifteenMinutesBefore && now < startTime);
    }
  }, [sessionData, booking]);

  // Handle Join Now click
  const handleJoinNow = () => {
    if (sessionData?.zoomJoinUrl) {
      window.open(sessionData.zoomJoinUrl, "_blank");
      setMessage("");
    } else {
      setMessage(
        "No Zoom link available yet. Please contact support for assistance."
      );
    }
  };

  return (
    <div className="border-b">
      <div className="bg-white rounded-xl shadow-sm py-6 relative">
        {handleDelete && (
          <button
            onClick={handleDelete}
            className="absolute top-4 right-4 text-red-600 hover:underline text-sm"
          >
            <Trash2 className="w-6 h-6 hover:text-warning" />
          </button>
        )}

        <div className="flex lg:flex-row flex-col lg:items-center justify-between gap-6">
          {/* Left Column */}
          <div className="relative flex flex-col md:flex-row lg:items-center gap-6">
            <Image
              width={200}
              height={170}
              src={image || consultationImage}
              alt={`image of ${title}`}
              className="object-contain h-36 lg:h-56 rounded-lg"
            />
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>

              <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                <div className="flex flex-col gap-2 text-gray-600">
                  {fee?.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 512 117"
                      >
                        <path
                          fill="#0b5cff"
                          d="M107.472 114.706H16.348c-5.968 0-11.791-3.203-14.557-8.589C-1.41 99.858-.247 92.434 4.702 87.63L68.17 24.164H22.607C10.088 24.164.044 13.974.044 1.6h83.992c5.968 0 11.79 3.203 14.556 8.589c3.203 6.259 2.038 13.683-2.911 18.486L32.214 92.143h52.55c12.518 0 22.708 10.19 22.708 22.563M468.183 0c-13.1 0-24.746 5.677-32.898 14.702C427.134 5.677 415.488 0 402.388 0c-24.164 0-43.961 20.67-43.961 44.834v69.872c12.518 0 22.562-10.19 22.562-22.563V44.689c0-11.646 9.025-21.544 20.67-21.98c12.228-.437 22.272 9.315 22.272 21.397v48.037c0 12.519 10.19 22.563 22.563 22.563V44.543c0-11.645 9.025-21.544 20.67-21.98c12.228-.437 22.272 9.316 22.272 21.398v48.036c0 12.52 10.19 22.563 22.563 22.563V44.69C512.144 20.67 492.347 0 468.183 0M221.595 58.226c0 32.17-26.056 58.226-58.226 58.226s-58.226-26.056-58.226-58.226S131.199 0 163.369 0s58.226 26.056 58.226 58.226m-22.563 0c0-19.651-16.012-35.663-35.663-35.663s-35.664 16.012-35.664 35.663c0 19.652 16.013 35.664 35.664 35.664s35.663-16.012 35.663-35.664m148.04 0c0 32.17-26.056 58.226-58.226 58.226S230.62 90.396 230.62 58.226S256.676 0 288.846 0s58.227 26.056 58.227 58.226m-22.562 0c0-19.651-16.012-35.663-35.664-35.663c-19.65 0-35.663 16.012-35.663 35.663c0 19.652 16.012 35.664 35.663 35.664c19.652 0 35.664-16.012 35.664-35.664"
                        />
                      </svg>
                      <span className="text-sm">
                        ${item.price} / {item.duration}min meeting
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {services.map((service, index) => (
                  <Tag key={index} name={service} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          {history && (
            <div className="space-y-4">
              <div className="flex flex-wrap lg:grid grid-cols-3 items-center gap-3">
                {timeSlots
                  ?.filter((d) => d.dayOfWeek === today)
                  ?.map((time, index) =>
                    time.timeSlots.map((slot, i) => (
                      <Tag
                        key={`${index}-${i}`}
                        name={`${slot.startTime} - ${slot.endTime}`}
                      />
                    ))
                  )}
              </div>
            </div>
          )}

          {booking && sessionData && (
            <div className="space-y-4">
              <button
                onClick={handleJoinNow}
                disabled={!showJoinButton}
                className={`px-4 py-2 rounded ${
                  showJoinButton
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "px-8 py-3 rounded-full bg-primary/20 text-gray-500"
                }`}
                style={{ cursor: showJoinButton ? "pointer" : "not-allowed" }}
              >
                Join Now
              </button>
              {message && (
                <p className="text-yellow-600 text-sm mt-2">{message}</p>
              )}
              {!showJoinButton && (
                <p className="text-gray-500 text-sm mt-2">
                  Join available 15 minutes before session.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
