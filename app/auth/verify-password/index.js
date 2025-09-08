'use client'
import { useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const email = router.query.email || '';

    const validate = () => {
        if (!password) return "New password is required";
        if (password.length < 6) return "Password must be at least 6 characters";
        if (password !== confirmPassword) return "Passwords do not match";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validate();
        if (error) {
            toast.error(error);
            return;
        }
        setLoading(true);
        try {
            let role = 'admin';
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/authentication/resetPassword`, {
                emails: email,
                role,
                password,
                confirmPassword
            });
            toast.success(res.data?.message || "Password reset successful!");
            setTimeout(() => {
                router.push('/auth/login');
            }, 1500);
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to reset password");
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
            <div className="     rounded-[24px] border border-[#DADFD8] px-8 py-10 max-w-lg w-full shadow-sm">
                <h2 className="text-[28px] font-normal text-[#101110] mb-2 text-center">
                    Reset password
                </h2>
                <p className="text-base font-normal text-[#484A47] mb-6 text-center">
                    Please type something you’ll remember
                </p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* New Password Field */}
                    <div className="relative">
                        <label htmlFor="password" className="block text-base font-normal text-[#484A47] mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Icon icon="mdi:lock-outline" className="h-5 w-5 text-[#484A47]" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-10 pr-10 py-3 border border-[#8D918C] rounded-[4px] text-[#484A47] placeholder-[#484A47] focus:outline-none focus:ring-0 text-sm"
                                placeholder="************"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <Icon icon="mdi:eye-off-outline" className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                ) : (
                                    <Icon icon="mdi:eye-outline" className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                )}
                            </button>
                        </div>
                    </div>
                    {/* Confirm Password Field */}
                    <div className="relative">
                        <label htmlFor="confirmPassword" className="block text-base font-normal text-[#484A47] mb-2">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Icon icon="mdi:lock-outline" className="h-5 w-5 text-[#484A47]" />
                            </div>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirm ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="block w-full pl-10 pr-10 py-3 border border-[#8D918C] rounded-[4px] text-[#484A47] placeholder-[#484A47] focus:outline-none focus:ring-0 text-sm"
                                placeholder="************"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={() => setShowConfirm(!showConfirm)}
                                tabIndex={-1}
                            >
                                {showConfirm ? (
                                    <Icon icon="mdi:eye-off-outline" className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                ) : (
                                    <Icon icon="mdi:eye-outline" className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Reset Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full text-base font-normal text-white bg-[#ff6b00] hover:bg-orange-600 transition-colors"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>

            {/* Log in link */}
            <div className="mt-6 text-center">
                <span className="text-sm text-[#484A47]">
                    Already have account?{' '}
                    <Link href="/auth/login" className="font-medium text-orange-600 hover:text-orange-700 transition-colors">
                        Log in
                    </Link>
                </span>
            </div>
        </div>
    );
}