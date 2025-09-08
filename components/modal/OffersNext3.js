import { ThemeContext } from '@/context/ThemeContext';
import { useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useLanguage } from "@/context/LanguageContext";

export default function OffersNext3({ nextButton, initialData = {} }) {
    const { t } = useLanguage();
    const [language, setLanguage] = useState(initialData.language || "turkish");
    const [code, setCode] = useState(initialData.code || "");
    const [startDate, setStartDate] = useState(initialData.startDate || "");
    const [endDate, setEndDate] = useState(initialData.endDate || "");
    const [createdBy, setCreatedBy] = useState(initialData.createdBy || "");
    const [quantity, setQuantity] = useState(initialData.quantity || "");
    const [repeat, setRepeat] = useState(initialData.repeat || "");

    const { theme } = useContext(ThemeContext);

    // Format function (typing + paste dono k liye)
    const formatCode = (inputValue) => {
        let value = inputValue.replace(/\D/g, ""); // sirf digits
        value = value.slice(0, 16); // max 16 digits
        return value.match(/.{1,4}/g)?.join("-") || "";
    };

    // Repeat options
    const repeatOptions = ["Yes", "No", ];

    // Handle next button click
    const handleNext = () => {
        const step3Data = {
            language,
            code,
            startDate,
            endDate,
            createdBy,
            quantity,
            repeat
        };
        nextButton(step3Data);
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
                            className={`px-4 py-2 rounded-full w-[160px] text-base font-medium ${
                                language === lang
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
                    {/* Code Field */}
                    <div>
                        <label
                            className={`block text-[15px] font-medium mb-2 ${
                                theme === "dark" ? "text-gray-300" : "text-black"
                            }`}
                        >
                            {t('offers.code', 'Code')}
                        </label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(formatCode(e.target.value))}
                            onPaste={(e) => {
                                e.preventDefault();
                                const paste = e.clipboardData.getData("text");
                                setCode(formatCode(paste));
                            }}
                            placeholder={t('offers.codePlaceholder', '1234-1234-1234-1234')}
                            maxLength={19}
                            className={`w-full px-3 py-3 rounded-lg text-base ${
                                theme === "dark"
                                    ? "bg-[#333333] text-white border border-[#404040] placeholder-gray-400"
                                    : "bg-[#EEEEEE] text-gray-900 border border-gray-300 placeholder-gray-500"
                            } focus:outline-none focus:ring-0`}
                        />
                    </div>

                    {/* Start Date Field */}
                    <div>
                        <label className={`block text-[15px] font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-black"}`}>
                            {t('offers.startDate', 'Start date')}
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className={`w-full px-3 py-3 rounded-lg text-base ${
                                theme === "dark"
                                    ? "bg-[#333333] text-white border border-[#404040] placeholder-gray-400"
                                    : "bg-[#EEEEEE] text-gray-900 border border-gray-300 placeholder-gray-500"
                            } focus:outline-none focus:ring-0`}
                        />
                    </div>

                    {/* End Date Field */}
                    <div>
                        <label className={`block text-[15px] font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-black"}`}>
                            {t('offers.endDate', 'End date')}
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className={`w-full px-3 py-3 rounded-lg text-base ${
                                theme === "dark"
                                    ? "bg-[#333333] text-white border border-[#404040] placeholder-gray-400"
                                    : "bg-[#EEEEEE] text-gray-900 border border-gray-300 placeholder-gray-500"
                            } focus:outline-none focus:ring-0`}
                        />
                    </div>

                    {/* Created By Field */}
                    <div>
                        <label className={`block text-[15px] font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-black"}`}>
                            {t('offers.createdBy', 'Created by')}
                        </label>
                        <input
                            type="text"
                            value={createdBy}
                            onChange={(e) => setCreatedBy(e.target.value)}
                            placeholder={t('offers.createdByPlaceholder', 'Sibel Altinosy')}
                            className={`w-full px-3 py-3 rounded-lg text-base ${
                                theme === "dark"
                                    ? "bg-[#333333] text-white border border-[#404040] placeholder-gray-400"
                                    : "bg-[#EEEEEE] text-gray-900 border border-gray-300 placeholder-gray-500"
                            } focus:outline-none focus:ring-0`}
                        />
                    </div>

                    {/* Quantity Field */}
                    <div>
                        <label
                            className={`block text-[15px] font-medium mb-2 ${
                                theme === "dark" ? "text-gray-300" : "text-black"
                            }`}
                        >
                            {t('offers.quantity', 'Quantity')}
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder={t('offers.quantityPlaceholder', 'Enter quantity')}
                            className={`w-full px-3 py-3 rounded-lg text-base ${
                                theme === "dark"
                                    ? "bg-[#333333] text-white border border-[#404040] placeholder-gray-400"
                                    : "bg-[#EEEEEE] text-gray-900 border border-gray-300 placeholder-gray-500"
                            } focus:outline-none focus:ring-0`}
                        />
                    </div>

                    {/* Repeat Field */}
                    <div>
                        <label
                            className={`block text-[15px] font-medium mb-2 ${
                                theme === "dark" ? "text-gray-300" : "text-black"
                            }`}
                        >
                            {t('offers.repeat', 'Repeat')}
                        </label>
                        <select
                            value={repeat}
                            onChange={(e) => setRepeat(e.target.value)}
                            className={`w-full px-3 py-3 rounded-lg text-base ${
                                theme === "dark"
                                    ? "bg-[#333333] text-white border border-[#404040]"
                                    : "bg-[#EEEEEE] text-gray-900 border border-gray-300"
                            } focus:outline-none focus:ring-0`}
                        >
                            <option value="">{t('offers.selectRepeat', 'Select repeat type')}</option>
                            {repeatOptions.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={!(code && startDate && endDate && createdBy && quantity && repeat)}
                        className={`w-full bg-[#FF6B00] text-lg font-semibold text-white py-3 rounded-lg transition-colors 
                            ${code && startDate && endDate && createdBy && quantity && repeat
                                ? "hover:bg-[#e55a00]"
                                : "opacity-50 cursor-not-allowed"
                            }`}
                    >
                        {t('offers.sendToApproval', 'Send to approval')}
                    </button>
                </div>
            </div>
        </>
    );
}
