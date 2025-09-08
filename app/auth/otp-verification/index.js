'use client'
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

export default function VerifyCode() {
    const [codes, setCodes] = useState(['', '', '', '', '', '']);
    const inputsRef = useRef([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const email = router.query.email || "helloworld@gmail.com";

    const handleChange = (idx, value) => {
        if (!/^\d?$/.test(value)) return;
        const newCodes = [...codes];
        newCodes[idx] = value;
        setCodes(newCodes);
        if (value && idx < 5) {
            inputsRef.current[idx + 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const code = codes.join('');
        if (code.length < 4) {
            toast.error("Please enter the 4-digit code.");
            return;
        }
        setLoading(true);
        try {
            let role = 'admin';
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/authentication/otpVerification`, {
                emails: email,
                role,
                code
            });
            const response = res.data;
            toast.success(response.data?.message || "Code verified!");
            setTimeout(() => {
                router.push({
                    pathname: '/auth/verify-password',
                    query: { email }
                });
            }, 1500);
            // Redirect or further logic here
        } catch (err) {
            toast.error(err.response?.data?.message || "Verification failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8     ">
            <Toaster position="top-center" />
            {/* Logo */}
            <div className="mb-8">
                <img
                    className="h-16 w-16 mx-auto"
                    src="/images/softthrive.svg"
                    alt="Parla Admin Logo"
                />
            </div>

            {/* Card */}
            <div className="     rounded-[24px] border border-[#DADFD8] px-8 py-10 max-w-lg w-full shadow-sm flex flex-col items-center">
                <h2 className="text-[28px] font-normal text-[#101110] mb-2 text-center">
                    Please check your email
                </h2>
                <p className="text-base font-normal text-[#484A47] mb-6 text-center">
                    We’ve sent a code to <span className="font-semibold">{email}</span>
                </p>
                <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
                    <div className="flex gap-4 mb-8">
                        {codes.map((code, idx) => (
                            <input
                                key={idx}
                                ref={el => inputsRef.current[idx] = el}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={code}
                                onChange={e => handleChange(idx, e.target.value)}
                                className="w-16 h-16 text-center text-2xl border border-[#DADFD8] rounded-[16px] focus:outline-none focus:border-orange-500 transition-all"
                            />
                        ))}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full text-base font-normal text-white bg-[#ff6b00] hover:bg-orange-600 transition-colors mb-4"
                    >
                        {loading ? "Verifying..." : "Verify"}
                    </button>
                </form>
            </div>
        </div>
    );
}