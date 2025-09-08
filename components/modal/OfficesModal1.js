import { ThemeContext } from "@/context/ThemeContext";
import { useContext, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Country } from "country-state-city"; // ✅ Correct package
import Select from "react-select"; // ✅ react-select
import SelectField from "../common/SelectField ";
 
export default function OfficesModal1({ formData, setFormData, onNext }) {
  const { theme } = useContext(ThemeContext);
  const [countries, setCountries] = useState([]);

  // Load countries once
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    const formatted = allCountries.map((c) => ({
      value: c.name,
      label: c.name,
      latitude: parseFloat(c.latitude),
      longitude: parseFloat(c.longitude),
    }));
    setCountries(formatted);
  }, []);

  const handleInput = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Handle map click → update coordinates + address
  const handleMapClick = ({ lat, lng }) => {
    setFormData({
      ...formData,
      location: { lat, lng },
      address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
    });
  };

  // Validation
  // Validation
const isValid =
  formData.name?.trim() !== "" &&
  formData.type?.trim() !== "" &&
  formData.authorized?.trim() !== "" &&
  formData.country?.trim() !== "" &&
  formData.location &&
  formData.address?.trim() !== "";

  return (
    <form className="space-y-3 px-6 mt-3 pb-4">
      {/* Name */}
      <div>
        <label
          className={`text-xl font-medium ${
            theme === "dark" ? "text-white" : "text-[#161616]"
          }`}
        >
          Name
        </label>
        <input
          type="text"
          value={formData.name || ""}
          onChange={(e) => handleInput("name", e.target.value)}
          placeholder="Office name"
          className={`w-full rounded-full py-2.5 px-3 mt-1 
          ${
            theme === "dark"
              ? "bg-[#2A2A2A] text-white"
              : "bg-[#E5E5E5] text-[#161616]"
          }`}
        />
      </div>

      {/* Type */}
      <SelectField
        label="Type"
        value={formData.type || ""}
        onChange={(e) => handleInput("type", e.target.value)}
        options={[
          { value: "own", label: "Own" },
          { value: "rent", label: "Rent" },
          { value: "lease", label: "Lease" },
        ]}
        theme={theme}
      />
   <div>
        <label
          className={`text-xl font-medium ${
            theme === "dark" ? "text-white" : "text-[#161616]"
          }`}
        >
          Authorized
        </label>
        <input
          type="text"
          value={formData.authorized || ""}
          onChange={(e) => handleInput("authorized", e.target.value)}
          placeholder="Authorized Name"
          className={`w-full rounded-full py-2.5 px-3 mt-1 
          ${
            theme === "dark"
              ? "bg-[#2A2A2A] text-white"
              : "bg-[#E5E5E5] text-[#161616]"
          }`}
        />
      </div>
      {/* Authorized */}
      {/* <SelectField
        label="Authorized"
        value={formData.authorized || ""}
        onChange={(e) => handleInput("authorized", e.target.value)}
        options={[
          { value: "john_doe", label: "John Doe" },
          { value: "jane_smith", label: "Jane Smith" },
        ]}
        theme={theme}
      /> */}

      {/* Country (React Select) */}
      <div>
        <label
          className={`text-xl font-medium ${
            theme === "dark" ? "text-white" : "text-[#161616]"
          }`}
        >
          Country
        </label>
        <Select
          value={
            formData.country
              ? countries.find((c) => c.value === formData.country) || null
              : null
          }
          onChange={(option) => {
            setFormData({
              ...formData,
              country: option?.label || "",
              location: option
                ? { lat: option.latitude, lng: option.longitude }
                : null,
              address: "",
            });
          }}
          options={countries}
          styles={{
            control: (base) => ({
              ...base,
              borderRadius: "9999px",
              backgroundColor:
                theme === "dark" ? "#2A2A2A" : "#E5E5E5",
              color: theme === "dark" ? "white" : "#161616",
            }),
            singleValue: (base) => ({
              ...base,
              color: theme === "dark" ? "white" : "#161616",
            }),
          }}
        />
      </div>

      {/* Location (Map) */}
      <div>
        <label
          className={`block text-sm font-medium mb-2 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Location
        </label>

        {formData.address && (
          <div
            className={`mb-3 p-2 rounded text-sm ${
              theme === "dark"
                ? "bg-[#333333] text-gray-300"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Selected: {formData.address}
          </div>
        )}

        <div
          className={`h-48 rounded-lg overflow-hidden border ${
            theme === "dark" ? "border-gray-600" : "border-gray-300"
          }`}
        >
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
            }}
            center={formData.location || { lat: 20, lng: 0 }} // fallback center
            zoom={formData.location ? 6 : 2}
            onClick={handleMapClick}
          />
        </div>
        <p
          className={`text-xs mt-2 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Click on the map to select office location
        </p>
      </div>

      {/* Next Button */}
      <div className="mt-6">
        <button
          type="button"
          disabled={!isValid}
          onClick={onNext}
          className={`w-full text-lg font-semibold py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 
          ${
            isValid
              ? "bg-[#FF6B00] text-white hover:bg-[#e55a00]"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </form>
  );
}
