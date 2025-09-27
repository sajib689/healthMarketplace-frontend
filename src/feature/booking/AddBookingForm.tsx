import { Dispatch, SetStateAction } from "react";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// Generate 24-hour format time options in 30-minute intervals
const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time24 = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      times.push({ value: time24, label: time24 });
    }
  }
  return times;
};

const TIME_OPTIONS = generateTimeOptions();

type DaySchedule = {
  enabled: boolean;
  startTime: string;
  endTime: string;
};

function AddBookingForm({
  schedule,
  setSchedule,
}: {
  schedule: Record<string, DaySchedule>;
  setSchedule: Dispatch<SetStateAction<Record<string, DaySchedule>>>;
}) {
  const toggleDay = (day: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled,
        startTime: prev[day].startTime || "09:00",
        endTime: prev[day].endTime || "17:00",
      },
    }));
  };

  const updateTime = (
    day: string,
    field: "startTime" | "endTime",
    value: string
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const validateTimeRange = (startTime: string, endTime: string) => {
    return startTime < endTime;
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Weekly hours
        </h2>

        <div className="space-y-4">
          {DAYS.map((day) => (
            <div key={day} className="flex justify-center items-start">
              <div className="flex items-center w-20 my-auto">
                <input
                  type="checkbox"
                  id={`day-${day}`}
                  checked={schedule[day]?.enabled || false}
                  onChange={() => toggleDay(day)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor={`day-${day}`}
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  {day}
                </label>
              </div>

              {schedule[day]?.enabled ? (
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="flex items-center space-x-2">
                      <select
                        value={schedule[day].startTime || "09:00"}
                        onChange={(e) =>
                          updateTime(day, "startTime", e.target.value)
                        }
                        className={`px-3 py-2 border rounded-md text-sm w-32 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                          !validateTimeRange(
                            schedule[day].startTime,
                            schedule[day].endTime
                          )
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        }`}
                      >
                        {TIME_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>

                      <span className="text-gray-500 font-medium">to</span>

                      <select
                        value={schedule[day].endTime || "17:00"}
                        onChange={(e) =>
                          updateTime(day, "endTime", e.target.value)
                        }
                        className={`px-3 py-2 border rounded-md text-sm w-32 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                          !validateTimeRange(
                            schedule[day].startTime,
                            schedule[day].endTime
                          )
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        }`}
                      >
                        {TIME_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="px-2">(EST)</p>
                    {!validateTimeRange(
                      schedule[day].startTime,
                      schedule[day].endTime
                    ) && (
                      <span className="ml-2 text-xs text-red-500 px-3 py-2">
                        End time must be after start time
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex-1 ml-2 text-sm text-gray-500 py-2">
                  Unavailable
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddBookingForm;