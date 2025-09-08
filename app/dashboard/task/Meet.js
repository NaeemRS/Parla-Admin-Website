// src/pages/dashboard/tasks/index.tsx
import StatsAndFilters from '@/components/common/StatsAndFilters';
import FilterTabs from '@/components/dashboard/task/FilterTabs';
import TaskTabs from '@/components/dashboard/task/TaksTabs';
import { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import DataTable from '@/components/common/DatadTable'; // Fixed import name
import { Icon } from '@iconify/react';
import PauseButtonTimer from '@/components/common/PauseButtonTimer';
import DatePicker from '@/components/common/DatePicker';
import TaskModal from '@/components/modal/TaskModal';
import EmployeeDropdown from '@/components/common/EmployeeDropdown';

const Index = ({ initialTasks }) => {
  const [activeTab, setActiveTab] = useState("Task");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Turkiye");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [taskData, setTaskData] = useState(initialTasks || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debug: Log the initial data
  useEffect(() => {
    console.log('Initial Tasks:', initialTasks);
    console.log('Task Data State:', taskData);
  }, [initialTasks, taskData]);

  // Client-side data fetching as fallback
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Admin/Task/GetAllTask`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` })
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched data:', data);

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

  // If no initial data, fetch on client side
  useEffect(() => {
    if (!initialTasks || initialTasks.length === 0) {
      fetchTasks();
    }
  }, []);
  const tabs = [
    { name: "Task", hasIndicator: false },
    { name: "Mentions", hasIndicator: false },
    { name: "Schedule", hasIndicator: true },
  ];


  const handleTabChange = (selectedTab) => {
    console.log("Active Tab:", selectedTab);
    // do something (fetch data, change view, etc.)
  };
  // Dropdowns
  const countries = [
    {
      value: "Turkiye",
      label: "Turkiye",
      icon: (
        <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
          <span className="text-white text-xs font-bold">TR</span>
        </div>
      )
    },
    { value: "Germany", label: "Germany" },
    { value: "France", label: "France" },
    { value: "Italy", label: "Italy" }
  ];

  const cities = [
    { value: "Istanbul", label: "Istanbul" },
    { value: "Ankara", label: "Ankara" },
    { value: "Izmir", label: "Izmir" },
    { value: "Bursa", label: "Bursa" }
  ];

  const districts = [
    { value: "Kadikoy", label: "Kadikoy" },
    { value: "Besiktas", label: "Besiktas" },
    { value: "Sisli", label: "Sisli" },
    { value: "Uskudar", label: "Uskudar" }
  ];

  // Table columns - handling object values properly
  const columns = [
    {
      key: "name",
      label: "Name",
      render: (value, row) => {
        // Handle if name is an object with firstName, lastName
        let displayName = 'N/A';
        if (typeof value === 'object' && value !== null) {
          displayName = `${value.firstName || ''} ${value.lastName || ''}`.trim() || 'N/A';
        } else if (typeof value === 'string') {
          displayName = value;
        } else if (row.firstName || row.lastName) {
          displayName = `${row.firstName || ''} ${row.lastName || ''}`.trim() || 'N/A';
        }

        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
              <Icon icon="material-symbols:check" className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium text-gray-900">{displayName}</span>
          </div>
        );
      }
    },
    {
      key: "dueDate",
      label: "Due Date",
      render: (value) => {
        if (!value) return 'N/A';
        try {
          return new Date(value).toLocaleDateString();
        } catch (error) {
          return value.toString();
        }
      }
    },
    {
      key: "title",
      label: "Title",
      render: (value) => {
        if (typeof value === 'object') {
          return JSON.stringify(value);
        }
        return value || 'N/A';
      }
    },
    {
      key: "taskVisibility",
      label: "Task Visibility",
      render: (value) => {
        if (typeof value === 'object') {
          return value?.name || value?.label || JSON.stringify(value);
        }
        return value || 'N/A';
      }
    },
    {
      key: "assignees",
      label: "Assignees",
      render: (value) => {
        if (Array.isArray(value)) {
          return value.map(assignee => {
            if (typeof assignee === 'object') {
              return `${assignee.firstName || ''} ${assignee.lastName || ''}`.trim() || assignee.name || assignee._id;
            }
            return assignee;
          }).join(', ') || 'N/A';
        }
        if (typeof value === 'object' && value !== null) {
          return `${value.firstName || ''} ${value.lastName || ''}`.trim() || value.name || 'N/A';
        }
        return value || 'N/A';
      }
    },
    {
      key: "assignedBy",
      label: "Assigned by",
      render: (value) => {
        if (typeof value === 'object' && value !== null) {
          return `${value.firstName || ''} ${value.lastName || ''}`.trim() || value.name || value._id || 'N/A';
        }
        return value || 'N/A';
      }
    },
    {
      key: "status",
      label: "Status",
      render: (value) => {
        let displayValue = 'N/A';
        if (typeof value === 'object' && value !== null) {
          displayValue = value.name || value.label || value.status || JSON.stringify(value);
        } else {
          displayValue = value || 'N/A';
        }

        return (
          <span className="text-gray-900 font-medium">
            {displayValue}
          </span>
        );
      }
    }
  ];

  const handleRowSelect = (rowId) => {
    setSelectedRows((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  };

  const selectedCountryData = countries.find((c) => c.value === selectedCountry);
  const countryIcon = selectedCountryData?.icon || null;



  return (
    <>
      <Header
        title="Tasks"
        buttonLabel="Add Task"
        onButtonClick={() => setIsModalOpen(true)} />
       <div className='md:p-5 p-2'>
        <div className='flex md:justify-between lg:flex-nowrap flex-wrap items-center md:gap-10 gap-8 lg:gap-32 mb-5'>
          <TaskTabs
            tabs={tabs}
            defaultTab="Task"
            onChange={(tabName) => setActiveTab(tabName)}
          />

          {/* Tab contents */}

          <div className='flex justify-end'>
            <PauseButtonTimer />
          </div>
        </div>
        {activeTab === "Mentions" && <p>Mentions content here...</p>}
        {activeTab === "Schedule" && <p>Schedule content here...</p>}
        <>
          {activeTab === "Task" &&
            <>
              <div className='flex justify-between my-10'>
                <DatePicker />
                <EmployeeDropdown />
              </div>
              <FilterTabs />
              <div className="flex items-center justify-between">
                <div className="flex-shrink-0">
                  <h2 className="text-lg font-semibold text-black">
                    Total <span className="text-gray-600">({taskData?.length || 0})</span>
                  </h2>
                </div>
                <StatsAndFilters />
              </div>


              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  Error: {error}
                  <button
                    onClick={fetchTasks}
                    className="ml-4 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Retry
                  </button>
                </div>
              )}

              <div className="    ">
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                    <span className="ml-2">Loading tasks...</span>
                  </div>
                ) : (
                  <DataTable
                    columns={columns}
                    data={taskData}
                    selectedRows={selectedRows}
                    onRowSelect={handleRowSelect}
                    showCheckboxes={false}
                    className="    "
                    rowClassName="border-b border-gray-100"
                  />
                )}
              </div>
            </>
          }
        </>
      </div >
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // 🔥 close modal
      />

    </>
  );
};

export default Index;

// ✅ Fetch tasks server-side
export async function getServerSideProps(context) {
  try {
    // Get token from cookies if available
    const { req } = context;
    const token = req.cookies.token; // Adjust based on how you store the token

    const headers = {
      "Content-Type": "application/json",
    };

    // Add authorization header if token exists
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Admin/Task/GetAllTask`, {
      method: 'GET',
      headers,
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} - ${res.statusText}`);
      return {
        props: {
          initialTasks: [],
        },
      };
    }

    const data = await res.json();
    console.log('Server-side fetched data:', data);

    // Handle different response structures
    const tasks = Array.isArray(data) ? data :
      data.data ? data.data :
        data.tasks ? data.tasks : [];

    return {
      props: {
        initialTasks: tasks,
      },
    };
  } catch (error) {
    console.error("Error fetching tasks in getServerSideProps:", error);
    return {
      props: {
        initialTasks: [],
      },
    };
  }
}