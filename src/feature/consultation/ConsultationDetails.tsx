/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import banner from "@/assets/consultation/banner.png";
import Loading from "@/components/others/Loading";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import useAuthUser from "@/hooks/useGetMe";
import { useCreateBookingMutation } from "@/redux/api/booking/bookingApi";
import {
  useGetConsultationByIdQuery,
  useCheckBookingAvailabilityMutation // NEW IMPORT
} from "@/redux/api/consultation/consultationApi";
import { useCreatePaymentBookingMutation } from "@/redux/api/payment/paymentApi";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react"; // Added useEffect

interface PricingOption {
  duration: number; // in minutes
  price: number;
}

interface AvailabilitySlot {
  id: string;
  consultationId: string;
  dayOfWeek: string;
  isAvailable: boolean;
  timeSlots: {
    startTime: string;
    endTime: string;
  }[];
}

interface TimeSlot {
  startTime: string;
  endTime: string;
}

export default function ConsultationDetailsPage() {
  const path = usePathname();
  const id = path.split("/")[2];

  const [selectedOption, setSelectedOption] = useState<PricingOption | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]); // NEW STATE
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false); // NEW STATE
    const { user } = useAuthUser();

  const router = useRouter();

  const handleOptionSelect = (option: PricingOption) => {
    if (option.duration < 30) {
      setValidationError("Minimum consultation duration is 30 minutes");
      return;
    }

    setSelectedOption(option);
    setSelectedTime(null); // Reset time when duration changes
    setValidationError(null);

    // Check availability when option is selected and date is already selected
    if (selectedDate) {
      checkAvailability(selectedDate, option.duration);
    }
  };

  const { data } = useGetConsultationByIdQuery(id);
  const consultationData = data?.data;
  const [createBooking] = useCreateBookingMutation();
  const [makeBookingPayment, { isLoading: isBooking }] = useCreatePaymentBookingMutation();
  const [checkAvailabilityApi] = useCheckBookingAvailabilityMutation(); // NEW HOOK

  // NEW FUNCTION: Check availability
  const checkAvailability = async (date: Date, duration: number) => {
    if (!id) return;

    setIsCheckingAvailability(true);
    try {
      // Format date as YYYY-MM-DD
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      const result = await checkAvailabilityApi({
        consultationId: id,
        date: formattedDate,
        durationInMinutes: duration
      }).unwrap();

      if (result.success) {
        setAvailableTimeSlots(result.data);
      }
    } catch (error) {
      console.error("Failed to check availability:", error);
      setAvailableTimeSlots([]);
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  // Get available dates for the next 30 days based on dayOfWeek availability
  const getAvailableDates = () => {
    if (!consultationData?.available) return [];

    const availableDays = consultationData.available
      .filter((slot: AvailabilitySlot) => slot.isAvailable)
      .map((slot: AvailabilitySlot) => slot.dayOfWeek);

    const dates = [];
    const today = new Date();

    // Get dates for the next 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);

      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

      // Only include dates that match available days
      if (availableDays.includes(dayOfWeek)) {
        dates.push(date);
      }
    }

    return dates.slice(0, 14); // Show only next 14 available dates for UI purposes
  };

  // Generate time slots from API response
  const generateTimeSlotsFromApi = () => {
    if (!availableTimeSlots.length) return [];

    return availableTimeSlots.map(slot => slot.startTime);
  };

  const availableDates = getAvailableDates();
  const timeSlots = generateTimeSlotsFromApi(); // UPDATED: Use API response

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
    setValidationError(null);
    setAvailableTimeSlots([]); // Reset time slots

    // Check availability when date is selected and option is already selected
    if (selectedOption) {
      checkAvailability(date, selectedOption.duration);
    }
  };

  const handleTimeSelect = (time: string) => {
    if (!selectedDate) {
      setValidationError("Please select a date first");
      return;
    }
    if (!selectedOption) {
      setValidationError("Please select a duration first");
      return;
    }

    setSelectedTime(time);
    setValidationError(null);
  };

  // NEW: Auto-check availability when both date and option are selected
  useEffect(() => {
    if (selectedDate && selectedOption) {
      checkAvailability(selectedDate, selectedOption.duration);
    }
  }, [selectedDate, selectedOption]); // Removed checkAvailability from dependencies

  if (!consultationData) {
    return <Loading title="Fetching Consultation Data" />;
  }

  const handleBooking = async () => {
    if (!id) {
      setValidationError("Cannot find consultation ID");
    } else if (!selectedDate) {
      setValidationError("Please select a date");
    } else if (!selectedTime) {
      setValidationError("Please select a time");
    } else if (!selectedOption) {
      setValidationError("Please select a pricing option");
    } else {
      // Format date as YYYY-MM-DD
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      try {
        const res = await createBooking({
          consultationId: id,
          date: formattedDate,
          startTime: selectedTime,
          durationInMinutes: selectedOption.duration,
        });

        if (res.data?.success) {
          let bookingId: string;

          // Extract booking ID based on response structure
          if ("id" in res.data.data) {
            bookingId = res.data.data.id;
          } else if (Array.isArray(res.data.data)) {
            bookingId = res.data.data[0].id;
          } else if ("booking" in res.data.data) {
            bookingId = res.data.data.booking.id;
          } else {
            throw new Error("Invalid booking data structure");
          }

          const response = await makeBookingPayment({ bookingId: bookingId });
          if (response.data?.data.clientSecret) {
            router.push(
              `/make-payment?clientSecret=${response.data?.data.clientSecret}`
            );
          }
        }
      } catch (error) {
        setValidationError("Failed to create booking. Please try again.");
        console.log(error)
      }
    }
  };

  return (
    <div className="container section-gap flex flex-col md:flex-row gap-8">
      {/* Left Section */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">
          {consultationData.title} by {consultationData?.user?.firstName}{" "}
          {consultationData?.user?.lastName}
        </h1>

        <h2 className="text-lg font-medium mb-2">Consultation Description</h2>
        <p className="mb-4 text-sm">{consultationData.description}</p>

        {consultationData.adviceOn && consultationData.adviceOn.length > 0 && (
          <>
            <p className="mb-4 text-sm font-medium">Advice On:</p>
            <ul className="mb-4 list-disc list-inside">
              {consultationData.adviceOn.map((topic: string, index: number) => (
                <li key={index} className="text-sm">
                  {topic}
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-6">
          {consultationData.image ? (
            <Image
              src={consultationData.image}
              alt={consultationData.title}
              width={320}
              height={180}
              className="rounded-md"
            />
          ) : (
            <Image
              src={banner}
              alt={consultationData.title}
              width={320}
              height={180}
              className="rounded-md"
            />
          )}
        </div>
      </div>

      {/* Right Section - Booking Card */}
      <div className="w-full md:w-[420px] border shadow-lg rounded-lg p-4 flex flex-col relative">
        <div className="w-full mb-4">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-primary text-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center">
                  <Calendar className="mr-2" size={20} />
                  Book Consultation
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Price Selection */}
              {consultationData.pricing && consultationData.pricing.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Select Duration & Price</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {consultationData.pricing.map((option, idx) => (
                      <div
                        key={idx}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedOption?.duration === option.duration
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:bg-gray-50"
                          }`}
                        onClick={() => handleOptionSelect(option)}
                      >
                        <div className="flex justify-between items-center">
                          <span>{option.duration} minutes</span>
                          <span className="font-semibold">${option.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Date Selection - Only show available dates */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Select Available Date</h3>
                {availableDates.length > 0 ? (
                  <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                    {availableDates.map((date, index) => (
                      <div
                        key={index}
                        className={`w-full p-3 flex items-center justify-between rounded-lg cursor-pointer border ${selectedDate?.toDateString() === date.toDateString()
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:bg-gray-50"
                          }`}
                        onClick={() => handleDateSelect(date)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-sm font-medium">
                            {date.toLocaleDateString('en-US', { weekday: 'long' })}
                          </div>
                          <div className="text-lg font-bold">
                            {date.getDate()}
                          </div>
                          <div className="text-sm">
                            {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No available dates found</p>
                )}
              </div>

              {/* Time Selection - Show loading or available slots */}
              {selectedDate && selectedOption && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">
                    Select Time ({selectedDate.toLocaleDateString()})
                  </h3>

                  {isCheckingAvailability ? (
                    <div className="text-center py-4">
                      <Loading title="Checking availability..." />
                    </div>
                  ) : timeSlots.length > 0 ? (
                    <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                      {timeSlots.map((time, index) => (
                        <div
                          key={index}
                          className={`w-full p-3 border rounded-lg text-center cursor-pointer ${selectedTime === time
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:bg-gray-50"
                            }`}
                          onClick={() => handleTimeSelect(time)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{time}</span>
                            <span className="text-sm text-gray-500">
                              {selectedOption.duration} min slot
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No available time slots for selected date</p>
                  )}
                </div>
              )}

              {selectedDate && !selectedOption && (
                <div className="mb-6">
                  <p className="text-gray-500 text-sm">Please select a duration first to see available times</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Booking Button */}
        <div className="mt-auto space-y-2">
          <PrimaryButton
            loading={isBooking}
            onClick={() => {
              if(user) {
                handleBooking()
              } else {
                              router.push("/signIn")

              }
            }}
          // disabled={!selectedOption || !selectedDate || !selectedTime || isCheckingAvailability}
          >
            Book Now
            {selectedOption &&
              ` - ${selectedOption.price} for ${selectedOption.duration} min`
            }
          </PrimaryButton>

          {validationError && (
            <p className="text-red-500 text-sm text-center">*{validationError}</p>
          )}
        </div>
      </div>
    </div>
  );
}