import { useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/router'; // Add this importss

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize routersss

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required");
      return;
    }
    setLoading(true);
    try {
      let role = "admin";
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/authentication/forgotPassword`,
        { email, role }
      );
      const response = res.data;
      toast.success(response.data?.message || "Reset code sent to your email!");
      setTimeout(() => {
        router.push({
          pathname: "/auth/otp-verification",
          query: { email },
        });
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to send code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8     ">
      <Toaster position="top-right" />
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
          Forgot password?
        </h2>
        <p className="text-base font-normal text-[#484A47] mb-6 text-center">
          Don’t worry! It happens. Please enter the email associated with your
          account.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-base font-normal text-[#484A47] mb-2"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="entypo:email" className="h-5 w-5 text-[#484A47]" />
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
          {/* Send Code Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full text-base font-normal text-white bg-[#ff6b00]"
          >
            {loading ? "Sending..." : "Send Code"}
          </button>
        </form>
      </div>

      {/* Log in link */}
      <div className="mt-6 text-center">
        <span className="text-sm text-[#484A47]">
          Remember password?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-orange-600 hover:text-orange-700 transition-colors"
          >
            Log in
          </Link>
        </span>
      </div>
    </div>
  );
}