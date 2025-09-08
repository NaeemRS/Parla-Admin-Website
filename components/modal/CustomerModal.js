import React, { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import toast, { Toaster } from "react-hot-toast";
import StepProgressBar from "./StepProgressBar";
import { ThemeContext } from "@/context/ThemeContext"; // ✅ import theme context

const CustomerModal = ({
  isOpen,
  onClose,
  customers,
  handleGetCustomers,
  onBack,
  handleStepContinue,
}) => {
  const { theme } = useContext(ThemeContext); // ✅ Get theme
  const [customerId, setCustomerId] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [startIndex, setStartIndex] = useState(0);

  if (!isOpen) return null;

  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const lettersPerPage = 10;
  const currentLetters = alphabet.slice(startIndex, startIndex + lettersPerPage);

  // Define continueDisabled based on whether a customer is selected
  const continueDisabled = !customerId;

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - lettersPerPage);
    }
  };

  const handleNext = () => {
    if (startIndex + lettersPerPage < alphabet.length) {
      setStartIndex((prev) => prev + lettersPerPage);
    }
  };

  const handleContinue = () => {
    if (!customerId) {
      toast.error("Please select the customer");
      return;
    }
    localStorage.setItem("customerId", customerId)
    handleStepContinue(customerId);
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99] p-4">
        <div
          className={`rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col
            ${theme === "dark" ? "bg-[#1F1F1F] text-white" : "bg-white text-gray-900"}`}
        >
          {/* Header */}
          <div
            className={`flex items-center gap-4 p-6 border-b 
              ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
          >
            <button
              onClick={() => {
                onClose();
                localStorage.removeItem("booking");
              }}
              className={`p-2 rounded-full transition-colors
    ${theme === "dark" ? "hover:bg-[#2A2A2A]" : "hover:bg-gray-100"}`}
            >
              <Icon
                icon="heroicons:arrow-left"
                className={`w-6 h-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
              />
            </button>
            <h2 className="text-xl font-semibold">Choose a customer</h2>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Customer Tab */}
            <div className="px-6 pt-4">
              <div className="inline-block">
                <span className="text-orange-500 font-medium text-lg border-b-2 border-orange-500 pb-2">
                  Customer
                </span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="px-6 py-4">
              <div className="relative">
                <Icon
                  icon="heroicons:magnifying-glass"
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 
                    ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                />
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => handleGetCustomers(null, e.target.value)}
                  className={`w-full rounded-full pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-orange-500
                    ${theme === "dark"
                      ? "bg-[#2A2A2A]  text-white placeholder-gray-400"
                      : "bg-gray-100 text-gray-900 placeholder-gray-500"}`}
                />
              </div>
            </div>

            {/* Alphabet Filter */}
            <div className="px-6 pb-4">
              <div className="flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={handlePrev}
                  disabled={startIndex === 0}
                  className={`p-2 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50
                    ${theme === "dark" ? "hover:bg-[#2A2A2A] " : "hover:bg-gray-100"}`}
                >
                  <Icon
                    icon="heroicons:chevron-left"
                    className={`w-4 h-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                  />
                </button>

                {currentLetters.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => {
                      setSelectedLetter(letter);
                      handleGetCustomers(letter, null);
                    }}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors cursor-pointer
                      ${selectedLetter === letter
                        ? "bg-orange-500 text-white"
                        : theme === "dark"
                          ? "border border-gray-700 text-gray-200 hover:bg-[#2A2A2A] "
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    {letter}
                  </button>
                ))}

                <button
                  onClick={handleNext}
                  disabled={startIndex + lettersPerPage >= alphabet.length}
                  className={`p-2 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50
                    ${theme === "dark" ? "hover:bg-[#2A2A2A] " : "hover:bg-gray-100"}`}
                >
                  <Icon
                    icon="heroicons:chevron-right"
                    className={`w-4 h-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                  />
                </button>
              </div>
            </div>

            {/* Customer List */}
            <div className="flex-1 overflow-y-auto px-6 mb-4">
              <div className="space-y-2">
                {customers?.map((customer, index) => (
                  <div
                    key={index}
                    onClick={() => setCustomerId(customer?._id)}
                    className={`flex items-center justify-between outline-0 mt-1 text-xl rounded-[22px] px-4 py-2 w-full transition-colors cursor-pointer
                      ${customerId === customer?._id
                        ? "bg-orange-500 text-white"
                        : theme === "dark"
                          ? "bg-[#2A2A2A]  text-gray-200"
                          : "bg-[#E5E5E5] text-gray-800"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-medium">{customer.firstName}</span>
                      <span>{customer.lastName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        className={`p-2 rounded-full transition-colors 
                          ${theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-300"}`}
                      >
                        <Icon
                          icon="heroicons:phone"
                          className={`w-5 h-5 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                        />
                      </button>
                      <button
                        className={`p-2 rounded-full transition-colors 
                          ${theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-300"}`}
                      >
                        <Icon
                          icon="heroicons:arrow-right"
                          className={`w-5 h-5 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer with Step Progress */}
          <div className="p-6 border-t border-gray-200 flex items-center justify-between">
            <StepProgressBar currentStep={1} />
            <button
              onClick={handleContinue}
              disabled={continueDisabled}
              className={`px-8 py-2 rounded-full font-medium transition-colors ${
                continueDisabled
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              Continue 
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerModal;