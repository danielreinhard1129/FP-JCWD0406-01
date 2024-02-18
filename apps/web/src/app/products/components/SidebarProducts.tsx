'use client';
import useGetAllCategory from '@/app/hooks/categories/useGetAllCategory';
import { Poppins } from 'next/font/google';
import React, { useState } from 'react';
const poppins = Poppins({ subsets: ['latin'], weight: '600' });
const poppins2 = Poppins({ subsets: ['latin'], weight: '100' });

const SidebarProducts = () => {
  const [dropDown, setDropdown] = useState(false);
  const { data } = useGetAllCategory();
  return (
    <div className="p-10 h-max bg-[#4a5765] text-white">
      <h1
        className={`${poppins.className}`}
        onClick={() => setDropdown(!dropDown)}
      >
        Product <span className="text-[#b1bf4c]">Category</span>
        <span className="ml-2 text-xl font-bold">{dropDown ? '+' : '-'}</span>
      </h1>

      <div className={`  ${dropDown ? 'hidden' : 'block'}`}>
        {data?.map((value) => {
          return (
            <div key={value.id} className="flex items-center me-4 m-6">
              <input
                id="green-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-500 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="green-checkbox"
                className={`ms-2 text-sm ${poppins2} font-medium dark:text-gray-300`}
              >
                {value.name}
              </label>
            </div>
          );
        })}
      </div>
      <h2 className={`${poppins.className} mt-5`}>
        Filter <span className="text-[#b1bf4c]">Price</span>
      </h2>
      <form>
        <div className="my-3">
          <input type="text" placeholder="Price Max" className="rounded-lg" />
        </div>
        <div>
          <input type="text" placeholder="Price Min" className="rounded-lg" />
        </div>
      </form>
    </div>
  );
};

export default SidebarProducts;
