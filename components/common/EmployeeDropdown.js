import { useContext } from "react";
import Select, { components } from "react-select";
import { ThemeContext } from "@/context/ThemeContext";

export default function EmployeeDropdown({ employees = [], setEmployeeId, employeeId }) {
  const { theme } = useContext(ThemeContext);

  // Convert employees to react-select options
  const allOptions = employees.map((emp) => ({
    value: emp._id,
    label: `${emp.firstName} ${emp.lastName}`,
    employee: emp,
  }));

  // Sirf first 5
  const topFive = allOptions.slice(0, 5);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "57px",
      borderRadius: "11px",
      border: "none",
      boxShadow: state.isFocused ? " " : "none",
      backgroundColor: theme === "dark" ? "#202020" : "#EEEEEE",
      fontSize: "16px",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#202020" : "white",
      color: theme === "dark" ? "white" : "black",
      zIndex: 100,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#f97316"
        : state.isFocused
          ? theme === "dark" ? "#2A2A2A" : "#f3f4f6"
          : "transparent",
      color: state.isSelected ? "white" : theme === "dark" ? "white" : "black",
      cursor: "pointer",
      fontSize: "15px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme === "dark" ? "white" : "black",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: theme === "dark" ? "#9ca3af" : "#6b7280",
    }),
  };

  // Custom MenuList for showing message
  const MenuList = (props) => {
    const { selectProps } = props;
    const inputValue = selectProps.inputValue;

    // Agar search empty hai to sirf top 5 + message
    if (!inputValue) {
      return (
        <components.MenuList {...props}>
          {topFive.map((option, index) => (
            <components.Option
              key={option.value}
              {...props}
              data={option}
              isSelected={props.getValue().some(val => val.value === option.value)}
              isFocused={props.focusedOption?.value === option.value}
              innerProps={{
                ...props.innerProps,
                onClick: () => props.selectOption(option)
              }}
            >
              {option.label}
            </components.Option>
          ))}
          <div
            className={`px-4 py-2 text-sm italic text-center ${theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
          >
            Search other employees by typing...
          </div>
        </components.MenuList>
      );
    }

    // Agar search ho rahi hai to normal children render karo
    return <components.MenuList {...props}>{props.children}</components.MenuList>;
  };

  return (
    <div className="relative lg:mt-8 mt-2 lg:w-[250px] lg:justify-end text-left">
      <Select
        options={allOptions}
        value={
          employeeId
            ? { value: employeeId._id, label: `${employeeId.firstName} ${employeeId.lastName}`, employee: employeeId }
            : null
        }
        onChange={(selected) => setEmployeeId(selected?.employee || null)}
        styles={customStyles}
        placeholder="Search employee..."
        isClearable
        isSearchable
        components={{ MenuList }}
      />
    </div>
  );
}