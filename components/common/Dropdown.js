import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

// Reusable Simple Dropdown Component
function Dropdown({
  value,
  options,
  onChange,
  icon = null,
  placeholder = "Select...",
  className = ""
}) {
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      // Find the original option object if options are objects
      const selectedOption = options.find(option =>
        (typeof option === 'object' ? option.value : option) === selectedValue
      );
      onChange(selectedOption || selectedValue);
    } else {
      onChange(null);
    }
  };
    const { theme } = useContext(ThemeContext); // ✅ Get theme

  // Get the current value for the select
  const selectValue = typeof value === 'object' ? value?.value : value;

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {/* Icon positioned absolutely if provided */}
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
            {icon}
          </div>
        )}

        <select
          value={selectValue || ""}
          onChange={handleSelectChange}
          className={`
            ${theme === "dark" ? "text-white bg-[#202020]" : "text-[#6B6B6B] bg-[#EEEEEE]"}  
            flex items-center justify-between px-4 md:h-[57px] rounded-full cursor-pointer 
            md:w-[187px] md:text-2xl text-base transition-all   
           border-none outline-none appearance-none w-full
            ${icon ? 'pl-12' : 'px-4'}
          `}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m19 9-7 7-7-7'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 1rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1rem'
          }}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option, index) => {
            const optionValue = typeof option === 'object' ? option.value : option;
            const optionLabel = typeof option === 'object' ? option.label : option;

            return (
              <option
                key={optionValue || index}
                value={optionValue}
              >
                {optionLabel}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default Dropdown;