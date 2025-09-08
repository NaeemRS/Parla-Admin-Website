"use client";
import { Icon } from "@iconify/react";
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    monday.setDate(today.getDate() - daysFromMonday);
    setCurrentWeekStart(monday);
    setSelectedDate(today);
  }, []);

  const generateDates = () => {
    const dates = [];
    const days = ["Mo", "Tu", "Wed", "Th", "Fr", "Sat", "Su"];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + i);

      dates.push({
        date,
        day: days[i],
        dayNumber: date.getDate(),
        isToday: date.toDateString() === today.toDateString(),
        isSelected: date.toDateString() === selectedDate.toDateString(),
      });
    }
    return dates;
  };

  const dates = generateDates();

  const handleDateClick = (date) => setSelectedDate(date);

  const handlePrevious = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(newWeekStart);
  };

  const handleNext = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newWeekStart);
  };

  return (
    <div className="w-full 2xl:mt-0 mt-4">
      {/* Main Controls */}
      <div className="flex items-center justify-between gap-2 md:gap-3 lg:gap-8 flex-wrap md:flex-nowrap">
        {/* Prev + Next (mobile) */}
        <div className="flex gap-2 justify-between md:w-auto w-full lg:gap-4">
          <button
            onClick={handlePrevious}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors
              ${theme === "dark"
                ? "text-orange-400 bg-[#262626]"
                : "text-orange-500 bg-[#F2F2F2]"
              }`}
          >
            <Icon icon="octicon:chevron-left" width="20" height="20" />
          </button>

          {/* Mobile Next */}
          <button
            onClick={handleNext}
            className={`w-8 h-8 md:hidden flex items-center justify-center rounded-full transition-colors
              ${theme === "dark"
                ? "text-orange-400 bg-[#262626]"
                : "text-orange-500 bg-[#F2F2F2]"
              }`}
          >
            <Icon icon="octicon:chevron-right" width="20" height="20" />
          </button>
        </div>

        {/* Dates */}
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="flex items-center justify-around   py-2">
            {dates.map((dateItem, index) => (
              <button
                key={index}
                onClick={() => handleDateClick(dateItem.date)}
                className={`relative flex flex-col items-center justify-center cursor-pointer
    w-[11.5%] lg:w-[10%] aspect-square
    rounded-full
    transition-all duration-200 shrink-0
          ${dateItem.isSelected
                    ? "bg-[#FF6B00] text-white"
                    : dateItem.isToday
                      ? theme === "dark"
                        ? "bg-gray-600 text-white"
                        : "bg-[#FF6B00] text-white"
                      : theme === "dark"
                        ? "text-gray-300 bg-[#262626] hover:bg-[#333333]"
                        : "text-gray-600 bg-[#EEEEEE] hover:bg-gray-200"
                  }`}
              >
                <span className="sm:text-base 2xl:text-xl md:text-lg text-base font-semibold">
                  {dateItem.dayNumber}
                </span>
                <span className="text-xs sm:text-sm xl:text-lg font-normal">
                  {dateItem.day}
                </span>
                {dateItem.isToday && !dateItem.isSelected && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
        {/* Next (desktop) */}
        <button
          onClick={handleNext}
          className={`w-8 h-8 hidden md:flex items-center justify-center rounded-full transition-colors
            ${theme === "dark"
              ? "text-orange-400 bg-[#262626]"
              : "text-orange-500 bg-[#F2F2F2]"
            }`}
        >
          <Icon icon="octicon:chevron-right" width="20" height="20" />
        </button>
      </div>

      {/* Expand Month Control */}
      <div className="w-full block mt-3">
        <div className="flex justify-center gap-6">
          <button
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors
              ${theme === "dark"
                ? "text-orange-400 bg-[#262626]"
                : "text-orange-500 bg-[#F2F2F2]"
              }`}
          >
            <Icon icon="octicon:chevron-down" width="20" height="20" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
