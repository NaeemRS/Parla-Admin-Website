import { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import StepProgressBar from "./StepProgressBar";
import { ThemeContext } from "@/context/ThemeContext"; // 👈 import your theme context

const ProfessionalModal = ({ isOpen, onClose, professionals, onContinue, employeedId, handleContinueProfessional, handleEmployeeSelect }) => {
  // define rating + totalReviews (these could come from props or API)
  const ratingsData = [
    { rating: 5.0, totalReviews: 100 },
    { rating: 4.3, totalReviews: 87 },
    { rating: 3.5, totalReviews: 42 },
    { rating: 2.7, totalReviews: 18 },
    { rating: 1.0, totalReviews: 5 },
  ];
  const [selectedPro, setSelectedPro] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const { theme } = useContext(ThemeContext); // 👈 get theme
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  if (!isOpen) return null;

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };


  return (
      <div className={`fixed inset-0 flex items-center justify-center z-[999]  ${theme === "dark" ? "bg-black/40 text-white" : "bg-black/40 text-gray-900"}`}>
      <div
        className={`rounded-2xl shadow-xl w-full max-w-3xl max-h-[95vh] flex flex-col transition-colors
            ${theme === "dark" ? "bg-[#1F1F1F] text-white" : "bg-white text-gray-900"}`}
      >
        {/* Header */}
        <div
          className={`flex items-center gap-4 px-6 py-4 border-b transition-colors
            ${theme === "dark" ? "border-gray-700" : "border-gray-200"}
          `}
        >
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition 
              ${theme === "dark" ? "hover:bg-[#262626]" : "hover:bg-gray-100"}
            `}
          >
            <Icon
              icon="heroicons:arrow-left"
              className={`w-6 h-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            />
          </button>
          <h2 className="text-xl font-semibold">Choose a professional</h2>
        </div>

        {/* Professionals Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {professionals?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {professionals.map((pro, idx) => {
                // pick a rating from static list (loop if more professionals)
                const ratingInfo = ratingsData[idx % ratingsData.length];
                const rating = ratingInfo.rating;
                const totalReviews = ratingInfo.totalReviews;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (pro?.isAvailableToday) {
                        handleEmployeeSelect(pro._id);
                      }
                    }}
                    className={`relative border rounded-2xl p-6 flex flex-col items-center text-center transition-all
    ${employeedId === pro._id
                        ? "border-orange-500 shadow-md ring-2 ring-orange-200"
                        : theme === "dark"
                          ? "border-gray-700 bg-[#262626] hover:border-gray-600 hover:shadow-lg"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg"
                      }
    ${!pro?.isAvailableToday ? "pointer-events-none opacity-50" : "cursor-pointer"}
  `}
                  >
                    {/* Avatar */}
                    <div className="relative mb-4">
                      <img
                        src={pro.image}
                        alt={pro.image}
                        className="w-24 h-24 rounded-full border border-gray-300 object-cover"
                      />
                    </div>

                    {/* Info */}
                    <h3 className="text-lg font-semibold mb-1">{`${pro?.firstName} ${pro?.lastName}`}</h3>
                    <p className="text-sm mb-1 text-gray-500 dark:text-gray-400">
                      {pro?.isAvailableToday ? "Available Today" : "Not Available"}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center justify-center gap-1 mb-3">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Icon
                          key={i}
                          icon="heroicons:star-solid"
                          className={`w-4 h-4 ${i < Math.floor(rating)
                            ? "text-yellow-400"
                            : i < rating
                              ? "text-yellow-300"
                              : "text-gray-300 dark:text-gray-600"
                            }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        {rating.toFixed(1)} ({totalReviews})
                      </span>
                    </div>
                  </div>

                );
              })}

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <Icon
                icon="heroicons:user-group"
                className={`w-16 h-16 mb-4 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}
              />
              <p className={`text-xl mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                No professionals available
              </p>
              <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                Please try again later
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`p-6 border-t flex w-full justify-between transition-colors
            ${theme === "dark" ? "border-gray-700" : "border-gray-200"}
          `}
        >
          <StepProgressBar currentStep={3} />
          <button
            onClick={handleContinueProfessional}
            disabled={!employeedId}
            className={`px-6 py-2 h-[50px] rounded-lg font-medium transition-colors 
              ${employeedId
                ? "bg-orange-500 text-white hover:bg-orange-600 "
                : theme === "dark"
                  ? "bg-gray-700 text-gray-500"
                  : "bg-gray-300 text-gray-500"
              }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalModal;
