'use client';
import { useGetAllOrder } from '@/app/hooks/order/useGetAllOrder';
import { Button, Datepicker, Dropdown, Spinner } from 'flowbite-react';
import { Roboto } from 'next/font/google';
import React, { useState } from 'react';
import { TableSalesReport } from './TableSalesReport';
import StoreList from '../../components/StoreList';
import { FaSearch } from 'react-icons/fa';
import FilterReport from '../../components/FilterReport';

const roboto = Roboto({
  weight: '900',
  subsets: ['latin'],
});

const SalesReportPage = () => {
  const [startDate, setStartDate] = useState('');
  const [search, setSearch] = useState('');
  const [endDate, setEndDate] = useState(new Date().toISOString());
  const [categoryId, setCategoryId] = useState(0);
  const [storeId, setStoreId] = useState(0);
  const { data, loading, refreshData } = useGetAllOrder(
    storeId,
    categoryId,
    startDate,
    endDate,
    search,
  );

  return (
    <div className="w-full px-10 py-10 bg-[#272c2f] text-white">
      <h1 className={`${roboto.className} text-3xl`}>Sales Report</h1>
      <div className="flex justify-between items-end w-full">
        <StoreList storeId={storeId} setStoreId={setStoreId} />
        <div className="w-1/2">
          <form className="flex">
            <div className="bg-green-500 text-center p-3 rounded-tl-md rounded-bl-md">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search product..."
              className="text-black text-sm w-full"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
        <FilterReport
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          refreshData={refreshData}
        />
      </div>

      <div className="mt-4">
        {data && (
          <TableSalesReport data={data} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default SalesReportPage;
