'use client'

import { useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import Loader from '@/components/Loader';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const validate = () => {
        if (!email) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(email)) return "Email is invalid";
        if (!password) return "Password is required";
        if (password.length < 6) return "Password must be at least 6 characters";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validate();
        if (validationError) {
            toast.error(validationError);
            return;
        }

        setLoading(true);

        try {
            let role = 'admin'; // Default role, can be changed based on your logic
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/authentication/login`, {
                email,
                password,
                role
            });

            toast.success('Login successful!');
            const response = res.data;
            console.log('Login success:', response);
            const saveToken = localStorage.setItem('token', response.token);


            // ✅ Save token in cookies (so middleware can read it)
            Cookies.set("token", response.token, {
                expires: 1, // 7 days
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            // Redirect after 1.5 seconds
            setTimeout(() => {
                router.push(`/dashboard/task`);
            }, 1500);

        } catch (err) {
            const errorMessage = err.response?.data?.error || "Login failed";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Loader />}
            <Toaster position="top-center" />

            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
                <div className="max-w-xl w-full space-y-8">
                    {/* Logo */}
                    <div className="text-center">
                        <div className="mx-auto h-16 w-16 flex items-center justify-center">
                            <img
                                className="h-16 w-16"
                                src="/images/softthrive.svg"
                                alt="Parla Admin Logo"
                            />
                        </div>
                    </div>

                    {/* Form */}
                    <div className="     p-9 rounded-[24px] border border-[#DADFD8]">
                        <div className="text-center mb-6">
                            <h2 className="text-[28px] font-normal text-[#101110] mb-2">
                                Login Into Your Account
                            </h2>
                            <p className="lock text-base font-normal text-[#484A47]">
                                Please enter your information
                            </p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Email Field */}
                            <div className='relative'>
                                <label htmlFor="email" className="block text-base font-normal text-[#484A47] absolute -top-3 left-2 mb-2   bg-[#ffffff]    px-2">
                                    Email
                                </label>
                                <div>
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Icon icon="entypo:email" className="h-5 w-5 text-[484A47]" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-[#8D918C] text-[#484A47] rounded-[4px] placeholder-[#484A47] focus:outline-none focus:ring-0 text-sm"
                                        placeholder="Enter email"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className='relative'>
                                <label htmlFor="password" className="block text-base font-normal text-[#484A47] absolute -top-3 left-2 mb-2   bg-[#ffffff]    px-2">
                                    Password
                                </label>
                                <div>
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Icon icon="mdi:lock-outline" className="h-6 w-6 text-[#484A47]" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-[#8D918C] text-[#484A47] rounded-[4px] placeholder-[#484A47] focus:outline-none focus:ring-0 text-sm"
                                        placeholder="Create a password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <Icon icon="mdi:eye-off-outline" className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        ) : (
                                            <Icon icon="mdi:eye-outline" className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password */}
                            <div className="text-right">
                                <Link
                                    href="/auth/forgot-password"
                                    className="block text-base font-normal text-[#484A47] mb-2     "
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full text-base font-normal text-white bg-gradient-to-r bg-[#ff6b00] focus:outline-none focus:ring-2 focus:ring-offset-2"
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}