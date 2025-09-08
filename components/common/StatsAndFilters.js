import { Icon } from "@iconify/react";
import { useState } from "react";
import Dropdown from "@/components/common/Dropdown"
import { useLanguage } from "@/context/LanguageContext";
// Main Stats and Filters Component
export default function StatsAndFilters() {
    const { t } = useLanguage();
    const [selectedCountry, setSelectedCountry] = useState("Turkiye");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");

    // Data for dropdowns
    const countries = [
        {
            value: "Turkiye",
            label: "Turkiye",
            icon: <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">TR</span>
            </div>
        },
        { value: "Germany", label: "Germany" },
        { value: "France", label: "France" },
        { value: "Italy", label: "Italy" }
    ];

    const cities = [
        { value: "Istanbul", label: "Istanbul" },
        { value: "Ankara", label: "Ankara" },
        { value: "Izmir", label: "Izmir" },
        { value: "Bursa", label: "Bursa" }
    ];

    const districts = [
        { value: "Kadikoy", label: "Kadikoy" },
        { value: "Besiktas", label: "Besiktas" },
        { value: "Sisli", label: "Sisli" },
        { value: "Uskudar", label: "Uskudar" }
    ];

    // Get the icon for selected country
    const selectedCountryData = countries.find(c => c.value === selectedCountry);
    const countryIcon = selectedCountryData?.icon || null;

    return (



        < div className="flex items-center md:gap-11 gap-2 justify-end w-full" >
            <Dropdown
                label={t('filters.country', 'Country')}
                value={selectedCountry}
                options={countries}
                onChange={setSelectedCountry}
                icon={countryIcon}
                placeholder={t('filters.selectCountry', 'Select Country')}
            />
            <Dropdown
                label={t('filters.city', 'City')}
                value={selectedCity}
                options={cities}
                onChange={setSelectedCity}
                placeholder={t('filters.city', 'City')}
            />

            <Dropdown
                label={t('filters.district', 'District')}
                value={selectedDistrict}
                options={districts}
                onChange={setSelectedDistrict}
                placeholder={t('filters.district', 'District')}
            />
        </div >

    );
}
