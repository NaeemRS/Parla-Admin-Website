import { useState, useContext } from "react";
import { Category, cityOptions, countryOptions, BranchOptions } from "../content/ContentData";
import { Icon } from "@iconify/react";
import SelectField from "../common/SelectField ";
import { ThemeContext } from '@/context/ThemeContext';
import { Toaster } from "react-hot-toast";
import { useLanguage } from "@/context/LanguageContext";

export default function OffersNext2({ nextButton, initialData = {} }) {
    const { t } = useLanguage();
    const [language, setLanguage] = useState(initialData.language || "turkish");
    const [name, setName] = useState(initialData.name || "");
    const [discountType, setDiscountType] = useState(initialData.discountType || "");
    const [discount, setDiscount] = useState(initialData.discount || "");
    const [limitType, setLimitType] = useState(initialData.limitType || "");

    const { theme } = useContext(ThemeContext);
    const discountTypeOptions = [
        { value: "percentage", label: t('offers.percentage', 'Percentage (%)') },
        { value: "fixed", label: t('offers.fixed', 'Default (Fixed Amount)') },
    ];



    const limitTypeOptions = [
        { value: "indefinite", label: t('offers.indefinite', 'Indefinite') },
        { value: "limited", label: t('offers.limited', 'Limited') }
    ];

    // Handle next button click
    const handleNext = () => {
        const step2Data = {
            language,
            name,
            discountType,
            discount,
            limitType
        };
        nextButton(step2Data);
    };

    return (
        <>
            <Toaster position="top-center" />

            <div className={`w-full flex flex-col`}>
                {/* Languages */}
                <div className="flex gap-2 mt-6">
                    {["turkish", "english"].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className={`px-4 py-2 rounded-full w-[160px] text-base font-medium ${language === lang
                                ? "bg-[#FF6B00] text-white"
                                : theme === "dark"
                                    ? "bg-[#333333] text-gray-300 hover:bg-[#404040]"
                                    : "bg-[#EEEEEE] text-[#6B6B6B] hover:bg-gray-200"
                                }`}
                        >
                            {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Form */}
                <div className="mt-6 space-y-4 overflow-y-auto flex-1">
                    {/* Name Field */}
                    <div>
                        <label className={`block text-[15px] font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-black"}`}>
                            {t('offers.name', 'Name')}
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t('offers.namePlaceholder', 'Welcome spring')}
                            className={`w-full px-3 py-3 rounded-lg text-base ${theme === "dark"
                                ? "bg-[#333333] text-white border border-[#404040] placeholder-gray-400"
                                : "bg-[#EEEEEE] text-gray-900 border border-gray-300 placeholder-gray-500"
                                } focus:outline-none focus:ring-0`}
                        />
                    </div>

                    <SelectField
                        label={t('offers.discountType', 'Discount type')}
                        value={discountType}
                        onChange={(e) => setDiscountType(e.target.value)}
                        options={discountTypeOptions}
                        theme={theme}
                    />

                    {/* Discount Field */}
                    {/* Discount Field */}
                    <div>
                        <label
                            className={`block text-[15px] font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-black"
                                }`}
                        >
                            {t('offers.discount', 'Discount')}
                        </label>
                        <div className="relative">
                            <input
                                type="number" // ✅ number only
                                min="0"
                                step="0.01"
                                value={discount}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (/^\d*\.?\d*$/.test(val)) {
                                        setDiscount(val);
                                    }
                                }}
                                placeholder={discountType === "percentage" ? "20" : "100"}
                                className={`w-full px-3 py-3 pr-10 rounded-lg text-base ${theme === "dark"
                                    ? "bg-[#333333] text-white border border-[#404040] placeholder-gray-400"
                                    : "bg-[#EEEEEE] text-gray-900 border border-gray-300 placeholder-gray-500"
                                    } focus:outline-none focus:ring-0`}
                            />
                            {/* Unit Symbol based on discountType */}
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                {discountType === "percentage" ? "%" : "₺"}
                            </span>
                        </div>
                    </div>


                    {/* Limit Type Field */}
                    <SelectField
                        label={t('offers.limitType', 'Limit type')}
                        value={limitType}
                        onChange={(e) => setLimitType(e.target.value)}
                        options={limitTypeOptions}
                        theme={theme}
                    />

                    <button
                        onClick={handleNext}
                        disabled={!(name && discountType && discount && limitType)}
                        className={`w-full bg-[#FF6B00] text-lg font-semibold text-white py-3 rounded-lg transition-colors 
                            ${name && discountType && discount && limitType
                                ? "hover:bg-[#e55a00]"
                                : "opacity-50 cursor-not-allowed"
                            }`}
                    >
                        {t('offers.next', 'Next')}
                    </button>
                </div>
            </div>
        </>
    );
}