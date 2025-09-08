"use client";
import { useState, useContext } from "react";
import SelectField from "../common/SelectField ";
import { cityOptions, countryOptions, departmentOptions } from "../content/ContentData";
import { Icon } from "@iconify/react";
import { ThemeContext } from "@/context/ThemeContext";

export default function NotificationModal({
  isOpenNotificationModal,
  setOpen,
  setIsOpenNotificationModal,
}) {
  const [activeTab, setActiveTab] = useState("inhouse");
  const [language, setLanguage] = useState("turkish");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [department, setDepartment] = useState("");

  const { theme } = useContext(ThemeContext); // ✅ Get theme

  if (!isOpenNotificationModal) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm
        ${theme === "dark" ? "bg-black/60" : "bg-black/40"}`}
    >
      <div
        className={`w-[740px] min-h-[600px] rounded-2xl shadow-lg p-6 
          ${theme === "dark" ? "bg-[#1e1e1e] text-white" : "bg-white text-black"}`}
      >
        {/* Header */}
        <div
          className={`flex items-center gap-4 border-b pb-3 
            ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
        >
          <button
            onClick={() => {
              setOpen(true), setIsOpenNotificationModal(false);
            }}
            className={`${theme === "dark" ? "text-gray-300" : "text-[#6B6B6B]"}`}
          >
            <Icon
              icon="heroicons:arrow-left"
              className={`w-6 h-6 ${theme === "dark" ? "text-gray-300" : "text-[#565656]"}`}
            />
          </button>
          <h2 className="text-lg font-semibold">New notification</h2>
           
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mt-4 justify-between">
          {["inhouse", "partner", "user"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
              }}
              className={`pb-2 text-base font-medium
                ${
                  activeTab === tab
                    ? "border-b-[5px] border-[#FF6B00] text-[#FF6B00]"
                    : theme === "dark"
                    ? "text-gray-300"
                    : "text-black"
                }`}
            >
              {tab === "inhouse" ? "In-house" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Languages */}
        <div className="flex gap-8 justify-center mt-7">
          {["turkish", "english"].map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-4 text-xl py-2 rounded-full w-[187px] font-medium
                ${
                  language === lang
                    ? "bg-[#FF6B00] text-white"
                    : theme === "dark"
                    ? "bg-[#2a2a2a] text-gray-300"
                    : "bg-[#EEEEEE] text-[#6B6B6B]"
                }`}
            >
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </button>
          ))}
          
        </div>

        {/* Form */}
        <div className="mt-6 space-y-4">
          {activeTab === "inhouse" && (
            <div className="space-y-4">
              <SelectField
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                options={countryOptions}
              />
              <SelectField
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                options={cityOptions}
              />
              <SelectField
                label="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                options={departmentOptions}
              />

              <div>
                <p className="text-xl font-semibold">To:</p>
                <p className="font-semibold text-xl">
                  Adan, Adiyaman, Afyonkarahisar, Agri, Aksaray, Amasya...
                </p>
              </div>

              <div>
                <label
                  className={`text-xl font-medium 
                    ${theme === "dark" ? "text-gray-300" : "text-[#3F3F3F]"}`}
                >
                  Title
                </label>
                <textarea
                  placeholder="Type something..."
                  className={`w-full text-xl rounded-3xl p-3 mt-2 h-28 focus:outline-0 border-0
                    ${theme === "dark" ? "bg-[#2a2a2a] text-white" : "bg-[#E5E5E5] text-[#161616]"}`}
                ></textarea>
              </div>

              <button className="w-full bg-[#FF6B00] text-lg font-semibold text-white py-3 rounded-lg">
                Send to approval
              </button>
            </div>
          )}

          {activeTab === "partner" && (
            <div className="space-y-4">
              <SelectField
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                options={cityOptions}
              />

              <div>
                <label className="text-sm font-medium">Title</label>
                <textarea
                  placeholder="Type something..."
                  className={`w-full rounded-lg p-3 mt-2 h-28
                    ${theme === "dark" ? "bg-[#2a2a2a] text-white" : "bg-white text-black border"}`}
                ></textarea>
              </div>

              <button className="w-full bg-[#FF6B00] text-white py-3 rounded-lg">
                Send to approval
              </button>
            </div>
          )}

          {activeTab === "user" && (
            <div>
              <p className={`${theme === "dark" ? "text-gray-400" : "text-[#6B6B6B]"} text-sm`}>
                This is User content
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
