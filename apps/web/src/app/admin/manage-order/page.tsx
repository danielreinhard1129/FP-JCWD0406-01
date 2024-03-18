'use client';
import React, { useState } from 'react';
import { SidebarAdmin } from '../components/SideBarAdmin';
import OrderPage from './components/OrderPage';

const ManageOrderPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex justify-center">
      <SidebarAdmin isOpen={sidebarOpen} onClose={toggleSidebar} />
      <OrderPage />
    </div>
  );
};

export default ManageOrderPage;
