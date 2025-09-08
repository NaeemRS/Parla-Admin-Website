import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import { ThemeContext } from "@/context/ThemeContext"; // ✅ adjust import path if needed

const SelectField = ({ label, options = [], value, onChange }) => {
  const { theme } = useContext(ThemeContext); // ✅ Get theme

  return (
    <div className="relative">
      <label
        className={`text-xl font-medium ${
          theme === "dark" ? "text-white" : "text-[#3F3F3F]"
        }`}
      >
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className={`w-full appearance-none focus:outline-0 focus:border-0 text-xl rounded-full py-2.5 px-3 mt-1 pr-10
            ${
              theme === "dark"
                ? "bg-[#2A2A2A] text-white"
                : "bg-[#E5E5E5] text-[#161616]"
            }`}
        >
          {options.map((option, index) => (
            <option
              key={index}
              value={option.value}
              className={theme === "dark" ? "bg-[#2A2A2A] text-white" : ""}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* ✅ Custom Arrow Icon */}
        <Icon
          icon="mdi:chevron-down"
          className={`absolute text-4xl right-4 top-1/2 transform -translate-y-1/2 pointer-events-none 
            ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
        />
      </div>
    </div>
  );
};

export default SelectField;
