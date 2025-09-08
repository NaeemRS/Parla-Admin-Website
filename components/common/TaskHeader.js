"use client"
import React, { useContext } from "react";
 import { ThemeContext } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const TaskHeader = ({ title = "Total", count = 0 }) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useLanguage();

    return (
        <h2
            className={`text-lg font-semibold px-4 py-2 flex items-center whitespace-nowrap rounded-md ${theme === "light"
                ? " text-black"
                : "text-white"
                }`}
        >
            {t(`taskHeader.${title.toLowerCase()}`, title)}
            <span
                className={`ml-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
            >
                ({count})
            </span>
        </h2>
    );
};

export default TaskHeader;
