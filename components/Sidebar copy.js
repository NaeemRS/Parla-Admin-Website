import { ThemeContext } from "@/context/ThemeContext";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname, } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const menuItems = [
  {
    label: "News",
    href: "/dashboard/news",
    icon: "/images/sidebar-icon-b/News.svg",
    activeIcon: "/images/sidebar-icon-w/News.svg",
  },
  {
    label: "Task",
    href: "/dashboard/task",
    icon: "/images/sidebar-icon-b/Task.svg",
    activeIcon: "/images/sidebar-icon-w/Task.svg",
  },
  {
    label: "Appointments",
    href: "/dashboard/appointments",
    icon: "/images/sidebar-icon-b/Appointments.svg",
    activeIcon: "/images/sidebar-icon-w/Appointments.svg",
  },
  {
    label: "Message",
    href: "/dashboard/message",
    icon: "/images/sidebar-icon-b/Message.svg",
    activeIcon: "/images/sidebar-icon-w/Message.svg",
  },
  {
    label: "Notifications",
    href: "/dashboard/notifications",
    icon: "/images/sidebar-icon-b/Notifications.svg",
    activeIcon: "/images/sidebar-icon-w/Notifications.svg",
  },
  {
    label: "Offers",
    href: "/dashboard/offers",
    icon: "/images/sidebar-icon-b/Offers.svg",
    activeIcon: "/images/sidebar-icon-w/Offers.svg",
  },
  {
    label: "Statistics",
    href: "/dashboard/statistics",
    icon: "/images/sidebar-icon-b/Statistics.svg",
    activeIcon: "/images/sidebar-icon-w/Statistics.svg",
  },
  {
    label: "Finance",
    href: "/dashboard/finance",
    icon: "/images/sidebar-icon-b/Finance.svg",
    activeIcon: "/images/sidebar-icon-w/Finance.svg",
  },
  {
    label: "Offices",
    href: "/dashboard/offices",
    icon: "/images/sidebar-icon-b/Offices.svg",
    activeIcon: "/images/sidebar-icon-w/Offices.svg",
  },
  {
    label: "Employees",
    href: "/dashboard/employees",
    icon: "/images/sidebar-icon-b/Employees.svg",
    activeIcon: "/images/sidebar-icon-w/Employees.svg",
  },
  {
    label: "Search",
    href: "/dashboard/search",
    icon: "/images/sidebar-icon-b/Search.svg",
    activeIcon: "/images/sidebar-icon-w/Search.svg",
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: "/images/sidebar-icon-b/Users.svg",
    activeIcon: "/images/sidebar-icon-w/Users.svg",
  },
  {
    label: "Partners",
    href: "/dashboard/partners",
    icon: "/images/sidebar-icon-b/Partners.svg",
    activeIcon: "/images/sidebar-icon-w/Partners.svg",
  },
  {
    label: "Map",
    href: "/dashboard/map",
    icon: "/images/sidebar-icon-b/Map.svg",
    activeIcon: "/images/sidebar-icon-w/Map.svg",
  },
  {
    label: "Scholarship",
    href: "/dashboard/scholarship",
    icon: "/images/sidebar-icon-b/Scholarship.svg",
    activeIcon: "/images/sidebar-icon-w/Scholarship.svg",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: "/images/sidebar-icon-b/Settings.svg",
    activeIcon: "/images/sidebar-icon-w/Settings.svg",
  },
  {
    label: "Sign out",
    href: "/dashboard/logout",
    icon: "/images/sidebar-icon-b/Signout.svg",
    activeIcon: "/images/sidebar-icon-w/Signout.svg",
  },
];

export default function Sidebar({ onCollapse }) {
  const { theme } = useContext(ThemeContext);
  const pathname = usePathname(); // 👈 yeh hook use karo
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (onCollapse) onCollapse(collapsed);
  }, [collapsed, onCollapse]);

  return (
    <>


      {/* Alternative: Menu Icon Button */}
      <button
        className="lg:hidden fixed top-3 right-6 z-[9999] p-2   shadow-lg rounded-md border hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <Icon icon="ic:round-menu" width="20" height="20" className="text-gray-700" />
      </button>
      <aside
        className={`fixed top-0 left-0 h-screen shadow-lg z-[999] transform transition-all duration-300 
  ${theme === "dark" ? "text-white bg-black border-r border-[#353434] shadow-[4px_0_10px_rgba(0,0,0,0.2)]" : "text-[#454545] bg-white shadow-[4px_0_10px_rgba(0,0,0,0.2)]"}  
  ${open ? "w-[270px] translate-x-0" : "w-0 -translate-x-full"} 
  ${collapsed ? "lg:w-[80px] w-0" : "lg:w-[270px]"} 
  lg:translate-x-0`}

      >
        <div className="flex items-center justify-between px-4 py-2   relative  lg:sticky lg:top-0      z-10">
          {theme === "dark" ?
            <img
              src={`${collapsed ? "/images/softthrive.svg" : "/images/dark-logo.png"}`}
              alt="Logo"
              className={`transition-all duration-300 ${collapsed ? "w-[50px]" : "w-[187px]"}`}
            />
            :
            <img
              src={`${collapsed ? "/images/softthrive.svg" : "/images/light-logo.png"}`}
              alt="Logo"
              className={`transition-all duration-300 ${collapsed ? "w-[50px]" : "w-[187px]"}`}
            />
          }

          <button
            className="hidden lg:flex p-1   shadow-lg rounded-full  absolute -right-3"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <Icon icon="mdi:chevron-right" width="30" height="30" />
            ) : (
              <Icon icon="mdi:chevron-left" width="30" height="30" />
            )}
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <ul className="flex flex-col gap-2">
            {menuItems.map((item, idx) => {
              const isActive = pathname === item.href; // 👈 asPath ki jagah
              return (
                <li key={idx} onClick={() => { setOpen(false) }}>
                  <Link href={item.href}>
                    <div
                      className={`flex items-center relative gap-3 px-4 py-2 rounded-[6px] cursor-pointer transition 
                      ${isActive
                          ? "bg-[#FF6B00] text-white font-semibold mr-2 ml-5"
                          : theme === "dark"
                            ? "text-white hover:bg-gray-800 ml-5"
                            : "text-[#101110] mr-2 ml-5 hover:bg-[#FFE5D0]"
                        }`}
                    >
                       {isActive ? <div className="w-[9px] h-full bg-[#FF6B00] absolute -left-5 rounded-tr-[5px] rounded-br-[5px] "></div>
                        : <></>}
                      <img
                        src={
                          isActive
                            ? theme === "light"
                              ? item.activeIcon || item.activeIcon // use dark version if available
                              : item.icon
                            : theme === "dark"
                              ? item.activeIcon || item.activeIcon
                              : item.icon
                        }
                        alt={item.label}
                        className="h-6 w-6"
                      />
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
      {/* Backdrop for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-[#00000017] bg-opacity-40 z-[99] lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}


