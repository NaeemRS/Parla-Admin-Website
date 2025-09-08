"use client";
import { ThemeContext } from "@/context/ThemeContext";
import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import OffersNext1 from "./OffersNext1";
import OffersNext2 from "./OffersNext2";
import OffersNext3 from "./OffersNext3";
import { useRouter } from "next/navigation";
import Loader from "../Loader";
import { useLanguage } from "@/context/LanguageContext";

export default function OffersModal({ isOpen, onClose, onOfferAdded }) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const { theme } = useContext(ThemeContext);
    const [loading, setLoading] = useState(false); // loader state
    const { t } = useLanguage();

    // 🔥 Centralized state for all form data
    const [formData, setFormData] = useState({
        // Step 1 data
        country: null,
        city: null,
        category: null,
        branch: null,

        // Step 2 data
        language: "turkish",
        name: "",
        discountType: "",
        discount: "",
        limitType: "",

        // Step 3 data
        code: "",
        startDate: "",
        endDate: "",
        createdBy: "",
        quantity: "",
        reapeat: "",
    });

    const [callApi, setCallApi] = useState(false);

    // Inside OffersModal
    const handleClose = () => {

        setStep(1); // reset step
        setFormData({
            country: null,
            city: null,
            category: null,
            branch: null,
            language: "turkish",
            name: "",
            discountType: "",
            discount: "",
            limitType: "",
            code: "",
            startDate: "",
            endDate: "",
            createdBy: "",
            quantity: "",
            reapeat: "",
        });
        onClose(); // close modal
    };

    // reset formData when modal open
    useEffect(() => {
        if (isOpen) {
            setFormData({
                country: null,
                city: null,
                category: null,
                branch: null,
                language: "turkish",
                name: "",
                discountType: "",
                discount: "",
                limitType: "",
                code: "",
                startDate: "",
                endDate: "",
                createdBy: "",
                quantity: "",
                reapeat: "",
            });
        }
    }, [isOpen]);

    // API call
    useEffect(() => {
        const addOffer = async () => {
            const token = localStorage.getItem("token");
            setLoading(true);
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/Admin/Offers/AddOffer`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "ngrok-skip-browser-warning": "true",
                            ...(token && { Authorization: `Bearer ${token}` }),
                        },
                        body: JSON.stringify(formData),
                    }
                );

                const data = await response.json();
                if (data?.status === 200) {
                    toast.success(t('offers.created', 'Offer Created Successfully'));
                    handleClose();

                    // ✅ trigger parent refresh
                    if (onOfferAdded) {
                        onOfferAdded();
                    }
                } else {
                    toast.error(data?.message || t('offers.failed', 'Failed to create offer'));
                }
            } catch (error) {
                console.error("Error adding offer:", error);
                toast.error(t('offers.error', 'Something went wrong!'));
            } finally {
                setLoading(false);
                setCallApi(false);
            }
        };

        if (callApi) {
            addOffer();
        }
    }, [callApi, formData, router, onOfferAdded]);


    if (!isOpen) return null;

    // 🔙 Back arrow handler
    const handleBack = () => {
        if (step === 1) {
            toast.dismiss();
            onClose();
        } else {
            setStep(step - 1);
        }
    };

    // 📝 Update form data function
    const updateFormData = (newData) => {
        setFormData((prev) => ({ ...prev, ...newData }));
    };

    // 🎯 Step handlers
    const handleStep1Next = (step1Data) => {
        updateFormData(step1Data);
        toast.success(t('offers.step1Done', 'Step 1 completed successfully!'));
        setTimeout(() => {
            toast.dismiss();
        }, 1500);
        setStep(2);
    };

    const handleStep2Next = (step2Data) => {
        updateFormData(step2Data);
        toast.success(t('offers.step2Done', 'Step 2 completed successfully!'));
        setTimeout(() => {
            toast.dismiss();
        }, 1500);
        setStep(3);
    };

    const handleStep3Next = async (step3Data) => {
        updateFormData(step3Data);
        setLoading(true); // ✅ loader turant show
        setCallApi(true); // ✅ API trigger
        toast.success(t('offers.finalStepDone', 'Final step completed!'));
        setTimeout(() => {
            toast.dismiss();
            handleClose()
        }, 1500);
        // ❌ onClose yahan se hata diya

    };

    return (
        <>
            {loading && <Loader />}

            <Toaster position="top-center" />
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
                <div
                    className={`max-w-[745px] p-4 w-full rounded-lg shadow-lg flex flex-col
            ${theme === "dark" ? "bg-[#1F1F1F] text-white" : "bg-white text-gray-900"}
          `}
                >
                    {/* Header */}
                    <div
                        className={`flex items-center justify-between border-b pb-3 ${theme === "dark" ? "border-gray-600" : "border-gray-200"
                            }`}
                    >
                        <div className="flex gap-4 items-center ">
                            <button onClick={handleBack}>
                                <Icon
                                    icon="heroicons:arrow-left"
                                    className={`w-6 h-6 ${theme === "dark" ? "text-gray-300" : "text-[#565656]"
                                        }`}
                                />
                            </button>
                            <h2 className="text-lg font-semibold">{t('offers.addOffer', 'Add offer')}</h2>
                        </div>
                        <button
                            onClick={handleClose}
                            className=" top-3 right-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                            <Icon
                                icon="heroicons:x-mark"
                                className={`w-6 h-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Steps */}
                    {step === 1 && (
                        <OffersNext1
                            nextButton={handleStep1Next}
                            initialData={{
                                country: formData.country,
                                city: formData.city,
                                category: formData.category,
                                branch: formData.branch,
                            }}
                        />
                    )}
                    {step === 2 && (
                        <OffersNext2
                            nextButton={handleStep2Next}
                            initialData={{
                                language: formData.language,
                                name: formData.name,
                                discountType: formData.discountType,
                                discount: formData.discount,
                                limitType: formData.limitType,
                            }}
                        />
                    )}
                    {step === 3 && (
                        <OffersNext3
                            nextButton={handleStep3Next}
                            initialData={{
                                language: formData.language,
                                code: formData.code,
                                startDate: formData.startDate,
                                endDate: formData.endDate,
                                createdBy: formData.createdBy,
                            }}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
