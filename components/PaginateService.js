import { ThemeContext } from "@/context/ThemeContext";
import { Icon } from "@iconify/react";
import React, { useContext } from "react";

const PaginationService = ({ pagination, setPage }) => {
  if (!pagination) return null; // wait until we have pagination
  const { theme } = useContext(ThemeContext);

  const { currentPage, totalPages } = pagination;

  const handlePrev = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setPage(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center gap-2 my-3">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-3 py-1 border-0 bg-transparent rounded disabled:opacity-50"
      >
        <Icon
          icon="ooui:next-rtl"
          className={`w-6 cursor-pointer rounded-full h-6 bg-[#FF6B00] p-2 ${theme === "dark" ? "text-white" : "text-[#000]"
            }`}
          width={15}
          height={15}
        />
      </button>

      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx}
          onClick={() => setPage(idx + 1)}
          className={`
    px-3 py-1 rounded
    ${currentPage === idx + 1
              ? theme === "dark"
                ? "bg-[#FF6B00] text-white"    // active page in dark mode
                : "bg-[#FF6B00] text-[#ffffff]" // active page in light mode
              : "bg-gray-200 text-black dark:text-white" // inactive buttons
            }
  `}
        >
          {idx + 1}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border-0 bg-transparent rounded disabled:opacity-50"
      >

        <Icon icon="ooui:next-ltr" className={`w-6 cursor-pointer rounded-full h-6 bg-[#FF6B00] p-2 ${theme === "dark" ? "text-white" : "text-[#000]"
          }`}
        />
      </button>
    </div>
  );
};

export default PaginationService;
