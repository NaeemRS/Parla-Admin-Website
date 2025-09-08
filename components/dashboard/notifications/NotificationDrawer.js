"use client";
import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/context/ThemeContext";

export default function NotificationDrawer({
  open,
  setOpen,
  notification,
  setIsOpenNotificationModal,
}) {
  const { theme } = useContext(ThemeContext); // ✅ Get theme
  const router = useRouter();

  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/5 backdrop-blur-xs z-[9999]">
          {/* Drawer */}
          <div
            className={`fixed top-0 left-[270px] h-full w-[560px] shadow-lg z-[999] transform transition-transform duration-300 
              ${theme === "dark" ? "bg-[#1e1e1e] text-white" : "bg-white text-black"} 
              ${open ? "translate-x-0" : "translate-x-full"}`}
          >
            {/* Header */}
            <div
              className={`flex justify-between items-center p-4 border-b 
                ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
            >
              <button
                onClick={() => {
                  setOpen(false), setIsOpenNotificationModal(true);
                }}
                className="h-[52px] px-4 cursor-pointer bg-black text-white text-sm mr-10 whitespace-nowrap font-semibold rounded-[10px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Add Notifications
              </button>

              <p className="font-medium text-base w-full">New notifications</p>

              <div className="flex items-center gap-4">
                <Icon
                  icon="mdi:settings-outline"
                  className="text-xl cursor-pointer"
                />
                <Icon
                  icon="mdi:close"
                  className="text-xl cursor-pointer"
                  onClick={() => {
                    setOpen(false), router.push("/dashboard/task");
                  }}
                />
              </div>
            </div>

            {/* Notifications Section */}
            <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
              {/* Today */}
              <p className="font-medium text-lg mb-5">New</p>
              <p
                className={`font-medium text-center text-base mb-2 
                  ${theme === "dark" ? "text-gray-400" : "text-[#8593A8]"}`}
              >
                {notification?.recent?.length === 0 && "No New Notification"}
              </p>

              {notification?.recent?.map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <div className="flex flex-col gap-3">
                    {item?.recipients?.map((recipient, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <img
                          src={recipient?.user.image}
                          alt={`${recipient?.user?.firstName} ${recipient?.user?.lastName}`}
                          className="w-10 h-10 rounded-full border border-gray-500"
                        />
                        <div>
                          <p className="text-sm font-semibold">
                            {`${recipient?.user.firstName}  ${!recipient?.user?.lastName  ? "" :  recipient?.user.lastName } ${item?.title} by ${item?.createdBy.role === "Admin"
                              ? "Admin"
                              : item?.createdBy.role
                              }`}
                          </p>
                          <p
                            className={`text-xs ${theme === "dark"
                              ? "text-gray-500"
                              : "text-gray-400"
                              }`}
                          >
                            {item.details}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Last 7 Days */}
              <p className="font-medium mt-4 mb-5 text-lg">Last 7 days</p>
              {notification?.older?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex flex-col gap-3">
                    {item?.recipients?.map((recipient, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <img
                          src={recipient?.user.image}
                          alt={`${recipient?.user?.firstName} ${recipient?.user?.lastName}`}
                          className="w-10 h-10 rounded-full border border-gray-500"
                        />
                        <div>
                          <p className="text-sm font-semibold">
                            {`${recipient?.user.firstName} ${recipient?.user.lastName} ${item?.title} by ${item?.createdBy.role === "Admin"
                              ? "Admin"
                              : item?.createdBy.role
                              }`}
                          </p>
                          <p
                            className={`text-xs ${theme === "dark"
                              ? "text-gray-500"
                              : "text-gray-400"
                              }`}
                          >
                            {item.details}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
