import { useEffect, useState, useContext } from "react";
import { Icon } from "@iconify/react";
import MultiSelectDropdown from "../common/MultiSelectDropdown";
import toast, { Toaster } from "react-hot-toast";
import { ThemeContext } from "@/context/ThemeContext"; // ✅ import theme context
import { useLanguage } from "@/context/LanguageContext";

const TaskModal = ({ isOpen, onClose }) => {
  const { theme } = useContext(ThemeContext); // ✅ get current theme
  const { t } = useLanguage();

  // const [title, setTitle] = useState("");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [assignedBy, setAssignedBy] = useState("Admin");
  // const [titleName, setTitleName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("");
  const [taskVisibility, setTaskVisibility] = useState([]);
  // const [comment, setComment] = useState("");
  const [employees, setEmployees] = useState([]);

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

  const handleApi = async () => {
    if (
      // !title ||
      !taskName ||
      !description ||
      !assignedBy ||
      // !titleName ||
      !dueDate ||
      !assignee ||
      !taskVisibility
    ) {
      toast.error(t('taskModal.fillAll', 'Please fill in all fields before submitting.'));
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    // formData.append("title", title);
    formData.append("taskName", taskName);
    formData.append("description", description);
    formData.append("assignedBy", assignedBy);
    // formData.append("titleName", titleName);
    formData.append("dueDate", dueDate);
    formData.append("assigner", assignee);
    formData.append("taskVisibility", taskVisibility);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Admin/Task/AddTask`,
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
      toast.success(t('taskModal.added', 'Task Added Successfully'));
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      toast.error(t('taskModal.notAdded', 'Task Not Added. Try Again'));
    }
  };

  if (!isOpen) return null;
  return (
    <>
      <Toaster position="top-center" />
      <div
        className={`fixed inset-0 flex items-center justify-center z-[999]  ${
          theme === "dark"
            ? "bg-black/40 text-white"
            : "bg-black/40 text-gray-900"
        }`}
      >
        <div
          className={`max-w-[745px] w-full rounded-lg shadow-lg flex flex-col 
            ${
              theme === "dark"
                ? "bg-[#1F1F1F] text-white"
                : "bg-white text-gray-900"
            }`}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between p-4 border-b 
              ${theme === "dark" ? "border-[#2A2A2A]" : "border-gray-200"}`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className={`${
                  theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-[#2A2A2A] hover:text-black"
                }`}
              >
                <Icon icon="heroicons:arrow-left" className="w-6 h-6" />
              </button>
              {/* <span className="text-lg font-medium">
                {title ? title : "Add Task Title"}
              </span> */}
            </div>
          </div>

          {/* Scrollable Content */}
          <form className="p-4 space-y-4 flex-1 overflow-y-auto">
            {/* Title */}
            {/* <div>
              <label className="font-medium text-base">Title</label>
              <input
                type="text"
                value={title}
                placeholder="Enter title"
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full rounded-full px-4 py-3 outline-none focus:ring-0
                    ${
                      theme === "dark"
                        ? "bg-[#2A2A2A]  text-white placeholder-gray-400"
                        : "bg-gray-100 text-gray-900 placeholder-gray-500"
                    }`}
              />
            </div> */}

            {/* Task Name */}
            <div>
              <label className="font-medium text-base">{t('taskModal.taskName', 'Task Name')}</label>
              <input
                type="text"
                value={taskName}
                placeholder={t('taskModal.taskNamePlaceholder', 'Enter task name')}
                onChange={(e) => setTaskName(e.target.value)}
                className={`w-full rounded-full px-4 py-3 outline-none focus:ring-0
                    ${
                      theme === "dark"
                        ? "bg-[#2A2A2A]  text-white placeholder-gray-400"
                        : "bg-gray-100 text-gray-900 placeholder-gray-500"
                    }`}
              />
            </div>

            {/* Description */}
            <div>
              <label className="font-medium text-base">{t('taskModal.description', 'Description')}</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('taskModal.descriptionPlaceholder', 'Add more details to this task...')}
                className={`w-full rounded-xl h-24 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500
                  ${
                    theme === "dark"
                      ? "bg-[#2A2A2A] text-white placeholder-gray-400"
                      : "bg-gray-100 text-gray-900 placeholder-gray-500"
                  }`}
              />
            </div>

            {/* Task Visibility */}
            <div className="w-full col-span-2">
              <MultiSelectDropdown
                employees={employees}
                value={taskVisibility}
                onChange={setTaskVisibility}
              />
            </div>

            {/* Assigned By */}
            <div>
              <label className="font-medium text-base flex items-center gap-2">
                <Icon icon="heroicons:user" className="w-5 h-5" /> {t('taskModal.assignedBy', 'Assigned by')}
              </label>
              <input
                type="text"
                value={assignedBy}
                onChange={(e) => setAssignedBy(e.target.value)}
                placeholder={t('taskModal.assignedBy', 'Assigned by')}
                // onChange={(e) => setAssignedBy(e.target.value)}
                className={`w-full rounded-full px-4 py-3 outline-none focus:ring-0
                    ${
                      theme === "dark"
                        ? "bg-[#2A2A2A]  text-white placeholder-gray-400"
                        : "bg-gray-100 text-gray-900 placeholder-gray-500"
                    }`}
              />
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Due Date */}
              <div>
                <label className="font-medium text-base flex items-center gap-2">
                  <Icon icon="heroicons:calendar" className="w-5 h-5" />
                  {t('taskModal.dueDate', 'Due Date')}
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className={`w-full rounded-full px-4 py-3 outline-none focus:ring-0
                    ${
                      theme === "dark"
                        ? "bg-[#2A2A2A]  text-white placeholder-gray-400"
                        : "bg-gray-100 text-gray-900 placeholder-gray-500"
                    }`}
                />
              </div>

              {/* TitleName */}
              {/* <div>
                <label className="font-medium text-base">Title Name</label>
                <select
                  value={titleName}
                  onChange={(e) => setTitleName(e.target.value)}
                  className={`w-full rounded-full px-4 py-3 outline-none focus:ring-0
                    ${
                      theme === "dark"
                        ? "bg-[#2A2A2A]  text-white placeholder-gray-400"
                        : "bg-gray-100 text-gray-900 placeholder-gray-500"
                    }`}
                >
                  <option disabled>Title Name</option>
                  <option>Developer</option>
                  <option>Designer</option>
                  <option>Manager</option>
                </select>
              </div> */}

              {/* Assignee */}
              <div>
                <label className="font-medium text-base flex items-center gap-2">
                  <Icon icon="heroicons:user" className="w-5 h-5" /> {t('taskModal.assignee', 'Assignee')}
                </label>
                <input
                  type="text"
                  placeholder={t('taskModal.assignee', 'Assignee')}
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className={`w-full rounded-full px-4 py-3 outline-none focus:ring-0
                    ${
                      theme === "dark"
                        ? "bg-[#2A2A2A]  text-white placeholder-gray-400"
                        : "bg-gray-100 text-gray-900 placeholder-gray-500"
                    }`}
                />
              </div>
            </div>
          </form>

          {/* Footer */}
          <div
            className={`p-4 border-t 
              ${
                theme === "dark"
                  ? "bg-[#1F1F1F] border-[#2A2A2A]"
                  : "bg-white border-gray-200"
              }`}
          >
            <div className="flex justify-end items-center gap-3">
              <button
                onClick={handleApi}
                className="px-4 md:h-[40px] rounded-xl cursor-pointer   text-base font-medium transition-all
                bg-orange-500 text-white shadow-md"
              >
                {t('taskModal.submit', 'Submit')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskModal;
