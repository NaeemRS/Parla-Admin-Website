"use client";
import { ThemeContext } from "@/context/ThemeContext";
import { City, Country } from "country-state-city";
import { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Select, { components } from "react-select";
import { useLanguage } from "@/context/LanguageContext";

// ✅ Custom Option with Checkbox
const CheckboxOption = (props) => {
    return (
        <components.Option {...props}>
            <input
                type="checkbox"
                checked={props.isSelected}
                onChange={() => null}
                className="mr-2"
            />
            <label>{props.label}</label>
        </components.Option>
    );
};

export default function OffersNext1({ nextButton, initialData = {} }) {
    const { t } = useLanguage();
    const [country, setCountry] = useState(initialData.country || null);
    const [city, setCity] = useState(initialData.city || null);
    const [category, setCategory] = useState(initialData.category || null);

    // 🔥 Now branch is array (multi select)
    const [branch, setBranch] = useState(initialData.branch || []);
    const [branches, setBranches] = useState([]);
    const { theme } = useContext(ThemeContext);

    // All countries
    const countries = Country.getAllCountries().map((c) => ({
        value: c.isoCode,
        label: c.name,
    }));

    // Cities of selected country
    const cities =
        country &&
        City.getCitiesOfCountry(country.value)?.map((c) => ({
            value: c.name,
            label: c.name,
        }));

    // API call when country & city selected
    useEffect(() => {
        const fetchBranches = async () => {
            if (country && city) {
                try {
                    const token = localStorage.getItem("token");
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Admin/Offers/GetBranchesCC?country=${country.label}&city=${city.label}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "ngrok-skip-browser-warning": "true",
                                ...(token && { Authorization: `Bearer ${token}` }),
                            },
                        }
                    );
                    const data = await response.json();
                    const branchOptions = data?.data?.map((b) => ({
                        value: b._id,
                        label: b.branchName,
                    }));

                    setBranches(branchOptions);
                    if (!initialData.branch) {
                        setBranch([]);
                    }
                } catch (err) {
                    console.error("Error fetching branches:", err);
                    setBranches([]);
                }
            } else {
                setBranches([]);
                if (!initialData.branch) {
                    setBranch([]);
                }
            }
        };

        fetchBranches();
    }, [country, city]);

    // Handle next button click
    const handleNext = () => {
        const step1Data = {
            country,
            city,
            category,
            branch, // array of selected branches
        };
        nextButton(step1Data);
    };

    // Custom styles for react-select
    const customStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: theme === "dark" ? "#333" : "#fff",
            color: theme === "dark" ? "#fff" : "#000",
            borderColor: theme === "dark" ? "#555" : "#ddd",
            borderRadius: "8px",
            padding: "2px",
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: theme === "dark" ? "#1F1F1F" : "#fff",
            color: theme === "dark" ? "#fff" : "#000",
        }),
        singleValue: (base) => ({
            ...base,
            color: theme === "dark" ? "#fff" : "#000",
        }),
    };

    return (
        <>
            <Toaster position="top-center" />
            <div className={`w-full rounded-lg shadow-lg flex flex-col`}>
                {/* Form */}
                <div className="mt-6 space-y-4">
                    {/* Country */}
                    <div>
                        <label className="block mb-1 font-medium">{t('offers.country', 'Country')}</label>
                        <Select
                            options={countries}
                            value={country}
                            onChange={(val) => {
                                setCountry(val);
                                setCity(null);
                                setBranch([]);
                            }}
                            styles={customStyles}
                            placeholder={t('offers.selectCountry', 'Select country...')}
                            isClearable
                        />
                    </div>

                    {/* City */}
                    <div>
                        <label className="block mb-1 font-medium">{t('offers.city', 'City')}</label>
                        <Select
                            options={cities || []}
                            value={city}
                            onChange={(val) => {
                                setCity(val);
                                setBranch([]);
                            }}
                            styles={customStyles}
                            placeholder={t('offers.selectCity', 'Select city...')}
                            isDisabled={!country}
                            isClearable
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block mb-1 font-medium">{t('offers.category', 'Category')}</label>
                        <Select
                            options={[
                                { value: "hair", label: t('tabs.hair') },
                                { value: "beauty", label: t('tabs.beauty') },
                                { value: "massage", label: t('tabs.massage') },
                            ]}
                            value={category}
                            onChange={(val) => setCategory(val)}
                            styles={customStyles}
                            placeholder={t('offers.selectCategory', 'Select category...')}
                            isClearable
                        />
                    </div>

                    {/* Branch */}
                    <div>
                        <label className="block mb-1 font-medium">{t('offers.branches', 'Branches')}</label>
                        <Select
                            options={branches}
                            value={branch}
                            onChange={(val) => setBranch(val)}
                            styles={customStyles}
                            placeholder={
                                !country || !city
                                    ? t('offers.selectCountryCityFirst', 'Select country & city first')
                                    : t('offers.selectBranches', 'Select branches...')
                            }
                            isDisabled={!country || !city}
                            isClearable
                            isMulti // ✅ allow multiple selection
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            components={{ Option: CheckboxOption }}
                        />
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={!(country && city && category && branch.length > 0)}
                        className={`w-full bg-[#FF6B00] text-lg font-semibold text-white py-3 rounded-lg transition-colors 
                            ${country && city && category && branch.length > 0
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
