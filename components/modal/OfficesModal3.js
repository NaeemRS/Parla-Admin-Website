import { useState, useContext, useRef } from "react";
import { Icon } from "@iconify/react";
import { ThemeContext } from "@/context/ThemeContext";

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export default function OfficesModal3({ onSave }) {
  const { theme } = useContext(ThemeContext);

  const [rentedFrom, setRentedFrom] = useState("");
  const [contractPerson, setContractPerson] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("active");
  const [pictures, setPictures] = useState([]);
  const fileInputRef = useRef(null);
  const [employee, setEmployee] = useState("");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Calculate how many more pictures can be added
    const remainingSlots = 4 - pictures.length;

    if (remainingSlots <= 0) {
      alert("Maximum 4 pictures allowed");
      return;
    }

    // Take only the number of files that fit within the limit
    const filesToAdd = files.slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      alert(`Only ${remainingSlots} more picture(s) can be added. Maximum limit is 4.`);
    }

    const newFiles = filesToAdd.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setPictures((prev) => [...prev, ...newFiles]);

    // Clear the input value so same files can be selected again if needed
    e.target.value = '';
  };

  const handleRemovePicture = (index) => {
    setPictures((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      // Revoke the URL to prevent memory leaks
      URL.revokeObjectURL(prev[index].url);
      return updated;
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    onSave?.({
      rentedFrom,
      contractPerson,
      contact,
      status,
      pictures,
      employee,
    });
  };

  // ✅ Form validation: saare fields fill + kam az kam 1 picture
  const isFormValid =
    rentedFrom.trim() !== "" &&
    contractPerson.trim() !== "" &&
    contact.trim() !== "" &&
    status.trim() !== "" &&
    pictures.length > 0;

  return (
    <form onSubmit={handleSave} className="space-y-4 overflow-y-auto">
      {/* Rented From */}
      <div>
        <label
          htmlFor="rentedFrom"
          className={`block text-sm mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
        >
          Rented from
        </label>
        <input
          id="rentedFrom"
          type="text"
          placeholder="Company or individual name lastname"
          value={rentedFrom}
          onChange={(e) => setRentedFrom(e.target.value)}
          className={`w-full text-xl rounded-full py-2.5 px-3 mt-1 focus:outline-none ${theme === "dark"
              ? "bg-[#2A2A2A] text-white"
              : "bg-[#E5E5E5] text-[#161616]"
            }`}
        />
      </div>

      {/* Contract Person */}
      <div>
        <label
          htmlFor="contractPerson"
          className={`block text-sm mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
        >
          Contract person
        </label>
        <input
          id="contractPerson"
          type="text"
          placeholder="Name lastname"
          value={contractPerson}
          onChange={(e) => setContractPerson(e.target.value)}
          className={`w-full text-xl rounded-full py-2.5 px-3 mt-1 focus:outline-none ${theme === "dark"
              ? "bg-[#2A2A2A] text-white"
              : "bg-[#E5E5E5] text-[#161616]"
            }`}
        />
      </div>
      <div>
        <label
          htmlFor="employee"
          className={`block text-sm mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
        >
          Number Of Employee
        </label>
        <input
          id="employee"
          type="text"
          maxLength={4}
          inputMode="numeric"
          placeholder="Enter Number Of Employee"
          value={employee}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*$/.test(val)) setEmployee(val); // ✅ sirf numbers allow
          }}
          className={`w-full text-xl rounded-full py-2.5 px-3 mt-1 focus:outline-none ${theme === "dark"
              ? "bg-[#2A2A2A] text-white"
              : "bg-[#E5E5E5] text-[#161616]"
            }`}
        />
      </div>

      {/* Contact */}
      <div>
        <label
          htmlFor="contact"
          className={`block text-sm mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
        >
          Contact
        </label>
        <input
          id="contact"
          type="text"
          maxLength={15}
          inputMode="numeric"
          placeholder="Phone number"
          value={contact}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*$/.test(val)) setContact(val); // ✅ sirf numbers allow
          }}
          className={`w-full text-xl rounded-full py-2.5 px-3 mt-1 focus:outline-none ${theme === "dark"
              ? "bg-[#2A2A2A] text-white"
              : "bg-[#E5E5E5] text-[#161616]"
            }`}
        />
      </div>

      {/* Status */}
      <div>
        <label
          htmlFor="status"
          className={`block text-sm mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
        >
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={`w-full text-xl rounded-full py-2.5 px-3 mt-1 focus:outline-none ${theme === "dark"
              ? "bg-[#2A2A2A] text-white"
              : "bg-[#E5E5E5] text-[#161616]"
            }`}
        >
          {statusOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Pictures */}
      <div>
        <label
          className={`block text-sm mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
        >
          Pictures ({pictures.length}/4)
        </label>
        <div className="flex flex-wrap gap-3">
          {pictures.map((pic, i) => (
            <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden">
              <img
                src={pic.url}
                alt={`preview-${i}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemovePicture(i)}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
              >
                <Icon icon="heroicons:x-mark" className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Add Picture Button - only show if less than 4 pictures */}
          {pictures.length < 4 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-[#FF6B00] rounded-lg text-[#FF6B00]"
            >
              <Icon icon="heroicons:plus" className="w-6 h-6" />
              <span className="text-xs mt-1">Add picture</span>
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full text-base font-medium py-3 rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${isFormValid
              ? "bg-[#FF6B00] text-white hover:bg-[#e55a00] focus:ring-[#FF6B00]"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
        >
          Save
        </button>
      </div>
    </form>
  );
}