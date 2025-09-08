import { useState, useContext, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import StepProgressBar from "./StepProgressBar";
import { ThemeContext } from "@/context/ThemeContext";

const ChooseDateModal = ({ isOpen, onClose, onSave, dateData }) => {
    const { theme } = useContext(ThemeContext);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedSlot(null); // reset slot when date changes
    };

    const formatSelectedDate = (date) => {
        if (!date) return "";
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            day: "2-digit",
            month: "long",
        });
    };

    // ✅ Extract available dates
    const availableDates = useMemo(() => {
        // if (!dateData?.availableSlots) return [];
        return dateData[0]?.availableSlots?.map((item) => item.date); // array of "YYYY-MM-DD"
    }, [dateData]);

    // ✅ Find slots for the selected date
    // const availableSlotsForDate = useMemo(() => {
    //     // if (!dateData?.availableSlots) return [];
    //     const formattedDate = selectedDate.toLocaleDateString("en-CA"); 
    //     const daySlots = dateData[0]?.availableSlots?.find((item) => item.date === formattedDate);
    //        console.log(daySlots)
    //     return daySlots?.slots || [];
    // }, [selectedDate, dateData]);

    const availableSlotsForDate = useMemo(() => {
        if (!dateData[0]?.availableSlots) return [];

        // format selected date
        const formattedDate = selectedDate.toLocaleDateString("en-CA"); // YYYY-MM-DD
        const dayName = selectedDate.toLocaleDateString("en-US", { weekday: "long" }); // e.g. "Thursday"

        // 1. Try to match exact date first
        const daySlots = dateData[0].availableSlots.find((item) => item.date === formattedDate);

        // 2. If no exact match, fall back to day-of-week slots
        if (daySlots) return daySlots.slots;

        const weekdaySlots = dateData[0].availableSlots.find((item) => item.day === dayName);
        return weekdaySlots?.slots || [];
    }, [selectedDate, dateData]);


    if (!isOpen) return null;

    // console.log(dateData)
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99] p-4">
            <div
                className={`rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col
          ${theme === "dark" ? "bg-[#1F1F1F] text-white" : "bg-white text-gray-900"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 pb-4">
                    <div className="flex items-center gap-3">
                        <ArrowLeft
                            className={`w-6 h-6 cursor-pointer ${theme === "dark" ? "text-gray-200" : "text-gray-700"
                                }`}
                            onClick={onClose}
                        />
                        <h1 className="text-lg font-semibold">Choose a date</h1>
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                        {dateData?.firstName} {dateData?.lastName}
                    </span>
                </div>

                {/* Calendar */}
                <div className="px-6">
                    <Calendar
                        className={`react-calendar w-full ${theme === "dark" ? "calendar-dark" : "calendar-light"
                            }`}
                        onChange={handleDateChange}
                        value={selectedDate}
                        showNavigation={true}
                        locale="en-US"
                        // ✅ Highlight available days
                        tileClassName={({ date }) => {
                            const formatted = date.toLocaleDateString("en-CA"); // "YYYY-MM-DD" in local time
                            if (availableDates.includes(formatted)) {
                                return "available-day";
                            }
                            return null;
                        }}
                    />

                    <style jsx global>{`
            .react-calendar {
              width: 100% !important;
              max-width: none !important;
              border: none;
              font-family: inherit;
            }

            /* Selected date */
            .react-calendar__tile--active {
              background: #ff6b00 !important;
              color: #fff !important;
              border-radius: 9999px;
            }

            /* Hover effect */
            .react-calendar__tile:hover {
              background: #ff6b00 !important;
              color: #fff !important;
              border-radius: 9999px;
            }

            /* ✅ Dark mode overrides */
            .calendar-dark {
              background-color: #262626;
              color: #f9fafb;
              border-radius: 12px;
              padding: 8px;
            }

            .react-calendar__tile--now {
              background: #ffff76 !important;
            }

            .calendar-dark .react-calendar__tile {
              color: #f9fafb !important;
            }

            .calendar-dark .react-calendar__month-view__weekdays {
              color: #9ca3af !important;
            }

            /* ✅ Highlight available days */
            .available-day {
              background: #ffedd5 !important; /* light orange */
              color: #ff6b00 !important;
              border-radius: 9999px;
              font-weight: 600;
            }

            .available-day:hover {
              background: #ff6b00 !important;
              color: #fff !important;
            }
          `}</style>

                    {/* Selected Date */}
                    <div className="text-center mb-4 mt-4">
                        <div className="text-lg font-semibold">{formatSelectedDate(selectedDate)}</div>
                    </div>

                    {/* Slots */}
                    {/* Slots */}
                    <div className="flex flex-col justify-center gap-3 max-h-40 overflow-y-auto mb-6">
                        {availableSlotsForDate.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {availableSlotsForDate.map((slot, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedSlot(slot)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium border transition
                                            ${selectedSlot === slot
                                                ? "bg-orange-500 text-white border-orange-500"
                                                : theme === "dark"
                                                    ? "bg-[#2e2e2e] text-gray-200 border-gray-700 hover:bg-gray-700"
                                                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                                            }`}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 col-span-3">
                                No slots available for this date
                            </p>
                        )}

                    </div>

                </div>

                {/* Step Progress Bar + Save */}
                <div className="px-6 pb-6 flex justify-between items-center">
                    <StepProgressBar currentStep={4} />

                    <button
                        disabled={!selectedSlot}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedSlot
                                ? "bg-orange-500 text-white hover:bg-orange-600"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        onClick={() => onSave(selectedDate, selectedSlot)}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChooseDateModal;
