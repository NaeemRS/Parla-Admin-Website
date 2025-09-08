import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const DateNavigator = ({
  initialDate = new Date(),
  onDateChange = () => {},
  dateFormat = 'en-GB', // 'en-GB' for DD.MM.YYYY, 'en-US' for MM/DD/YYYY
  showDateInfo = true,
  className = '',
  disabled = false,
  minDate = null,
  maxDate = null,
  theme = 'default' // 'default', 'blue', 'green', 'purple'
}) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [showCalendar, setShowCalendar] = useState(false);

  // Update parent component when date changes
  useEffect(() => {
    onDateChange(selectedDate);
  }, [selectedDate, onDateChange]);

  // Theme configurations
  const themes = {
    default: {
      primary: 'bg-blue-500 hover:bg-blue-600',
      primaryText: 'text-white',
      border: 'border-blue-200',
      hover: 'hover:bg-gray-100',
     },
  
  };

  const currentTheme = themes[theme] || themes.default;

  const formatDate = (date) => {
    return date.toLocaleDateString(dateFormat, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const navigateDate = (direction) => {
    if (disabled) return;
    
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction);
    
    // Check date boundaries
    if (minDate && newDate < minDate) return;
    if (maxDate && newDate > maxDate) return;
    
    setSelectedDate(newDate);
  };

  const openDatePicker = () => {
    if (disabled) return;
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date) => {
    if (disabled) return;
    
    // Check date boundaries
    if (minDate && date < minDate) return;
    if (maxDate && date > maxDate) return;
    
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayWeekday = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isDateDisabled = (date) => {
    if (!date) return true;
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  return (
    <div className={`bg-[#EEEEEE] rounded-full p-3 min-w-[280px] relative ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="flex items-center justify-between bg-transparent  ">
        {/* Left Arrow */}
        <button 
          onClick={() => navigateDate(-1)}
          disabled={disabled || (minDate && new Date(selectedDate.getTime() - 86400000) < minDate)}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Date Display */}
        <div className="flex-1 text-center">
          <span className="text-lg font-medium text-gray-700">
            {formatDate(selectedDate)}
          </span>
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => navigateDate(1)}
          disabled={disabled || (maxDate && new Date(selectedDate.getTime() + 86400000) > maxDate)}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={20} />
        </button>

        {/* Calendar Icon */}
        <button 
          onClick={openDatePicker}
          disabled={disabled}
          className={`ml-2 p-2 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
            showCalendar 
              ? `${currentTheme.primary} ${currentTheme.primaryText}` 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
          }`}
        >
          <Calendar size={20} />
        </button>
      </div>
      
      {/* Calendar Popup */}
      {showCalendar && !disabled && (
        <div className={`absolute top-full left-0 right-0 mt-2   bg-[#ffffff]    border-2 ${currentTheme.border} rounded-lg shadow-xl p-4 z-10`}>
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => navigateMonth(-1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronLeft size={16} />
            </button>
            
            <h3 className="font-semibold text-gray-800">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            
            <button 
              onClick={() => navigateMonth(1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          
          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="p-2 text-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays().map((day, index) => (
              <button
                key={index}
                onClick={() => day && !isDateDisabled(day) && handleDateSelect(day)}
                disabled={isDateDisabled(day)}
                className={`p-2 text-sm rounded transition-colors ${
                  day && day.toDateString() === selectedDate.toDateString() 
                    ? currentTheme.selected
                    : day && !isDateDisabled(day)
                      ? `text-gray-700 ${currentTheme.hover}` 
                      : 'text-gray-300 cursor-not-allowed'
                }`}
              >
                {day ? day.getDate() : ''}
              </button>
            ))}
          </div>
          
          {/* Close Calendar Button */}
          <button 
            onClick={() => setShowCalendar(false)}
            className="mt-4 w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            Close Calendar
          </button>
        </div>
      )}

      
    </div>
  );
};

export default DateNavigator