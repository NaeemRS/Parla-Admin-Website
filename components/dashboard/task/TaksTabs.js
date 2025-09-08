"use client"
import { ThemeContext } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useContext, useState } from "react";

  
export default function TaskTabs({ tabs, defaultTab = "", onChange }) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.name);
  const { theme } = useContext(ThemeContext); // 👈 get theme from context
  const { t } = useLanguage();

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (onChange) {
      onChange(tabName); // send selected tab to parent
    }
  };

  return (
    <div className="py-4 w-[70%]">
      {/* Tabs */}
      <div className="flex justify-between">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          return (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab.name)}
              className={`relative pb-3 px-1 lg:text-xl md:text-lg text-base w-[20%] text-center flex items-center justify-center cursor-pointer font-semibold transition-colors`}
              style={{
                color: isActive
                  ? theme === "light"
                    ? "#FF6B00" // active orange on light
                    : "#fff" // active white on dark
                  : theme === "light"
                  ? "#000" // inactive black on light
                  : "#bbb", // inactive grey on dark
              }}
            >
              <div className="flex items-center gap-2">
                <span>{t(`tabs.${tab.name.toLowerCase()}`)}</span>
              </div>
              {/* Active tab underline */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[5px] rounded-lg bg-orange-500"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
