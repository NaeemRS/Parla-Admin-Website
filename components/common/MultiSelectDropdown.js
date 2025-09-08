import React, { useContext } from "react";
import Select, { components } from "react-select";
import { ThemeContext } from "@/context/ThemeContext";

// Custom option with checkbox
const Option = (props) => (
  <components.Option {...props}>
    <input
      type="checkbox"
      checked={props.isSelected}
      onChange={() => null}
      className="mr-2"
    />
    <label>{props.label}</label>
  </components.Option>
);

// Custom multi-value label (chips)
const MultiValue = (props) => (
  <components.MultiValue {...props}>
    <span>{props.data.label}</span>
  </components.MultiValue>
);

const MultiSelectDropdown = ({ employees, value, onChange }) => {
  const { theme } = useContext(ThemeContext);

  const options = employees?.map((emp) => ({
    value: emp._id,
    label: `${emp?.firstName} ${emp?.lastName}`,
  }));

  // Remove border, outline, focus ring
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#2A2A2A" : "#F3F4F6",
      color: theme === "dark" ? "#fff" : "#000",
      border: "none",
      boxShadow: "none",
      outline: "none",
      "&:hover": {
        border: "none",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#2A2A2A" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#374151" : "#E5E7EB",
      color: theme === "dark" ? "#fff" : "#000",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? theme === "dark"
          ? "#4B5563"
          : "#3B82F6"
        : theme === "dark"
        ? "#2A2A2A"
        : "#fff",
      color: state.isSelected
        ? "#fff"
        : theme === "dark"
        ? "#fff"
        : "#000",
      "&:hover": {
        backgroundColor: theme === "dark" ? "#4B5563" : "#E5E7EB",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: theme === "dark" ? "#9CA3AF" : "#6B7280",
    }),
  };

  return (
    <div className="w-full">
      <label
        className={`font-medium text-base ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Task Visibility
      </label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{ Option, MultiValue }}
        options={options}
        value={options.filter((opt) => value.includes(opt.value))}
        onChange={(selected) => onChange(selected.map((s) => s.value))}
        placeholder="Select employees..."
        styles={customStyles}
        className="w-full"
      />
    </div>
  );
};

export default MultiSelectDropdown;
