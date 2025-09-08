import React, { useContext, useState } from 'react';
import { Icon } from '@iconify/react';
import { ThemeContext } from '@/context/ThemeContext';

const PauseButtonTimer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
 const { theme } = useContext(ThemeContext);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`flex items-center justify-between w-[256px] max-w-md mx-auto  rounded-[11px] px-6 py-[2px] shadow-sm ${theme === "dark" ? "bg-[#262626] " : "text-gray-800 bg-[#F0F0F0]"} `} >
      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="w-[20px] h-[20px] bg-[#FF6B00] hover:bg-[#FF6B00] rounded-full flex items-center justify-center transition-colors duration-200 shadow-md"
      >
        {isPlaying ? (
          <Icon icon="material-symbols:play-arrow" className="w-[18px] h-[18px] text-white ml-1" />
        ) : (
          <Icon icon="material-symbols:pause" className="w-[18px] h-[18px] text-white" />
        )}
      </button>

      {/* Timer Display */}
      <div className="text-2xl font-medium  tabular-nums">
        12:00
      </div>
    </div>
  );
};

export default PauseButtonTimer;