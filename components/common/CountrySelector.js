"use client";
import React, { useMemo, useState, useContext } from "react";
import Select, { components } from "react-select";
import { Country, City } from "country-state-city";
import { X } from "lucide-react"; 
import { ThemeContext } from "@/context/ThemeContext"; // ✅ import theme context

export default function CountrySelector({
  countryValue,
  cityValue,
  onCountryChange,
  onCityChange,
}) {
  const { theme } = useContext(ThemeContext); // ✅ get current theme
  const [selectedCountry, setSelectedCountry] = useState(countryValue || null);
  const [selectedCity, setSelectedCity] = useState(cityValue || null);

  // All countries
  const countries = Country.getAllCountries().map((c) => ({
    value: c.isoCode,
    label: c.name,
  }));

  // Cities for selected country
  const cities = useMemo(() => {
    if (!selectedCountry) return [];
    return (
      City.getCitiesOfCountry(selectedCountry.value)?.map((c) => ({
        value: c.name,
        label: c.name,
      })) || []
    );
  }, [selectedCountry]);

  // Custom Clear Button
  const ClearIndicator = (props) => (
    <components.ClearIndicator {...props}>
      <X size={16} className="text-gray-500 hover:text-red-500" />
    </components.ClearIndicator>
  );

  // Reusable styles with theme applied
  const customStyles = {
    control: (base) => ({
      ...base,
      borderRadius: 9999,
      backgroundColor: theme === "dark" ? "#2A2A2A" : "#EEEEEE",
      border: "none",
      paddingLeft: "8px",
      height: "57px",
      color: theme === "dark" ? "white" : "#161616",
    }),
    singleValue: (base) => ({
      ...base,
      color: theme === "dark" ? "white" : "#161616",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#1F1F1F" : "white",
      color: theme === "dark" ? "white" : "#161616",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? theme === "dark"
          ? "#333333"
          : "#FFE5D0"
        : "transparent",
      color: theme === "dark" ? "white" : "#161616",
      cursor: "pointer",
    }),
    input: (base) => ({
      ...base,
      color: theme === "dark" ? "white" : "#161616",
    }),
    placeholder: (base) => ({
      ...base,
      color: theme === "dark" ? "#B0B0B0" : "#666",
    }),
  };

  // Handle country change
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedCity(null);
    onCountryChange?.(country);
    onCityChange?.(null);
  };

  return (
    <div className="flex gap-6">
      {/* Country Dropdown */}
      <Select
        options={countries}
        value={selectedCountry}
        onChange={handleCountryChange}
        placeholder="Select Country"
        classNamePrefix="country-select"
        components={{ ClearIndicator }}
        isClearable
        styles={customStyles}
        className="max-w-sm min-w-xs"
      />

      {/* City Dropdown */}
      <Select
        options={cities}
        value={selectedCity}
        onChange={(city) => {
          setSelectedCity(city);
          onCityChange?.(city);
        }}
        placeholder="Select City"
        classNamePrefix="city-select"
        components={{ ClearIndicator }}
        isClearable
        isDisabled={!selectedCountry}
        styles={customStyles}
        className="max-w-sm min-w-xs"
      />
    </div>
  );
}
