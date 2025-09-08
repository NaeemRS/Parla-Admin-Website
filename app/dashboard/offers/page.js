// src/pages/dashboard/tasks/index.tsx
"use client"
import DataTable from '@/components/common/DatadTable';
import StatsAndFilters from '@/components/common/StatsAndFilters';
import TaskHeader from '@/components/common/TaskHeader';
import { offersColumn, offersData } from '@/components/content/ContentData';
import OffersModal from '@/components/modal/OffersModal';
import { ThemeContext } from '@/context/ThemeContext';
import { Icon } from '@iconify/react';
import { useContext, useEffect, useState } from 'react';
import Header from '../../../components/Header';
import { useLanguage } from '@/context/LanguageContext';
import Paginate from '@/components/common/Paginate';
import Tabs from '@/components/common/Tabs';
import Loader from '@/components/Loader';

const Index = ({ initialTasks }) => {
  const { t } = useLanguage();
  // Table and UI states
  const [selectedRows, setSelectedRows] = useState([]);

  // Modal states
  // Data states
  const [offers, setOffers] = useState([]);  // ✅ all offers from API
  const [currentItems, setCurrentItems] = useState([]); // ✅ paginated items
  const [filteredOffers, setFilteredOffers] = useState([]); // ✅ filtered results
  const [isOpen, setIsOpen] = useState(false);

  // Date navigation states
  const [currentDate, setCurrentDate] = useState(new Date('2025-08-29'));
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [discountTypeFilter, setDiscountTypeFilter] = useState('All');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const filtered = filterData(offers, searchQuery);
    setFilteredOffers(filtered);
  }, [offers, searchQuery]);


  const { theme } = useContext(ThemeContext);

  const handleGetOffers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Admin/Offers/GetOffers`,
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
        setOffers(data?.data || []);
      }
    } catch (error) {
      toast.error("Offers Not Fetched. Please Try Again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetOffers();
  }, []);


  // Modal functions
  const openOfferModal = () => {
    setIsOpen(true);
  };
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

  const closeOfferModal = () => {
    setIsOpen(false);
  };

  // Date navigation functions
  const goToPreviousDay = () => {
    const previousDay = new Date(currentDate);
    previousDay.setDate(currentDate.getDate() - 1);
    setCurrentDate(previousDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDay);
  };

  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
    setShowDatePicker(false);
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Filter functions
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
  };

  const handleDiscountTypeFilter = (discountType) => {
    setDiscountTypeFilter(discountType);
  };

  const tabs = [
    { id: "request", label: "Request" },
    { id: "giftcards", label: "Gift cards" },
  ];
  return (
    <>
      <Header
        title={t('sidebar.offers')}
        buttonLabel={t('header.addOffer')}
        onButtonClick={openOfferModal}
      />
      <div className='md:p-5 mt-5 p-2'>
        <div className="flex items-center justify-between mb-4">
          <TaskHeader title="Total" count={filteredOffers.length} />
          <div className='flex items-center gap-4'>
            <Tabs
              tabs={tabs} />
            {/* Filters */}
            <StatsAndFilters
              searchQuery={searchQuery}
              onSearch={handleSearch}
              statusFilter={statusFilter}
              onStatusFilter={handleStatusFilter}
              categoryFilter={categoryFilter}
              onCategoryFilter={handleCategoryFilter}
              discountTypeFilter={discountTypeFilter}
              onDiscountTypeFilter={handleDiscountTypeFilter}
            />

            {/* Date Navigation */}
            <div className={`flex items-center justify-between px-4 h-[57px] rounded-full min-w-[187px] text-lg font-medium transition-all bg-[#EEEEEE] text-[#6B6B6B] hover:bg-[#EEEEEE]
            ${theme === "dark"
                ? "text-white bg-[#202020] hover:bg-gray-700"
                : "text-[#454545] bg-white hover:bg-gray-200"}`}>
              {/* Previous Button */}
              <button
                onClick={goToPreviousDay}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <Icon icon="mdi:chevron-left" className="w-5 h-5 text-gray-600" />
              </button>

              {/* Date Display */}
              <span className="text-gray-600 font-medium">{formatDate(currentDate)}</span>

              {/* Next Button */}
              <button
                onClick={goToNextDay}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <Icon icon="mdi:chevron-right" className="w-5 h-5 text-gray-600" />
              </button>

              {/* Calendar Icon */}
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <Icon icon="mdi:calendar" className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-21">
          {loading ? (
            <Loader />
          ) : (
            <DataTable
              columns={offersColumn}
              data={currentItems}
              selectedRows={selectedRows}
              showCheckboxes={false}
            />
          )}
        </div>
        <div className="flex justify-center items-center mt-4">
          <Paginate data={filteredOffers} onPageDataChange={setCurrentItems} />
        </div>
      </div>
      <OffersModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOfferAdded={handleGetOffers}   // ✅ parent se callback diya
      />


    </>
  );
};

export default Index;