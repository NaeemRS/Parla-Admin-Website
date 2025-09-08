'use client'
import { ThemeContext } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useRef, useState } from 'react';
import Cookies from "js-cookie";

const Header = ({ title, buttonLabel, onButtonClick, onSearch, className }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { t, language, toggleLanguage } = useLanguage();
    const [searchValue, setSearchValue] = useState('');
    const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState('Employee_user_name');
    const dropdownRef = useRef(null);
const router = useRouter();

    // if (!mounted) {
    //     return <div>Loading...</div>; // Or return the default light theme version
    // }
    // Close dropdown when clicking outside
    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    //             setIsEmployeeDropdownOpen(false);
    //         }
    //     };

    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => document.removeEventListener('mousedown', handleClickOutside);
    // }, []);
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        if (onSearch) {
            onSearch(value);   // 🔥 parent کو value واپس بھیج رہے ہیں
        }
    };

    const toggleEmployeeDropdown = () => {
        setIsEmployeeDropdownOpen(!isEmployeeDropdownOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (!isSearchOpen) {
            setSearchValue('');
        }
    };

    const selectEmployee = (employee) => {
        setSelectedEmployee(employee);
        setIsEmployeeDropdownOpen(false);
    };


  const signOut = () => {
    // remove token
    Cookies.remove("token");

    // redirect to login
    router.push("/");
  };
 
    return (
        <header

            className={`w-full py-2 pl-4 pr-20 lg:px-6 z-[99] 
  ${theme === "dark"
                    ? "bg-black text-white border-b border-[#353434] shadow-[0_3px_10px_rgba(255,255,255,0.15)]"
                    : "bg-white text-black shadow-[0_3px_10px_rgba(0,0,0,0.12)]"
                } lg:sticky lg:top-0`}

            // style={{ boxShadow: '0px 4px 4px 0px #00000040' }}
            style={{
                // background: theme === "light" ? "#fff" : "#333",
                // color: theme === "light" ? "#000" : "#fff",

            }}
        >
            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center justify-between max-w-full">
                {/* Left Section - Task Title */}
                <div className="flex items-center gap-16">

                    <h1 className="text-xl font-semibold">{title}</h1>
                    {/* Center Section - Search */}
                    <div className="max-w-lg flex gap-12 items-center">
                        <div className="relative">
                            <Icon
                                icon="heroicons:magnifying-glass"
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 text-[#FF6B00]"
                            />
                            <input
                                type="text"
                                value={searchValue}
                                onChange={handleSearch}
                                placeholder={t('header.search')}
                                className={` ${theme === "dark" ? "bg-[#262626] text-white" : "bg-[#EFEFEF]   text-[#3F3F3FE5] placeholder-[#3F3F3FE5]"} w-full pl-14 pr-4 text-base h-[54px]  border-0 rounded-[18px]  focus:outline-none focus:ring-0 transition-all duration-200 `}
                            />
                        </div>
                        <button
                            onClick={onButtonClick}
                            className={` ${theme === "dark" ? "bg-[#343535] text-white" : "bg-black " } h-[52px] min-w-[154px] px-4 cursor-pointer   text-white text-lg font-semibold rounded-[10px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 ${className}` }
                        >
                            {buttonLabel}
                        </button>
                    </div>
                </div>

                {/* Right Section - Employee Dropdown */}
                <div className="flex items-center gap-4">
                                        {/* Language toggle (desktop) */}

                <button
                        onClick={toggleLanguage}
                        className={`hidden md:inline-flex items-center gap-2 px-2 py-1 text-xs border rounded ${theme === 'dark' ? 'border-gray-700 text-white' : 'border-gray-300 text-gray-800'}`}
                        title="Toggle language"
                        aria-label="Toggle language"
                    >
                        <Icon icon={language === 'tr' ? 'circle-flags:tr' : 'circle-flags:gb'} className="w-4 h-4" />
                        {language?.toUpperCase()}
                    </button>
                    {/* <ThemeChanger /> */}
                    <button
                        className="flex items-center justify-center lg:w-14 md:w-8 w-5"
                        onClick={toggleTheme}
                    >
                        {theme === "light" ? (
                            <Icon icon="solar:moon-broken" className="w-6 h-6 text-gray-800" />
                        ) : (
                            <Icon icon="solar:sun-2-broken" className="w-6 h-6 text-white-700" />
                        )}
                    </button>
                   
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={toggleEmployeeDropdown}
                            className="flex items-center gap-2 bg-transparent rounded-full text-sm transition-colors duration-200 focus:outline-none focus:ring-0 min-w-[200px]"
                        >
                            <div className="flex flex-col text-left flex-1">
                                <span className="font-medium text-base">{selectedEmployee}</span>
                                <span className={`text-[13px]  ${theme === "dark" ? "text-white" : "text-[#454545]"}`}>{t('header.employeeNameAndLastName')}</span>
                            </div>

                            <Icon
                                icon="heroicons:chevron-down"
                                className={`w-5 h-5 text-[#454545] transition-transform duration-200 ${isEmployeeDropdownOpen ? 'rotate-180' : ''}`}
                            />

                        </button>

                        {/* Dropdown Menu */}
                        {isEmployeeDropdownOpen && (
                            <div className="fixed right-4 top-14 mt-2 w-48 border border-gray-200 rounded-lg bg-white shadow-lg z-[9999]">
                                <div className="py-2 max-h-60 overflow-y-auto">
                                    <div onClick={() => toggleEmployeeDropdown(false)}>
                                        <Link
                                            href={''}
                                            className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150"
                                        >
                                            <Icon icon="gg:profile" className="w-5 h-5 text-gray-600" />
                                            <span className="text-gray-700">{t('header.profile')}</span>
                                        </Link>
                                    </div>
                                    <div onClick={() => toggleEmployeeDropdown(false)}>
                                        <Link
                                            href={''}
                                            className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150"
                                        >
                                            <Icon icon="mdi:settings-outline" className="w-5 h-5 text-gray-600" />
                                            <span className="text-gray-700">{t('header.settings')}</span>
                                        </Link>
                                    </div>
                                    <button
                                        onClick={() => { toggleEmployeeDropdown(false) 
                                                
                                          signOut();  }}
                                        className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150"
                                    >
                                        <Icon icon="mdi:logout" className="w-5 h-5 text-gray-600" />
                                        <span className="text-gray-700">{t('header.signOut')}</span>
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* Mobile/Tablet Layout */}
            <div className="lg:hidden">
                {/* Top row - Always visible */}
                <div className="flex items-center justify-between">
                    {/* Left - Title (truncated on very small screens) */}
                    <h1 className="text-lg sm:text-xl font-semibold1 truncate flex-1 min-w-0 pr-4">
                        {title}
                    </h1>

                    {/* Right - Action buttons */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        {/* Plus icon button */}
                        <button
                            className="flex items-center justify-center lg:w-14 md:w-8 w-5"
                            onClick={toggleTheme}
                        >
                            {theme === "light" ? (
                                <Icon icon="solar:moon-broken" className="w-6 h-6 text-gray-800" />
                            ) : (
                                <Icon icon="solar:sun-2-broken" className="w-6 h-6 text-white-700" />
                            )}
                        </button>
                        {/* Language toggle (mobile) */}
                        <button
                            onClick={toggleLanguage}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                            aria-label="Toggle language"
                            title="Toggle language"
                        >
                            <Icon icon={language === 'tr' ? 'circle-flags:tr' : 'circle-flags:gb'} className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onButtonClick}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                        >

                            <Icon
                                icon="heroicons:plus"
                                className="w-6 h-6 text-[#FF6B00]"
                            />
                        </button>

                        {/* Search toggle button */}
                        <div className="relative">
                            <button
                                onClick={toggleSearch}
                                className={` p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 ${theme === "dark" ? "text-white" : "text-[#454545]"} `}
                            >
                                <Icon
                                    icon={isSearchOpen ? "heroicons:x-mark" : "heroicons:magnifying-glass"}
                                    className="w-6 h-6 text-[#FF6B00]"
                                />
                            </button>

                            {/* Search Dropdown - Absolute positioned */}
                            {isSearchOpen && (
                                <div className="absolute right-0 top-full mt-2 w-80 max-w-[90vw]      border border-gray-200 rounded-lg shadow-lg z-50">
                                    <div className="p-4">
                                        <div className="relative">
                                            <Icon
                                                icon="heroicons:magnifying-glass"
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#FF6B00]"
                                            />
                                            <input
                                                type="text"
                                                value={searchValue}
                                                onChange={handleSearch}
                                                placeholder={t('header.search')}
                                                className="w-full pl-10 pr-4 text-base h-12 bg-[#EFEFEF] border-0 rounded-[18px] text-[#3F3F3FE5] placeholder-[#3F3F3FE5] focus:outline-none focus:ring-0 transition-all duration-200"
                                                autoFocus
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Employee dropdown - simplified for mobile */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={toggleEmployeeDropdown}
                                className="flex items-center gap-1 bg-transparent rounded-full text-sm transition-colors duration-200 focus:outline-none focus:ring-0"
                            >
                                <div className="hidden sm:flex flex-col text-left">
                                    <span className="font-medium text-sm truncate max-w-[120px]">
                                        {selectedEmployee}
                                    </span>
                                    <span className="text-xs text-[#454545]">Employee</span>
                                </div>
                                <div className="sm:hidden w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                    <Icon icon="heroicons:user" className="w-5 h-5 text-gray-600" />
                                </div>
                                <Icon
                                    icon="heroicons:chevron-down"
                                    className={`w-4 h-4 text-[#454545] transition-transform duration-200 ${isEmployeeDropdownOpen ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {/* Mobile Dropdown Menu */}
                            {isEmployeeDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 border border-gray-200 rounded-lg overflow-hidden shadow-lg !z-[9999]">
                                    <div className="py-2 max-h-60 overflow-y-auto">
                                        <div onClick={() => toggleEmployeeDropdown(false)}>
                                            <Link
                                                href={''}
                                                className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150"
                                            >
                                                <Icon icon="mdi:settings-outline" className="w-5 h-5 text-gray-600" />
                                                <span className="text-gray-700">{t('header.settings')}</span>
                                            </Link>
                                        </div>
                                        <button 
                                            onClick={() => { toggleEmployeeDropdown(false) 
                                                
                                          signOut();  }}
                                            className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150"
                                        >
                                            <Icon icon="mdi:logout" className="w-5 h-5 text-gray-600" />
                                            <span className="text-gray-700">{t('header.signOut')}</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>


            </div>
        </header>
    );
};

export default Header;