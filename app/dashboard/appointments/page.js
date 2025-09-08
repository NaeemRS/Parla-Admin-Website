// src/pages/dashboard/tasks/index.tsx
"use client"
import DataTable from '@/components/common/DatadTable'; // Fixed import name
import StatsAndFilters from '@/components/common/StatsAndFilters';
import { AddAppointment, AppointmentTabs, dummyProfessionals, sampleData } from '@/components/content/ContentData';
import TaskTabs from '@/components/dashboard/task/TaksTabs';
import CustomerModal from '@/components/modal/CustomerModal';
import ProfessionalModal from '@/components/modal/ProfessionalModal';
import ServiceModal from '@/components/modal/ServiceModal';
import { use, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../../../components/Header';
import { useLanguage } from '@/context/LanguageContext';
import Loader from '@/components/Loader';
import ChooseDateModal from '@/components/modal/ChooseDateModal';
import AppointmentDetailsModal from '@/components/modal/AppointmentDetailsModal';
import PaginationService from '@/components/PaginateService';
import TaskHeader from '@/components/common/TaskHeader';
import { useRouter } from 'next/navigation';
import Paginate from '@/components/common/Paginate'; // ADDITION - Import Paginate
import AppointmentTable from '@/components/tabels/AppointmentTable';

const Index = ({ initialTasks }) => {
  const { t } = useLanguage();
  const [customerId, setCustomerId] = useState(null);
  const [serviceModal, setServiceModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Popular");
  const [activeCategory, setActiveCategory] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("Hair");
  // ↑ at the top of Index component (add these two lines)
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [date1, setDate1] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [professionalModal, setProfessionalModal] = useState(false)
  const [chooseDateModal, setChooseDateModal] = useState(false);
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [professional, setProfessional] = useState([]);
  const [employeedId, setEmployeedId] = useState("");
  const [page, setPage] = useState(1);
  const [paginationService, setPaginationService] = useState(null);
  const [dateData, setDateData] = useState([]);
  const router = useRouter();

  // ADDITION - Search state
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [detailOpen, setDetailOpen] = useState(false);
  console.log('hello', detailOpen);
  useEffect(() => {
    localStorage.removeItem("customerId")
    localStorage.removeItem("service")
    localStorage.removeItem("employeeId")
  }, [])

  // ADDITION - Filter data based on search term
  const filterData = (data, searchTerm) => {
    if (!searchTerm.trim()) return data;

    return data.filter(item => {
      const searchLower = searchTerm.toLowerCase();

      return (
        (item.serviceName && item.serviceName.toLowerCase().includes(searchLower)) ||
        (item.customerDetails?.firstName && item.customerDetails.firstName.toLowerCase().includes(searchLower)) ||
        (item.customerDetails?.lastName && item.customerDetails.lastName.toLowerCase().includes(searchLower)) ||
        (item.serviceCategory && item.serviceCategory.toLowerCase().includes(searchLower)) ||
        (item.status && item.status.toLowerCase().includes(searchLower)) ||
        (item.employeeName && item.employeeName.toLowerCase().includes(searchLower))
      );
    });
  };

  // ADDITION - Update filtered data when search term changes
  useEffect(() => {
    const filtered = filterData(appointments, searchTerm);
    setFilteredAppointments(filtered);
  }, [appointments, searchTerm]);

  // ADDITION - Update current items based on filtered data
  useEffect(() => {
    setCurrentItems(filteredAppointments);
  }, [filteredAppointments]);

  // ADDITION - Handle search from Header component
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  // Get Services When Modal Open
  useEffect(() => {
    if (!serviceModal) return;

    let fetched = false;
    if (!fetched) {
      handleGetServices();
      fetched = true;
    }
  }, [serviceModal, activeFilter, activeCategory, page]);

  // Get Professional When Modal Open
  useEffect(() => {
    if (!professionalModal) return;

    let fetched = false;
    if (!fetched) {
      handleGetProfessional();
      fetched = true;
    }
  }, [professionalModal]);

  // Get Appointments
  useEffect(() => {
    handleGetAppointment();
  }, [activeTab]);

  // Get Appointment
  const handleGetAppointment = async () => {
    try {
      setLoading(true);
      let type;
      type = activeTab === "Hair" ? "hair" : activeTab === "Beauty" ? "beauty" : "massage";
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Admin/Appointment/getAllAppointments?type=${type}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );
      const data = await response.json();
      if (data.status === 200) {
        setLoading(false);
        setAppointments(data?.data || []);
        return
      }
    } catch (error) {
      setLoading(false);
      toast.error("Appointment Not Fetched. Please Try Again")
    }
  }

  // Customer Function
  const handleGetCustomers = async (letters, search) => {
    // setLoading(true);
    setIsModalOpen(true);
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Admin/Appointment/getAllCustomer?letter=${letters}&search=${search}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    const data = await response.json();
    if (data.status === 200) {
      // setLoading(false)
      // setIsModalOpen(true);
      setCustomers(data?.data || []); // 👈 store employees here
      return
    }
    // setLoading(false) 
    // setIsModalOpen(false);
    toast.error("Error Fetcing Customers. Please Try Again.")
  }

  const handleCustomerSelect = async (id) => {
    setCustomerId(id);          // save selected customer
    setIsModalOpen(false); // close customer modal
    setTimeout(async () => {
      setServiceModal(true); // open service modal
    }, 300);
  }

  // Service Function
  const handleGetServices = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Admin/Appointment/getServices?gender=${activeFilter}&category=${activeCategory}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );
    const data = await response.json();
    if (data.status === 200) {
      setPaginationService(data.pagination)
      setServices(data?.data || []); // 👈 store employees here
      return
    }
    toast.error("Error Fetcing Services. Please Try Again.")
  }

  const handleServiceSelect = async (service) => {
    setServiceId(service);          // complete service object
  }

  const handleContinue = async () => {
    if (!serviceId) {
      toast.error("Please select the service")
    }
    localStorage.setItem("service", JSON.stringify(serviceId));
    setServiceModal(false);
    setProfessionalModal(true)
  }

  // Employee Function
  const handleGetProfessional = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Admin/Appointment/getEmployees?branchId=${serviceId?.branchId}&category=${serviceId?.category}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    const data = await response.json();
    if (data.status === 200) {
      setProfessional(data?.data || []); // 👈 store professional here
      return
    }
    toast.error("Error Fetcing Professional. Please Try Again.")
  }

  const handleEmployeeSelect = async (id) => {
    setEmployeedId(id);          // complete service object
  }

  const handleContinueProfessional = async () => {
    if (!employeedId) {
      toast.error("Please select the employee")
    }

    const filter = professional?.filter((item) => {
      return item?._id === employeedId
    })
    setDateData(filter)
    localStorage.setItem("employeeId", JSON.stringify(employeedId));
    setProfessionalModal(false);
    setChooseDateModal(true)
  }

  const openDetailModal = async () => {
    setChooseDateModal(false)
    setIsOpenDetailModal(true)
  }

  const onSave = async (date, slot) => {
    const localDate = new Date(date);
    const dates = localDate.toISOString();
    const customerId = localStorage.getItem("customerId")
    const service = localStorage.getItem("service")
    const employeeId = localStorage.getItem("employeeId")
    const obj = {
      customerId,
      service: JSON.parse(service),
      employeeId: JSON.parse(employeeId),
      dates,
      slot,
    };

    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Admin/Appointment/addAppointment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(obj), // 👈 yahan body bhejni hai
      }
    );
    const data = await response.json();
    if (data?.success === 200) {
      localStorage.removeItem("customerId")
      localStorage.removeItem("employeeId")
      localStorage.removeItem("service")
      router.push("/dashboard/appointments");
    }
    setChooseDateModal(false)
  }

  return (
    <>
      <Toaster position="top-right" />
      <Header
        title={t('header.appointment')}
        buttonLabel={t('header.addAppointment')}
        onButtonClick={() =>
          handleGetCustomers()
        }
        onSearch={handleSearch} // ADDITION - Pass search handler to Header
      />

      <div className='md:p-5 p-2'>
        <div className='flex md:justify-between lg:flex-nowrap flex-wrap items-center md:gap-10 gap-8 lg:gap-32 mb-5'>
          <TaskTabs
            tabs={AppointmentTabs}
            defaultTab="Hair"
            onChange={(tabName) => setActiveTab(tabName)}
          />
        </div>

        {(activeTab === "Hair" || activeTab === "Beauty" || activeTab === "Massage") && (
          <>
            <div className="flex items-center justify-between">
              <TaskHeader count={filteredAppointments.length} /> {/* ADDITION - Show filtered count */}
              <StatsAndFilters />
            </div>
            <div className="mt-21">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
              ) : (
                <AppointmentTable
                  columns={AddAppointment}
                  data={currentItems}
                  showCheckboxes={false}
                  onRowClick={(row) => {
                    console.log('row clicked id:', row._id || row.id);   // should be a real string
                    setSelectedId(row._id || row.id);
                    setDetailOpen(true);
                  }}

                />
              )}
            </div>

            {/* ADDITION - Pagination */}
            <div className="flex justify-center items-center mt-4">
              {filteredAppointments.length >= 6 && (
                <Paginate data={filteredAppointments} onPageDataChange={setCurrentItems} />
              )}
            </div>
          </>
        )}
      </div>

      <CustomerModal
        customerId={customerId}
        customers={customers}
        handleStepContinue={handleCustomerSelect}
        handleGetCustomers={handleGetCustomers}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ServiceModal
        isOpen={serviceModal}
        servicescloseModal={() => {
          setServiceModal(false);
          setIsModalOpen(true);
        }}
        services={services}
        setActiveFilter={setActiveFilter}
        activeFilter={activeFilter}
        setActiveCategory={setActiveCategory}
        activeCategory={activeCategory}
        handleServiceSelect={handleServiceSelect}
        handleContinue={handleContinue}
        paginationService={paginationService}
        setPage={setPage}
      />

      <ProfessionalModal
        isOpen={professionalModal}
        selectedDateModal={chooseDateModal}
        onClose={() => {
          setProfessionalModal(false), setServiceModal(true);
          setIsModalOpen(false);
        }}
        handleContinueProfessional={handleContinueProfessional}
        handleEmployeeSelect={handleEmployeeSelect}
        professionals={professional}
        employeedId={employeedId}
      />

      <ChooseDateModal
        openDetailModal={openDetailModal}
        isOpen={chooseDateModal}
        onClose={() => {
          setProfessionalModal(true), setChooseDateModal(false);
          setIsModalOpen(false);
        }}
        dateData={dateData}
        onSave={onSave}
      />



      <AppointmentDetailsModal
        isOpen={detailOpen}
        onClose={() => {
          setDetailOpen(false);
          setSelectedId(null);
        }}
        appointmentId={selectedId}
      />
    </>
  );
};

export default Index;