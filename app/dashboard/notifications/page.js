"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";
import NotificationDrawer from "@/components/dashboard/notifications/NotificationDrawer";
import NotificationModal from "@/components/modal/NotificationModal";
import Loader from "@/components/Loader";          // 👈  apna loader import karo
import toast from "react-hot-toast";

export default function index() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(true);
  const [notification, setNotification] = useState([]);
  const [isOpenNotificationModal, setIsOpenNotificationModal] = useState(false);
  const [loading, setLoading] = useState(true);   // 👈  NEW

  // ------------------- API CALL -------------------
  const fetchNotification = async () => {
    setLoading(true);                             // 👈  loader ON
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Admin/Notification/getAllNotification`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      const data = await res.json();
      setNotification(data || []);
    } catch (err) {
      toast.error("Error in fetching Notifications");
    } finally {
      setLoading(false);                          // 👈  loader OFF
    }
  };

  // fire once on mount
  useEffect(() => {
    fetchNotification();
  }, []);

  // ------------------- UI -------------------------
  if (loading) {
    // Jabtak data load nahi hota
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader />                                {/* 👈 Loader dikhao */}
      </div>
    );
  }

  // data aa gaya, ab normal screen dikhao
  return (
    <>
      <Header title={t("header.notifications")} buttonLabel={t("header.addNotifications")} />

      <NotificationDrawer
        open={open}
        setOpen={setOpen}
        notification={notification}
        setIsOpenNotificationModal={setIsOpenNotificationModal}
      />

      <NotificationModal
        isOpenNotificationModal={isOpenNotificationModal}
        setOpen={setOpen}
        setIsOpenNotificationModal={setIsOpenNotificationModal}
      />
    </>
  );
}