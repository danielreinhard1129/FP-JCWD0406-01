'use client';
import React, { useState } from 'react';
import { SidebarAdmin } from '../components/SideBarAdmin';
import isAuthAdmin from '@/components/isAuthAdmin';
import Journal from './components/Journal';

const JournalPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }; 

  return (
    <div className="flex justify-center">
      <SidebarAdmin isOpen={sidebarOpen} onClose={toggleSidebar} />
      <Journal isOpen={sidebarOpen} onClose={toggleSidebar}/>
    </div>
  );
};

export default isAuthAdmin(JournalPage);
