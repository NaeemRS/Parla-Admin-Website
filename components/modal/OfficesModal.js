"use client";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { Icon } from "@iconify/react";
import OfficesModal1 from "./OfficesModal1";
import OfficesModal2 from "./OfficesModal2";
import OfficesModal3 from "./OfficesModal3";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "../Loader";

export default function OfficesModal({ isOpen, onClose, setCallApi }) {
  const { theme } = useContext(ThemeContext);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    type: "own",
    authorized: "",
    country: "turkey",
    location: null,
    address: "",
    price: "",
    duration: "",
    contractDate: "",
    startDate: "",
    endDate: "",
    rentedFrom: "",
    contractPerson: "",
    contact: "",
    status: "active",
    pictures: [],
  });

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    setStep(1);
    setFormData({
      name: "",
      type: "own",
      authorized: "",
      country: "turkey",
      location: null,
      address: "",
      gpsCoordinates: "",
      price: "",
      deposit: "",
      contractDate: "",
      duration: "",
      startDate: "",
      endDate: "",
      rentedFrom: "",
      contractPerson: "",
      contact: "",
      status: "active",
      pictures: [],

    });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      handleClose(); // ✅ agar step 1 hai to close
    }
  };
  const handleSave = async (data) => {
    // Update formData state with new values
    const updatedFormData = {
      ...formData,
      rentedFrom: data?.rentedFrom || "",
      contractPerson: data?.contractPerson || "",
      contact: data?.contact || "",
      status: data?.status || "",
      pictures: data?.pictures || [],
      employyes: data?.employee
    };

    setFormData(updatedFormData);
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      // Create FormData object for file uploads
      const apiFormData = new FormData();
      // Add all text fields from updatedFormData
      apiFormData.append("name", updatedFormData.name);
      apiFormData.append("type", updatedFormData.type);
      apiFormData.append("authorized", updatedFormData.authorized);
      apiFormData.append("country", updatedFormData.country);
      apiFormData.append("location", updatedFormData.location || "");
      apiFormData.append("contract", updatedFormData.contractFile || "");
      apiFormData.append("address", updatedFormData.address);
      apiFormData.append("price", updatedFormData.price);
      apiFormData.append("contractDate", updatedFormData.contractDate);
      apiFormData.append("duration", updatedFormData.duration);
      apiFormData.append("startDate", updatedFormData.startDate);
      apiFormData.append("endDate", updatedFormData.endDate);
      apiFormData.append("deposit", updatedFormData.deposit);
      apiFormData.append("rentedFrom", updatedFormData.rentedFrom);
      apiFormData.append("contactPerson", updatedFormData.contractPerson);
      apiFormData.append("contactPersonPhone", updatedFormData.contact);
      apiFormData.append("status", updatedFormData.status);
      apiFormData.append("employees", updatedFormData.employyes);

      // Add pictures (files)
      if (updatedFormData.pictures && updatedFormData.pictures.length > 0) {
        updatedFormData.pictures.forEach((picture, index) => {
          apiFormData.append(`pictures`, picture.file);
        });
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Admin/Office/Add-Office`,
        {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": "true",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: apiFormData,
        }
      );

      const responseData = await response.json();
      if (responseData?.status === 201) {
        setCallApi(true);
        setLoading(false)
        toast.success("Office created successfully!");
        handleClose();

        router.push("/dashboard/offices");
      } else {
        setLoading(false)
        toast.error(responseData?.message || "Something went wrong");
      }
    } catch (error) {
      setLoading(false)
      console.error("Error adding office:", error);
      toast.error("Failed to add office");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <Toaster position="top-right" />
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99] p-4">
        <div
          className={`rounded-2xl shadow-2xl w-full max-w-3xl pb-4 flex flex-col 
        ${theme === "dark" ? "bg-[#1F1F1F] text-white" : "bg-white text-gray-900"}`}
        >
          {/* Header */}
          <div
            className={`border-b flex items-center justify-between gap-4 p-3 ${theme === "dark" ? "border-[#262626]" : "border-gray-200"
              }`}
          >
            <div className="flex gap-4 items-center ">
            <button
              onClick={step === 1 ? handleClose : handlePrev}
              className={`${theme === "dark" ? "text-gray-300" : "text-[#000]"}`}
            >
              <Icon
                icon="heroicons:arrow-left"
                className={`w-6 h-6 ${theme === "dark" ? "text-gray-300" : "text-[#000]"
                  }`}
              />
            </button>
            <h2
              className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-black"
                }`}
            >
              {step === 1
                ? "Add Office"
                : step === 2
                  ? "Office Details"
                  : "Confirmation"}
            </h2>
            </div>
             <button
              onClick={handleClose}
              className=" top-3 right-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <Icon
                icon="heroicons:x-mark" // ✅ better matching close icon
                className={`w-6 h-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
              />
            </button>

          </div>

          {/* Step Content */}
          <div className="p-4">
            {step === 1 && (
              <OfficesModal1
                formData={formData}
                setFormData={setFormData}
                onNext={handleNext}
              />
            )}
            {step === 2 && (
              <OfficesModal2
                formData={formData}
                setFormData={setFormData}
                onNext={handleNext}
              />
            )}
            {step === 3 && (
              <OfficesModal3
                formData={formData}
                setFormData={setFormData}
                onSave={handleSave} // ✅ Save button trigger karega
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
