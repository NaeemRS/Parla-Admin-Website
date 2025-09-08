import { useState, useEffect, useContext } from "react";
import { Icon } from "@iconify/react";
import MultiSelectDropdown from "../common/MultiSelectDropdown";
import toast, { Toaster } from "react-hot-toast";
import { ThemeContext } from "@/context/ThemeContext";

const PartnerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const { theme } = useContext(ThemeContext); // ✅ get current theme

  // ✅ All states
  const [partner, setPartner] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [nextMeet, setNextMeet] = useState("");
  const [address, setAddress] = useState("")
  const [location, setLocation] = useState({
    cordinates: []
  })
  const [purpose, setPurpose] = useState("");
  const [assignedBy, setAssignedBy] = useState("Admin");

  // Extra states for API compatibility
  const [employees, setEmployees] = useState([]);
  const [taskVisibility, setTaskVisibility] = useState([]);

  // ✅ Fetch employees
  const getEmployees = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Admin/Task/GetAllEmployee`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setEmployees(data?.data?.employees || []);
  };

  useEffect(() => {
    if (isOpen) getEmployees();
  }, [isOpen]);

  // ✅ Handle API Submit
  const handleApi = async () => {
    if (
      !partner ||
      !description ||
      !gender ||
      !age ||
      !phone ||
      !dateTime ||
      !nextMeet ||
      !address ||
      !location ||
      !purpose ||
      !assignedBy ||
      taskVisibility.length === 0
    ) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("partnerName", partner);
    formData.append("description", description);
    formData.append("gender", gender);
    formData.append("age", age);
    formData.append("phone", phone);
    formData.append("datetime", dateTime);
    formData.append("nextMeet", nextMeet);
    formData.append("address", address);
    formData.append("location", JSON.stringify({
      cordinates: location?.cordinates
    }));
    formData.append("purpose", purpose);
    formData.append("assignedBy", assignedBy = "Admin");
    formData.append("taskVisibility", JSON.stringify(taskVisibility));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Admin/Meet/AddMeet`,
      {
        method: "POST",
        headers: {
          "ngrok-skip-browser-warning": "true",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data?.status === 201) {
      toast.success("Partner Added Successfully");
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      toast.error("Failed to add partner. Try again.");
    }
  };

  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          // Save coordinates
          setLocation({
            cordinates: { lat, lng },
          });

          // Reverse Geocoding - get human readable address
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            const data = await response.json();
            setAddress(data.display_name || "Address not found");
          } catch (error) {
            console.error("Error fetching address:", error);
          }
        },
        (err) => {
          console.error("Error getting location:", err);
        }
      );
    } else {
      alert("Geolocation not supported by your browser");
    }
  };


  return (
    <>
      <Toaster position="top-center" />
      <div className={`fixed inset-0 flex items-center justify-center z-[999]  ${theme === "dark" ? "bg-black/40 text-white" : "bg-black/40 text-gray-900"}`}>
        <div
          className={`max-w-[745px] w-full rounded-lg shadow-lg h-[80vh] flex flex-col 
            ${theme === "dark" ? "bg-[#1F1F1F] text-white" : "bg-white text-gray-900"}`}
        >
          {/* Header */}
          <div className={`border-b ${theme === "dark" ? "border-[#262626]" : "border-gray-200"}`}>
            <div className="flex items-center justify-between gap-4 p-3">
              <div className="flex items-center gap-3">  <button
                onClick={onClose}
                className={`p-2 rounded-full transition-colors ${theme === "dark"
                  ? "hover:bg-[#262626]"
                  : "hover:bg-[#E2E2E2]"
                  }`}
              >
                <Icon
                  icon="heroicons:arrow-left"
                  className={`w-6 h-6 ${theme === "dark" ? "text-gray-300" : "text-[#565656]"}`}
                />
              </button>
                <h2
                  className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                >
                  {partner || "Add Partner"}
                </h2>

              </div>

            </div>
          </div>

          {/* Scrollable Content */}
          <form className="p-4 space-y-4 flex-1 overflow-y-auto relative">
            {/* Partner */}
            <div>
              <label className="block mb-1 font-medium text-base">New Partner</label>
              <input
                type="text"
                maxLength={40}
                value={partner}
                placeholder="Enter partner name"
                onChange={(e) => setPartner(e.target.value)}
                className={`w-full rounded-full px-4 py-3 outline-none focus:ring-0
                    ${theme === "dark"
                    ? "bg-[#2A2A2A]  text-white placeholder-gray-400"
                    : "bg-gray-100 text-gray-900 placeholder-gray-500"}`}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-medium text-base">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add more details..."
                className={`w-full rounded-[22px] max-h-28 px-4 py-3 outline-none focus:ring-0
                    ${theme === "dark"
                    ? "bg-[#2A2A2A]  text-white placeholder-gray-400"
                    : "bg-gray-100  text-gray-900 placeholder-gray-500"}`}
              />
            </div>

            {/* Gender */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 ">
              {/* Task Visibility */}
              <div className="w-full col-span-2">
                <MultiSelectDropdown
                  employees={employees}
                  value={taskVisibility}
                  onChange={setTaskVisibility}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-base">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className={`w-full rounded-full px-4 py-3 outline-none focus:ring-0
                    ${theme === "dark"
                      ? "bg-[#2A2A2A]  text-white placeholder-gray-400"
                      : "bg-gray-100 text-gray-900 placeholder-gray-500"}`}
                >
                  <option disabled>Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Age */}
              <div>
                <label className="block mb-1 font-medium text-base">Age</label>
                <input
                  type="number"
                  min={1}
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className={`w-full rounded-full px-4 py-3 outline-none focus:ring-0
                    ${theme === "dark"
                      ? "bg-[#2A2A2A]  text-white placeholder-gray-400"
                      : "bg-gray-100 text-gray-900 placeholder-gray-500"}`}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-1 font-medium text-base">Phone</label>
                <input
                  type="tel"
                  placeholder="Phone no"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,15}$/.test(value)) {   // sirf 0–15 digits allow karega
                      setPhone(value);
                    }
                  }}
                  className={`w-full rounded-full px-4 py-3 outline-none focus:ring-0
                    ${theme === "dark"
                      ? "bg-[#2A2A2A]  text-white placeholder-gray-400"
                      : "bg-gray-100 text-gray-900 placeholder-gray-500"}`}
                />
              </div>


              {/* Date & Time */}
              <div>
                <label className="block mb-1 font-medium text-base">Date & Time</label>
                <input
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className={`w-full rounded-full px-4 py-3 outline-none focus:ring-0
                    ${theme === "dark"
                      ? "bg-[#2A2A2A]  text-white placeholder-gray-400"
                      : "bg-gray-100 text-gray-900 placeholder-gray-500"}`}
                />
              </div>

              {/* Next Meet */}
              <div>
                <label className="block mb-1 font-medium text-base">Next Meet</label>
                <input
                  type="date"
                  value={nextMeet}
                  onChange={(e) => setNextMeet(e.target.value)}
                  className={`w-full rounded-full px-4 py-3 outline-none focus:ring-0
                    ${theme === "dark"
                      ? "bg-[#2A2A2A]  text-white placeholder-gray-400"
                      : "bg-gray-100 text-gray-900 placeholder-gray-500"}`}
                />
              </div>

              {/* Address */}
              <div>
                <label className="block mb-1 font-medium text-base">Current Location</label>

                <div
                  onClick={handleClick}
                  className={`w-full rounded-full flex items-center gap-2 px-4 py-3 outline-none focus:ring-0
                    ${theme === "dark"
                      ? "bg-[#2A2A2A]  text-white placeholder-gray-400"
                      : "bg-gray-100 text-gray-900 placeholder-gray-500"}`}
                >
                  <Icon icon="mdi:map-marker" className="text-red-500 text-lg" />
                  <span>Current Location</span>
                </div>

                {location.cordinates.lat && (
                  <div className="mt-3">
                    <p> Latitude:  {location.cordinates.lat}</p>
                    <p> Longitude:  {location.cordinates.lng}</p>
                    <p> Address: {address}</p>
                  </div>
                )}

              </div>

              {/* Purpose */}
              <div>
                <label className="block mb-1 font-medium text-base">Purpose</label>
                <input
                  type="text"
                  placeholder="Purpose"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className={`w-full rounded-full px-4 py-3 outline-none focus:ring-0
                    ${theme === "dark"
                      ? "bg-[#2A2A2A]  text-white placeholder-gray-400"
                      : "bg-gray-100 text-gray-900 placeholder-gray-500"}`}
                />
              </div>

              {/* Assigned By */}
              <div>
                <label className="font-medium text-base flex">
                  <Icon icon="heroicons:user" className="w-6 h-6 text-[#3F3F3F] mr-2" /> Assigned by
                </label>
                <input
                  type="text"
                  value={assignedBy}
                  placeholder="Assigned by"
                  // onChange={(e) => setAssignedBy(e.target.value)}
                  className={`w-full rounded-full px-4 py-3 outline-none focus:ring-0
                    ${theme === "dark"
                      ? "bg-[#2A2A2A]  text-white placeholder-gray-400"
                      : "bg-gray-100 text-gray-900 placeholder-gray-500"}`}
                />
              </div>
            </div>
          
          </form>
            <div className={`flex justify-end items-center p-4        
                        ${theme === "dark"
                      ? "bg-[#2A2A2A]  text-white  "
                      : "bg-white text-gray-900  "}`}>
              <button
                onClick={handleApi}
                className="px-4 md:h-[40px] rounded-xl cursor-pointer   text-base font-medium transition-all
                bg-orange-500 text-white shadow-md"
              >
                Submit
              </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default PartnerModal;
