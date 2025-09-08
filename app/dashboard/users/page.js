// src/pages/dashboard/tasks/index.js
"use client"
import AlphabetFilter from '@/components/common/AlphabetFilter';
import StatsAndFilters from '@/components/common/StatsAndFilters';
import TaskHeader from '@/components/common/TaskHeader';
import { officesData, usersColumns } from '@/components/content/ContentData';
import AppointmentDetailsModal from '@/components/modal/AppointmentDetailsModal';
import UserDatadTable from '@/components/tabels/UserDatadTable';
import { ThemeContext } from '@/context/ThemeContext';
import { useContext, useMemo, useState } from 'react';
import Header from '../../../components/Header';
import { useLanguage } from '@/context/LanguageContext';
import UserSetting from './[slug]';
// Replace this import to a real component (see next step)
 
const Index = () => {
  const { t } = useLanguage();
  const [selectedRows, setSelectedRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  const [selectedLetter, setSelectedLetter] = useState(null);
  const [activeUser, setActiveUser] = useState(null); // currently selected user (row)

  const data = {
    name: 'Ceyhun Cokolumsuz',
    lastname: 'Kuafor',
    number: 'Y23 ASD01',
    service: 'Kuafor',
    gender: 'Mars',
    appDate: '2025-08-29',
    appTime: '09:00',
    createdDate: '2025-08-26',
    createdTime: '23:15',
    freeCancelDate: '2025-08-28',
    freeCancelTime: '09:00',
    cancelationFee: '300,00₺',
  };

  const handleLetterSelect = (letter) => {
    setSelectedLetter(letter);
    setSelectedRows([]);
  };

  const filteredOfficesData = useMemo(() => {
    if (!selectedLetter) return officesData;
    return officesData.filter((office) => {
      const employeeName =
        office.name || office.employeeName || office.title || office.office_name || '';
      return employeeName.toString().toLowerCase().startsWith(selectedLetter.toLowerCase());
    });
  }, [selectedLetter]);

  const availableLetters = useMemo(() => {
    const letters = new Set();
    officesData.forEach((office) => {
      const employeeName =
        office.name || office.employeesName || office.title || office.office_name || '';
      if (employeeName) letters.add(employeeName.toString().charAt(0).toUpperCase());
    });
    return Array.from(letters).sort();
  }, []);

  const handleShowAll = () => {
    setSelectedLetter(null);
    setSelectedRows([]);
  };

  return (
    <>
      <Header
        title={t('header.users')}
        buttonLabel={t('header.addUser')}
        onButtonClick={() => setIsOpen(true)}
      />

      {!activeUser ? (
        <>
          <div className="px-4 py-3 mt-4">
            <div className=" ">
              <div className="flex items-center gap-4 mb-3">
                <button
                  onClick={handleShowAll}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    selectedLetter === null
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
              <TaskHeader
                title={selectedLetter ? `Starting with "${selectedLetter}"` : "Total"}
                count={filteredOfficesData.length}
              />
              <div className='flex items-center gap-4'>
                <StatsAndFilters />
              </div>
            </div>

            <div className='mt-5'>
              <UserDatadTable
                columns={usersColumns}
                data={filteredOfficesData}
                selectedRows={selectedRows}
                showCheckboxes={false}
                rowClickable
                onRowClick={(row) => {
                  // Show the detail view for this user
                  setActiveUser(row);
                  // window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onRowSelect={setSelectedRows}
              />
            </div>

            {filteredOfficesData.length === 0 && selectedLetter && (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg font-medium">No Employee found</p>
                <p className="text-sm mt-1">
                  No Employee start with the letter "{selectedLetter}"
                </p>
                <button
                  onClick={handleShowAll}
                  className="mt-3 px-4 py-2 bg-[#FF6B00] text-white rounded transition-colors"
                >
                  Show All Employees
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        // Detail view - UserSetting component should handle appointment modal internally
        <UserSetting
          user={activeUser}
          onBack={() => setActiveUser(null)}
        />
      )}

      {/* Add User Modal - only show when not in detail view */}
      {!activeUser && (
        <AppointmentDetailsModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={(updated) => {
            console.log('save', updated);
            setIsOpen(false);
          }}
          appointment={data}
        />
      )}
    </>
  );
};

export default Index;