"use client";
import { useState, useContext } from "react";
import Select from "react-select";
import { ThemeContext } from "@/context/ThemeContext";

export default function DiscountForm() {
  const { theme } = useContext(ThemeContext);

  const [name, setName] = useState("");
  const [discountType, setDiscountType] = useState(null);
  const [discount, setDiscount] = useState("");
  const [limitType, setLimitType] = useState(null);

  const discountTypeOptions = [
    { value: "percentage", label: "Percentage" },
    { value: "fixed", label: "Fixed Amount" },
  ];

  const limitTypeOptions = [
    { value: "indefinite", label: "Indefinite" },
    { value: "limited", label: "Limited Uses" },
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#333" : "#f5f5f5",
      borderColor: theme === "dark" ? "#555" : "#ddd",
      borderRadius: "9999px", // fully rounded
      paddingLeft: "10px",
      fontSize: "15px",
    }),
    singleValue: (base) => ({
      ...base,
      color: theme === "dark" ? "#fff" : "#000",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#1f1f1f" : "#fff",
    }),
  };

  return (
    <div className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          placeholder="Enter offer name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full px-4 py-2 rounded-full focus:outline-none ${
            theme === "dark"
              ? "bg-[#333333] text-white border border-gray-600"
              : "bg-gray-100 text-black border border-gray-300"
          }`}
        />
      </div>

      {/* Discount type */}
      <div>
        <label className="block text-sm font-medium mb-1">Discount type</label>
        <Select
          options={discountTypeOptions}
          value={discountType}
          onChange={(val) => setDiscountType(val)}
          styles={customStyles}
          placeholder="Select discount type"
          isClearable
        />
      </div>

      {/* Discount */}
      <div>
        <label className="block text-sm font-medium mb-1">Discount</label>
        <input
          type="text"
          placeholder="e.g. 20%"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className={`w-full px-4 py-2 rounded-full focus:outline-none ${
            theme === "dark"
              ? "bg-[#333333] text-white border border-gray-600"
              : "bg-gray-100 text-black border border-gray-300"
          }`}
        />
      </div>

      {/* Limit type */}
      <div>
        <label className="block text-sm font-medium mb-1">Limit type</label>
        <Select
          options={limitTypeOptions}
          value={limitType}
          onChange={(val) => setLimitType(val)}
          styles={customStyles}
          placeholder="Select limit type"
          isClearable
        />
      </div>
    </div>
  );
}
