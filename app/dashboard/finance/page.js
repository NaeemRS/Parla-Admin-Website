// src/pages/dashboard/tasks/index.tsx
"use client"
import Header from '../../../components/Header';
import { useLanguage } from '@/context/LanguageContext';

const Index = ({ initialTasks }) => {
  const { t } = useLanguage();
 

  return (
    <>
      <Header
        title={t('sidebar.finance')}
        buttonLabel={''}
        className={'hidden'}
        onButtonClick={'openEmployeeModal'}
      />
      
    </>
  );
};

export default Index;