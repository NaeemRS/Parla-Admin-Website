import { Icon } from "@iconify/react";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

export default function FilterTabs({ activeFilter, onFilterChange }) {
  const { theme } = useContext(ThemeContext);
  const { t } = useLanguage();

  const filters = [
    { key: "All", label: t('tabs.all') },
    { key: "Incomplete", label: t('tabs.incomplete') },
    { key: "Complete", label: t('tabs.complete') },
    { key: "New", label: t('tabs.new') },
    { key: "Meets", label: t('tabs.meets') }
  ];

  return (
    <div className="py-4 overflow-x-auto">
      <div className="flex items-center flex-wrap lg:gap-11 gap-4 md:justify-between">
        {/* ✅ Filter and Sort Icons with Iconify */}
        <div className="flex items-center gap-2">
          <Icon
            icon="mage:filter"
            className="w-8 h-8 text-orange-500"
          />
          <div className="flex flex-col gap-0.5 h-7">
            <Icon
              icon="mdi:chevron-up"
              className="w-5 h-5 text-gray-600"
            />
            <Icon
              icon="mdi:chevron-down"
              className="w-5 h-5 text-gray-600"
            />
          </div>
        </div>

        {/* ✅ Filter Pills */}
        <div className="flex items-center md:gap-11 !overflow-x-auto gap-1">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`px-4 md:h-[57px] rounded-full cursor-pointer md:w-[187px] md:text-2xl text-base font-medium transition-all
                ${
                  activeFilter === filter.key
                    ? "bg-orange-500 text-white shadow-md"
                    : theme === "dark"
                    ? "text-white bg-[#202020] hover:bg-gray-900  " : "  bg-[#EEEEEE] text-[#454545]  "
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
