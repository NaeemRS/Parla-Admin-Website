import { useContext, useRef } from "react";
import { Icon } from "@iconify/react";
import { ThemeContext } from '@/context/ThemeContext';

const durationOptions = [
  { value: "05 years", label: "5 years" },
  { value: "10 years", label: "10 years" },
  { value: "15 years", label: "15 years" },
  { value: "20 years", label: "20 years" }
];

const depositOptions = [
  { value: "05 years", label: "5 years" },
  { value: "10 years", label: "10 years" },
  { value: "no_deposit", label: "No deposit" }
];

export default function OfficesModal2({ formData, setFormData, onNext }) {
  const { theme } = useContext(ThemeContext);
  const fileInputRef = useRef(null);
  const today = new Date().toISOString().split("T")[0];

  // ✅ Parent state update helper
  const handleInput = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // ✅ File remove
  // ✅ File remove
const handleRemoveContract = () => {
  setFormData((prev) => ({
    ...prev,
    contract: "",
    contractFile: null,
    contractPreview: null,
  }));
  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};


  // ✅ File select
  const handleAddDocument = (e) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  // ✅ File change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "application/pdf", // PDF
        "application/msword", // DOC
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
        "text/plain", // TXT
        "image/jpeg", // JPG
        "image/png",  // PNG
        "image/gif",  // GIF
        "image/webp", // WEBP
      ];

      if (!allowedTypes.includes(file.type)) {
        alert("Please upload a PDF, DOC, DOCX, TXT, or image file.");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB.");
        return;
      }

      // Agar image hai to preview ke liye object URL bana lo
      const filePreview = file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null;

      // ✅ Store file, fileName, and optional preview
      setFormData({
        ...formData,
        contract: file.name,
        contractFile: file,
        contractPreview: filePreview, // (for images only)
      });
    }
  };


  // ✅ Only allow numbers in price
  const handlePriceChange = (e) => {
    const val = e.target.value;
    if (/^\d*\.?\d*$/.test(val)) {
      handleInput("price", val);
    }
  };

  // ✅ Validation
  const isValid =
    formData.contract &&
    formData.contractDate &&
    formData.startDate &&
    formData.duration &&
    formData.endDate &&
    formData.deposit &&
    formData.price;

  return (
    <form className="space-y-3 overflow-y-auto">
      {/* GPS Coordinates */}
      {/* <div>
        <label
          htmlFor="gpsCoordinates"
          className={`block text-sm mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
        >
          GPS Coordinates
        </label>
        <div className="relative">
          <input
            id="gpsCoordinates"
            type="text"
            placeholder="Enter GPS coordinates"
            value={formData.gpsCoordinates || ""}
            onChange={(e) => handleInput("gpsCoordinates", e.target.value)}
            className={`w-full appearance-none focus:outline-0 text-xl rounded-full py-2.5 px-3 mt-1 pr-10 ${
              theme === "dark" ? "bg-[#2A2A2A] text-white" : "bg-[#E5E5E5] text-[#161616]"
            }`}
          />
        </div>
      </div> */}

      {/* Contract */}
      <div>
        <label
          htmlFor="contract"
          className={`block text-sm mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
        >
          Contract
        </label>
        <input
          ref={fileInputRef}
          id="contract"
          type="file"
          accept=".pdf,.doc,.docx,.txt,image"
          onChange={handleFileChange}
          className="hidden"
        />
        {formData.contract ? (
          <div
            className={`flex items-center justify-between text-xl rounded-full py-2.5 px-3 mt-1 pr-10 ${theme === "dark" ? "bg-[#2A2A2A] text-white" : "bg-[#E5E5E5] text-[#161616]"
              }`}
          >
            <div className="flex items-center gap-2">
              {formData.contractPreview ? (
                <img
                  src={formData.contractPreview}
                  alt="Preview"
                  className="w-8 h-8 rounded object-cover"
                />
              ) : (
                <Icon icon="heroicons:document-text" className="w-4 h-4" />
              )}
              <span className="text-sm truncate" title={formData.contract}>
                {formData.contract.length > 50
                  ? `${formData.contract.substring(0, 50)}...`
                  : formData.contract}
              </span>
            </div>
            <button
              type="button"
              onClick={handleRemoveContract}
              className={`flex-shrink-0 ml-2 ${theme === "dark"
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-700"
                } transition-colors`}
            >
              <Icon icon="heroicons:x-mark" className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAddDocument}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 border-dashed border-[#FF6B00] text-[#FF6B00] text-sm hover:bg-[#FF6B00]/5 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-[#FF6B00] flex items-center justify-center">
              <Icon icon="heroicons:document" className="w-4 h-4 text-white" />
            </div>
            Add document
          </button>
        )}
      </div>

      {/* Start Date */}
      <div>
        <label
          htmlFor="startDate"
          className={`block text-sm mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
        >
          Start Date
        </label>
        <input
          id="startDate"
          type="date"
          min={today} // 🚀 Prevents past date
          placeholder="Select start date"
          value={formData.startDate || ""}
          onChange={(e) => handleInput("startDate", e.target.value)}
          className={`w-full appearance-none focus:outline-0 text-xl rounded-full py-2.5 px-3 mt-1 pr-10 ${theme === "dark" ? "bg-[#2A2A2A] text-white" : "bg-[#E5E5E5] text-[#161616]"
            }`}
        />
      </div>

      {/* Contract Date */}
      <div>
        <label
          htmlFor="contractDate"
          className={`block text-sm mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
        >
          Contract Date
        </label>
        <input
          id="contractDate"
          type="date"
          min={today}
          placeholder="Select contract date"
          value={formData.contractDate || ""}
          onChange={(e) => handleInput("contractDate", e.target.value)}
          className={`w-full appearance-none focus:outline-0 text-xl rounded-full py-2.5 px-3 mt-1 pr-10 ${theme === "dark" ? "bg-[#2A2A2A] text-white" : "bg-[#E5E5E5] text-[#161616]"
            }`}
        />
      </div>

      {/* Duration */}
      <div>
        <label
          htmlFor="duration"
          className={`block text-sm mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
        >
          Duration
        </label>
        <div className="relative">
          <select
            id="duration"
            value={formData.duration || ""}
            onChange={(e) => handleInput("duration", e.target.value)}
            className={`w-full appearance-none focus:outline-0 text-xl rounded-full py-2.5 px-3 mt-1 pr-10 ${theme === "dark" ? "bg-[#2A2A2A] text-white" : "bg-[#E5E5E5] text-[#161616]"
              }`}
          >
            <option value="" disabled>
              Select duration
            </option>
            {durationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Icon
            icon="heroicons:chevron-down"
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none ${theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
          />
        </div>
      </div>

      {/* End Date */}
      <div>
        <label
          htmlFor="endDate"
          className={`block text-sm mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
        >
          End Date
        </label>
        <input
          id="endDate"
          type="date"
          min={today}
          placeholder="Select end date"
          value={formData.endDate || ""}
          onChange={(e) => handleInput("endDate", e.target.value)}
          className={`w-full appearance-none focus:outline-0 text-xl rounded-full py-2.5 px-3 mt-1 pr-10 ${theme === "dark" ? "bg-[#2A2A2A] text-white" : "bg-[#E5E5E5] text-[#161616]"
            }`}
        />
      </div>

      {/* Deposit */}
      <div>
        <label
          htmlFor="deposit"
          className={`block text-sm mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
        >
          Deposit
        </label>
        <div className="relative">
          <select
            id="deposit"
            value={formData.deposit || ""}
            onChange={(e) => handleInput("deposit", e.target.value)}
            className={`w-full appearance-none focus:outline-0 text-xl rounded-full py-2.5 px-3 mt-1 pr-10 ${theme === "dark" ? "bg-[#2A2A2A] text-white" : "bg-[#E5E5E5] text-[#161616]"
              }`}
          >
            <option value="" disabled>
              Select deposit
            </option>
            {depositOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            <span
              className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
            >
              TL
            </span>
            <Icon
              icon="heroicons:chevron-down"
              className={`w-4 h-4 pointer-events-none ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
            />
          </div>
        </div>
      </div>

      {/* Price */}
      <div>
        <label
          htmlFor="price"
          className={`block text-sm mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
        >
          Price
        </label>
        <div className="relative">
          <input
            id="price"
            type="text"
            maxLength={20}
            placeholder="Enter price"
            value={formData.price || ""}
            onChange={handlePriceChange}
            className={`w-full appearance-none focus:outline-0 text-xl rounded-full py-2.5 px-3 mt-1 pr-10 ${theme === "dark" ? "bg-[#2A2A2A] text-white" : "bg-[#E5E5E5] text-[#161616]"
              }`}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            <span
              className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
            >
              TL
            </span>
          </div>
        </div>
      </div>

      {/* Next button */}
      <div className="mt-8">
        <button
          type="button"
          onClick={onNext}
          disabled={!isValid}
          className={`w-full text-lg font-semibold py-3 rounded-lg ${isValid
              ? "bg-[#FF6B00] text-white"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
        >
          Next
        </button>
      </div>
    </form>
  );
}
