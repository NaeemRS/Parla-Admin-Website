"use client"
import DataTable from '@/components/common/DatadTable'; // Fixed import name
import DatePicker from '@/components/common/DatePicker';
import EmployeeDropdown from '@/components/common/EmployeeDropdown';
import PauseButtonTimer from '@/components/common/PauseButtonTimer';
import StatsAndFilters from '@/components/common/StatsAndFilters';
import { columns, meetColumns, tabs } from '@/components/content/ContentData';
import FilterTabs from '@/components/dashboard/task/FilterTabs';
import TaskTabs from '@/components/dashboard/task/TaksTabs';
import TaskModal from '@/components/modal/TaskModal';
import { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import Paginate from '@/components/common/Paginate';
import PartnerModal from '@/components/modal/PartnerModal';
import TaskHeader from '@/components/common/TaskHeader';
import Loader from '@/components/Loader';
import { useLanguage } from '@/context/LanguageContext';

const TaskPage = ({ initialTasks }) => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentItems, setCurrentItems] = useState([]);
  const [meetsItems, setMeetsItems] = useState([]);
  const [activeTab, setActiveTab] = useState("Task");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isMeetModalOpen, setIsMeetModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [taskData, setTaskData] = useState(initialTasks || []);
  const [meetData, setMeetData] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState();

  // Search state - ADDITION
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTaskData, setFilteredTaskData] = useState([]);
  const [filteredMeetData, setFilteredMeetData] = useState([]);


  // Filter data based on search term
  const filterData = (data, searchTerm) => {
    if (!searchTerm.trim()) return data;

    return data.filter(item => {
      const searchLower = searchTerm.toLowerCase();

      // Search in title, partner name, employee name, description, etc.
      return (
        (item.title && item.title.toLowerCase().includes(searchLower)) ||
        (item.partnerName && item.partnerName.toLowerCase().includes(searchLower)) ||
        (item.employeeName && item.employeeName.toLowerCase().includes(searchLower))

      );
    });
  };

  // Update filtered data when search term or original data changes
  useEffect(() => {
    const filteredTasks = filterData(taskData, searchTerm);
    const filteredMeets = filterData(meetData, searchTerm);

    setFilteredTaskData(filteredTasks);
    setFilteredMeetData(filteredMeets);
  }, [taskData, meetData, searchTerm]);

  // Update current items based on filtered data
  useEffect(() => {
    setCurrentItems(filteredTaskData);
    setMeetsItems(filteredMeetData);
  }, [filteredTaskData, filteredMeetData]);

  // Handle search from Header component
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Admin/Task/GetAllTask?status=${activeFilter}&employeeId=${employeeId?._id}`,
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

      // Handle different response structures
      const tasks = Array.isArray(data) ? data :
        data.data ? data.data :
          data.tasks ? data.tasks : [];

      setTaskData(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMeets = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Admin/Task/GetAllTask?employeeId=${employeeId?._id}&status=${activeFilter}`,
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

      // Handle different response structures
      const meets = Array.isArray(data) ? data :
        data.data ? data.data :
          data.meets ? data.meets : [];

      setMeetData(meets);
    } catch (error) {
      console.error("Error fetching meets:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeFilter !== "Meets") {
      fetchTasks();
    } else if (activeFilter === "Meets") {
      fetchMeets();
    }
  }, [activeFilter, employeeId]);

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
  }

  useEffect(() => {
    getEmployees();
  }, [])

  const handleTabChange = (selectedTab) => {
    console.log("Active Tab:", selectedTab);
  };

  const handleRowSelect = (rowId) => {
    setSelectedRows((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  };

  return (
    <>
      <Header
        title={activeFilter === "Meets" ? t('tabs.meets') : t('tabs.task')}
        buttonLabel={activeFilter === "Meets" ? t('header.addMeet') : t('header.addTask')}
        onButtonClick={() =>
          activeFilter === "Meets"
            ? setIsMeetModalOpen(true)
            : setIsTaskModalOpen(true)
        }
        onSearch={handleSearch} // Pass search handler to Header
      />

      <div className='md:p-5 p-2'>
        <div className='flex md:justify-between lg:flex-nowrap flex-wrap items-center md:gap-10 gap-8 lg:gap-32 mb-5'>
          <TaskTabs
            tabs={tabs}
            defaultTab="Task"
            onChange={(tabName) => setActiveTab(tabName)}
          />

          <div className='flex justify-end'>
            <PauseButtonTimer />
          </div>
        </div>

        {activeTab === "Mentions" && <p>Mentions content here...</p>}
        {activeTab === "Schedule" && <p>Schedule content here...</p>}

        <>
          {activeTab === "Task" &&
            <>
              <div className='flex md:justify-between lg:flex-nowrap lg:gap-10 2xl:gap-20 xl:gap-14 gap-4  flex-wrap md:mt-5 lg:mt-12 '>
                <div className='md:w-[70%] w-full'>
                  <DatePicker />
                </div>
                <EmployeeDropdown employees={employees} setEmployeeId={setEmployeeId} employeeId={employeeId} />
              </div>

              <div className="md:mb-11 lg:mt-16 mt-5 mb-5">
                <FilterTabs
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                />
              </div>

              <div className="flex items-center justify-between md:flex-nowrap flex-wrap">
                <TaskHeader count={
                  activeFilter === "Meets"
                    ? filteredMeetData.length
                    : filteredTaskData.length
                } />
                <StatsAndFilters />
              </div>

              <div className='lg:mt-21 md:mt-10 mt-7'>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    {activeFilter === "Meets" ? (
                      <>
                        <DataTable
                          columns={meetColumns}
                          data={meetsItems}
                          selectedRows={selectedRows}
                          onRowSelect={handleRowSelect}
                          showCheckboxes={false}
                        />
                      </>
                    ) : (
                      <DataTable
                        columns={columns}
                        data={currentItems}
                        selectedRows={selectedRows}
                        onRowSelect={handleRowSelect}
                        showCheckboxes={false}
                      />
                    )}
                  </>
                )}
              </div>

              <div className="flex justify-center items-center mt-4">
                {activeFilter === "Meets" ? (
                  filteredMeetData.length >= 6 && (
                    <Paginate data={filteredMeetData} onindexDataChange={setMeetsItems} />
                  )
                ) : (
                  filteredTaskData.length >= 6 && (
                    <Paginate data={filteredTaskData} onPageDataChange={setCurrentItems} />
                  )
                )}
              </div>
            </>
          }
        </>
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />
      <PartnerModal
        isOpen={isMeetModalOpen}
        onClose={() => setIsMeetModalOpen(false)}
      />
    </>
  );
};

export default TaskPage;