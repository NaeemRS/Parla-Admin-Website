// src/pages/dashboard/tasks/index.tsx
"use client"
import AlphabetFilter from '@/components/common/AlphabetFilter';
import DataTable from '@/components/common/DatadTable';
import StatsAndFilters from '@/components/common/StatsAndFilters';
import TaskHeader from '@/components/common/TaskHeader';
import { officesData, partnerColumns } from '@/components/content/ContentData';
import EmployeeModal from '@/components/modal/EmployeeModal';
import PartnerModal from '@/components/modal/PartnerModal'; // ✅ add Partner modal
import { ThemeContext } from '@/context/ThemeContext';
import { useContext, useMemo, useState } from 'react';
import Header from '../../../components/Header';
import { useLanguage } from '@/context/LanguageContext';

const Index = ({ initialTasks }) => {
  const { t } = useLanguage();
  const [selectedRows, setSelectedRows] = useState([]);

  // Employee modal state
 
  // ✅ Partner modal state
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);

  const { theme } = useContext(ThemeContext);

  // Alphabet filter state
  const [selectedLetter, setSelectedLetter] = useState (null);

  // Modal functions
 
  const openPartnerModal = () => setIsPartnerOpen(true);
  const closePartnerModal = () => setIsPartnerOpen(false);

  // Handle letter selection
  const handleLetterSelect = (letter) => {
    setSelectedLetter(letter);
    setSelectedRows([]); // Clear selected rows when filter changes
  };

  // Filter data based on selected letter
  const filteredOfficesData = useMemo(() => {
    if (!selectedLetter) return officesData;

    return officesData.filter(office => {
      const employeeName = office.name || office.employeeName || office.title || office.office_name || '';
      return employeeName.toString().toLowerCase().startsWith(selectedLetter.toLowerCase());
    });
  }, [selectedLetter]);

  // Available letters
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

  // Reset filter
  const handleShowAll = () => {
    setSelectedLetter(null);
    setSelectedRows([]);
  };

  return (
    <>
      <Header
        title={t('sidebar.partners')}
        buttonLabel={t('header.addPartner')} // ✅ now for Partner
        onButtonClick={openPartnerModal} // ✅ open partner modal
      />

      <div className="px-4 py-3 mt-4">
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
          <DataTable
            columns={partnerColumns}
            data={filteredOfficesData}
            selectedRows={selectedRows}
            showCheckboxes={false}
            onRowSelect={setSelectedRows}
          />
        </div>

        {filteredOfficesData.length === 0 && selectedLetter && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-medium">No Partner found</p>
            <p className="text-sm mt-1">No Partner starts with the letter "{selectedLetter}"</p>
            <button
              onClick={handleShowAll}
              className="mt-3 px-4 py-2 bg-[#FF6B00] text-white rounded transition-colors"
            >
              Show All Partners
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      
      <PartnerModal
        isOpen={isPartnerOpen}
        onClose={closePartnerModal}
      />
    </>
  );
};

export default Index;
