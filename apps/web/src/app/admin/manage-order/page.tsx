'use client';
import React, { useState } from 'react';
import { SidebarAdmin } from '../components/SideBarAdmin';
import OrderPage from './components/OrderPage';
import isAuthAdmin from '@/components/isAuthAdmin';

const ManageOrderPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className="flex justify-center">
        <SidebarAdmin isOpen={sidebarOpen} onClose={toggleSidebar} />
        <OrderPage isOpen={sidebarOpen} onClose={toggleSidebar}/>
      </div>
    </>
  );
};

export default isAuthAdmin(ManageOrderPage);
