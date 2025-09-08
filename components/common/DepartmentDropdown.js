"use client";
import { useState, useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { Icon } from "@iconify/react";

const DepartmentDropdown = ({ collapsed = false, departments}) => {
    const { theme } = useContext(ThemeContext);
    const [openDropdown, setOpenDropdown] = useState(false);

    return (
        <>
         <span className={` uppercase  font-bold text-[#FF6B00] ${collapsed ? "text-sm" : " 2xl:text-2xl md:text-lg text-base"}`}>
                Parla
            </span>
            <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className={`flex items-center gap-1 w-full rounded-md transition-colors ${collapsed ? "text-[10px]" : " text-xs sm:text-sm xl:text-lg "}
          ${theme === "dark" ? "bg-transparent text-white" : "bg-transparent text-gray-800"}
        `}
            >
                <span className="flex-1 text-left"> {collapsed ? "Depart..." : " Departments"}</span>
                <Icon
                    icon={openDropdown ? "mdi:chevron-up" : "mdi:chevron-down"}
                    width="20"
                />
            </button>

            {/* Dropdown List */}
            {openDropdown && (
                <div
                    className={`mt-2 rounded-md shadow-lg p-2 absolute left-0 w-[200px] z-10
            ${theme === "dark" ? "bg-[#1f1f1f] text-white" : "bg-white text-gray-800"}
          `}
                >
                    {departments.map((dept, index) => (
                        <button
                            onClick={() => setOpenDropdown(false)}
                            key={index}
                            className="block w-full text-left px-3 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors"
                        >
                            {dept}
                        </button>
                    ))}
                </div>
            )}</>
    );
};

export default DepartmentDropdown;
