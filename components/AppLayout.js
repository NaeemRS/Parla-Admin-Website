"use client";

import Loader from "@/components/Loader";
import Sidebar from "@/components/Sidebar";
import React, { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeContext } from "@/context/ThemeContext";

export default function AppLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Hide sidebar on `/` and `/auth/*`
  const hideSidebar = pathname === "/" || pathname.startsWith("/auth");

  return (
    <>
    
      {isLoading && <Loader />}
      <div
        className={`flex w-full lg:h-screen ${theme === "dark" ? "text-white bg-black" : "text-[#454545] bg-white"
          }`}
      >
        {/* Sidebar (hidden on `/` and `/auth/*`) */}
        {!hideSidebar && (
          <div className="fixed top-0 left-0 h-screen z-40">
            <Sidebar onCollapse={setCollapsed} />
          </div>
        )}

        {/* Page Content */}
        <div
          className={`flex-1 transition-all duration-300 w-full
            ${!hideSidebar
              ? collapsed
                ? "lg:pl-[90px]"
                : "lg:pl-[270px]"
              : ""
            }`}
        >
          <div
            className={`mb-20 lg:mt-0   lg:mb-5 md:mb-10 ${theme === "dark" ? "text-white bg-black" : "text-[#454545] bg-white"
              }`}
          >
            <main className="lg:pt-0">{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}
