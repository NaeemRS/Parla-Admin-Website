// src/pages/dashboard/tasks/index.tsx
"use client"
import AlphabetFilter from '@/components/common/AlphabetFilter';
import DataTable from '@/components/common/DatadTable';
import StatsAndFilters from '@/components/common/StatsAndFilters';
import TaskHeader from '@/components/common/TaskHeader';
import { employeeColumns, employeesTabs, officesData } from '@/components/content/ContentData';
import TaskTabs from '@/components/dashboard/task/TaksTabs';
import EmployeeModal from '@/components/modal/EmployeeModal';
import { ThemeContext } from '@/context/ThemeContext';
import { useContext, useMemo, useState } from 'react';
import Header from '../../../components/Header';
import { useLanguage } from '@/context/LanguageContext';

const Index = ({ initialTasks }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("Employee");
  const [selectedRows, setSelectedRows] = useState([]);
  // Modal states
  const [isOpen, setIsOpen] = useState(false);
  const [setOpen, setSetOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  // Alphabet filter state - start with 'A' or null to show all data initially
  const [selectedLetter, setSelectedLetter] = useState(null);

  // Modal functions
  const openEmployeeModal = () => {
    setIsOpen(true);
  };

  const closeEmployeeModal = () => {
    setIsOpen(false);
  };

  // Handle letter selection
  const handleLetterSelect = (letter) => {
    setSelectedLetter(letter);
    setSelectedRows([]); // Clear selected rows when filter changes
  };

  // Filter offices data based on selected letter
  const filteredOfficesData = useMemo(() => {
    if (!selectedLetter) return officesData; // Show all data if no letter selected

    return officesData.filter(office => {
      // Adjust these property names based on your actual data structure
      // Common property names for office data:
      const employeeName = office.name || office.employeeName || office.title || office.office_name || '';

      return employeeName.toString().toLowerCase().startsWith(selectedLetter.toLowerCase());
    });
  }, [selectedLetter]);

  // Get available letters (letters that have data)
  // Get available letters (letters that have data)
  const availableLetters = useMemo(() => {
    const letters = new Set();
    officesData.forEach(office => {
      const employeeName = office.name || office.employeesName || office.title || office.office_name || '';
      if (employeeName) {
        letters.add(employeeName.toString().charAt(0).toUpperCase());
      }
    });
    return Array.from(letters).sort();
  }, []);


  // Add "All" option to show all data
  const handleShowAll = () => {
    setSelectedLetter(null);
    setSelectedRows([]);
  };

  return (
    <>
      <Header
        title={t('sidebar.map')}
        buttonLabel={''}
        onButtonClick={openEmployeeModal}
      />
      <div className='flex md:justify-center lg:flex-nowrap mt-3 flex-wrap items-center md:gap-10 gap-8 lg:gap-32 mb-5'>
        <TaskTabs
          tabs={employeesTabs}
          defaultTab="Employee"
          onChange={(tabName) => setActiveTab(tabName)}
        />


      </div>

      {activeTab === "Mentions" && <p>Mentions content here...</p>}
      {activeTab === "Schedule" && <p>Schedule content here...</p>}

      <>
        {activeTab === "Employee" &&
          <>
            <div className="px-4 py-3 mt-4">
              <div className=" ">
                <div className="flex items-center gap-4 mb-3">
                  <button
                    onClick={handleShowAll}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${selectedLetter === null
                      ? 'bg-[#FF6B00] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
                      }`}
                  >
                    All
                  </button>
                  <h2 className="text-lg font-semibold text-gray-700">
                    from A-Z (150 900 350)
                  </h2>
                </div>

                <AlphabetFilter
                  onLetterSelect={handleLetterSelect}
                  selectedLetter={selectedLetter}
                  availableLetters={availableLetters}
                />
              </div>
            </div>

            <div className='md:p-5 mt-5 p-2'>
              <div className="flex items-center justify-between mb-4">
               
               <div></div>
                <div className='flex items-center gap-4'>
                  <StatsAndFilters />
                </div>
              </div>

              <div className='mt-5'>
                <img src="/images/map.png" />
              </div>

               
             </div>
          </>
        }
      </>

      <EmployeeModal
        isOpen={isOpen}
        setOpen={setSetOpen}
        onClose={closeEmployeeModal}
      />
    </>
  );
};

export default Index;