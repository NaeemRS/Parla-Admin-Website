import { ThemeContext } from "@/context/ThemeContext";
import { Icon } from "@iconify/react";
import { useContext, useState, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import StepProgressBar from "./StepProgressBar";
import PaginationService from "../PaginateService";

const ServiceModal = ({
  isOpen,
  services,
  setActiveFilter,
  activeFilter,
  activeCategory,
  setActiveCategory,
  handleServiceSelect,
  handleContinue,
  servicescloseModal,
  paginationService,
  setPage,

}) => {
  const { theme } = useContext(ThemeContext);
  const [selectedService, setSelectedService] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Filter services based on search query - moved before early return
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return services || [];

    return (services || []).filter(service =>
      service.serviceName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.price?.toString().includes(searchQuery) ||
      service.serviceMints?.toString().includes(searchQuery)
    );
  }, [services, searchQuery]);

  if (!isOpen) return null;

  const handleSelect = (service) => {
    setSelectedService(service);
    handleServiceSelect(service);
  };

  // Toggle search bar
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery(""); // Clear search when closing
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99] p-4">
        <div
          className={`rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] min-h-[80vh] flex flex-col
            ${theme === "dark" ? "bg-[#1F1F1F] text-white" : "bg-white text-gray-900"}`}
        >
          {/* Header */}
          <div className={`border-b ${theme === "dark" ? "border-[#262626]" : "border-gray-200"}`}>
            <div className="flex items-center gap-4 p-6">
              <button
                onClick={servicescloseModal}
                className={`p-2 rounded-full transition-colors ${theme === "dark"
                    ? "hover:bg-[#262626]"
                    : "hover:bg-[#E2E2E2]"
                  }`}
              >
                <Icon
                  icon="heroicons:arrow-left"
                  className={`w-6 h-6 ${theme === "dark" ? "text-gray-300" : "text-[#565656]"}`}
                />
              </button>

              <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                Choose a service
              </h2>

              <div className="ml-auto">
                <button
                  onClick={toggleSearch}
                  className={`p-2 rounded-full transition-colors ${theme === "dark"
                      ? "hover:bg-[#262626]"
                      : "hover:bg-[#E2E2E2]"
                    } ${showSearch ? "bg-[#FF6B00] text-white" : ""}`}
                >
                  <Icon
                    icon={showSearch ? "heroicons:x-mark" : "heroicons:magnifying-glass"}
                    className={`w-6 h-6 ${showSearch
                        ? "text-white"
                        : theme === "dark"
                          ? "text-gray-300"
                          : "text-[#565656]"
                      }`}
                  />
                </button>
              </div>
            </div>

            {/* Search Bar */}
            {showSearch && (
              <div className="px-6 pb-4">
                <div className="relative">
                  <Icon
                    icon="heroicons:magnifying-glass"
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === "dark" ? "text-gray-400" : "text-gray-400"
                      }`}
                  />
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B00] ${theme === "dark"
                        ? "bg-[#262626] border-[#404040] text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${theme === "dark"
                          ? "hover:bg-[#404040] text-gray-400 hover:text-white"
                          : "hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                        }`}
                    >
                      <Icon icon="heroicons:x-mark" className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Search Results Count */}
                {searchQuery && (
                  <div className={`mt-2 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Filters - Only show when not searching */}
          {!showSearch && (
            <div className={`flex gap-3 px-6 max-h-[70px] min-h-[70px] border-b items-center justify-between overflow-x-auto ${theme === "dark" ? "border-[#262626]" : "border-gray-200"
              }`}>
              {["Popular", "Mars ♂", "Venus ♀"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setPage(1);
                    setActiveFilter(filter === "Mars ♂" ? "male" : filter === "Venus ♀" ? "female" : "popular");
                    setActiveCategory("");
                  }}
                  className={`px-4 py-2 rounded-full text-sm h-[40px] font-medium transition-colors ${activeFilter === filter
                      ? "bg-[#FF6B00] text-white"
                      : theme === "dark"
                        ? "bg-[#262626] text-gray-200 hover:bg-[#333333]"
                        : "bg-[#E2E2E2] text-[#565656] hover:bg-gray-300"
                    }`}
                >
                  {filter === "Popular" ? "Popular" : filter === "Mars ♂" ? "Mars ♂" : "Venus ♀"}
                </button>
              ))}

              {["hair", "beauty", "massage"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setPage(1);
                    setActiveCategory(filter);
                    setActiveFilter("");
                  }}
                  className={`px-4 py-2 rounded-full h-[40px] text-sm font-medium transition-colors ${activeCategory === filter
                      ? "bg-[#FF6B00] text-white"
                      : theme === "dark"
                        ? "bg-[#262626] text-gray-200 hover:bg-[#333333]"
                        : "bg-[#E2E2E2] text-[#565656] hover:bg-gray-300"
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
              {showSearch ? (searchQuery ? `Search: "${searchQuery}"` : "Search Services") : activeFilter}
            </h3>

            {/* No Results Message */}
            {filteredServices.length === 0 && searchQuery && (
              <div className={`text-center py-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                <Icon icon="heroicons:magnifying-glass" className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-lg font-medium mb-1">No services found</p>
                <p className="text-sm">Try adjusting your search terms</p>
              </div>
            )}

            {/* Services List */}
            <div className="space-y-4">
              {filteredServices.map((service, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(service)}
                  className={`flex items-center cursor-pointer justify-between p-3 rounded-lg transition-all duration-200 ${selectedService === service
                      ? "bg-[#FF6B00] text-white border-2 border-[#FF6B00] shadow-lg"
                      : theme === "dark"
                        ? "bg-[#262626] hover:bg-[#333333] border border-transparent hover:border-[#404040]"
                        : "bg-gray-100 hover:bg-gray-200 border border-transparent hover:border-gray-300"
                    }`}
                >
                  <div className="flex-1">
                    <h4 className={`font-medium ${selectedService === service
                        ? "text-white"
                        : theme === "dark"
                          ? "text-white"
                          : "text-gray-900"
                      }`}>
                      {service.serviceName}
                    </h4>
                    <p className={`text-sm mt-1 ${selectedService === service
                        ? "text-gray-100"
                        : theme === "dark"
                          ? "text-gray-300"
                          : "text-gray-500"
                      }`}>
                      {service.serviceMints} mins
                    </p>
                  </div>

                  <span className={`px-3 py-1 rounded-lg font-medium ${selectedService === service
                      ? "bg-white text-[#FF6B00]"
                      : theme === "dark"
                        ? "border border-[#FF6B00] text-[#FF6B00] bg-transparent"
                        : "border border-[#FF6B00] text-[#FF6B00] bg-transparent"
                    }`}>
                    {service.price} TL
                  </span>
                </div>
              ))}
            </div>
          </div>
          <PaginationService pagination={paginationService} setPage={setPage} />
          {/* Footer */}
          <div className={`p-6 border-t flex w-full justify-between ${theme === "dark" ? "border-[#262626]" : "border-gray-200"
            }`}>
            <StepProgressBar currentStep={2} />
            <button
              onClick={handleContinue}
              disabled={!selectedService}
              className={`px-6 py-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed ${selectedService
                  ? "bg-[#FF6B00] text-white hover:bg-[#E55A00]"
                  : theme === "dark"
                    ? "bg-[#404040] text-gray-500"
                    : "bg-gray-300 text-gray-500"
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

export default ServiceModal;