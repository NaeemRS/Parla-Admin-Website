// src/pages/dashboard/tasks/Pag.tsx
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
import { useLanguage } from '@/context/LanguageContext';
import Paginate from '@/components/common/Paginate';
import PartnerModal from '@/components/modal/PartnerModal';
import TaskHeader from '@/components/common/TaskHeader';

const Home = ({ initialTasks }) => {
  const { t } = useLanguage();


  return (
    <>
      <Header
        title={t('sidebar.news')}
        buttonLabel={t('header.addNews')}
        onButtonClick={''}
        onSearch={'handleSearch'}
      />


      {/* <div className='md:p-5 p-2'>
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
       </div> */}
    </>
  );
};

export default Home;