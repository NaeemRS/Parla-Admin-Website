"use client"
import { useState, useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Tabs() {
  const { t } = useLanguage();
  const tabs = [
    { id: "request", label: t('tabs.request') },
    { id: "giftcards", label: t('tabs.giftcards') },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex gap-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative lg:text-xl md:text-lg text-base w-full flex items-center justify-center md:h-[57px] rounded-full cursor-pointer md:w-[187px] text-center font-semibold transition-colors
            ${
              activeTab === tab.id
                ? "bg-[#FF6B00] text-white"
                : theme === "dark"
                ? "bg-[#333333] text-gray-300 hover:bg-[#444444]"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
