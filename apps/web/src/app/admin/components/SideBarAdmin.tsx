'use client';

import { Dropdown } from 'flowbite-react';
import Link from 'next/link';
import { useState } from 'react';
import { FaBoxes } from 'react-icons/fa';
import { FaBoxOpen } from 'react-icons/fa6';
import { MdDashboard } from 'react-icons/md';
import { TbReport } from 'react-icons/tb';

export function SidebarAdmin() {
  const [dropDown, setDropdown] = useState(false);
  return (
    <section className="bg-[#272c2f] text-white w-max h-screen pt-4 px-12 sticky top-0 500 shadow-[rgb(165,170,178)_3px_0px_8px_0px] shadow-black">
      <h1 className={`font-mono font-bold text-[2rem]`}>
        Gr<span className="text-yellow-300">oc</span>eria
      </h1>
      <ul className="mt-20">
        <Link href={'/admin'}>
          <li className="flex items-center px-5 py-2 rounded-sm hover:bg-[#374151]">
            <MdDashboard className="mr-2" />
            Dashboard
          </li>
        </Link>
        <Link href={'/admin/manage-store-admin'}>
          <li className="flex items-center px-5 py-2 whitespace-nowrap rounded-sm hover:bg-[#374151]">
            <MdDashboard className="mr-2" />
            Manage Store Admin
          </li>
        </Link>
        <li className="px-5 py-2  mt-2 flex items-center flex-col">
          <h1
            className="flex items-center rounded-sm whitespace-nowrap hover:bg-[#374151] cursor-pointer"
            onClick={() => setDropdown(!dropDown)}
          >
            <FaBoxOpen className="mr-2" /> Product Management
            <span className="ml-2 text-xl font-bold">
              {dropDown ? '-' : '+'}
            </span>
          </h1>
          <ul className={`${dropDown ? 'block' : 'hidden'} text-sm ml-4`}>
            <li className="mt-2">
              <Link
                href={'/admin/manage-product'}
                className="text-white  px-5  py-1 rounded-sm hover:bg-[#374151]"
              >
                Manage Product
              </Link>
            </li>
            <li className="mt-2">
              <Link
                href={'/admin/manage-category'}
                className="text-white  px-5  py-1 rounded-sm hover:bg-[#374151]"
              >
                Manage Category
              </Link>
            </li>
            <li className="mt-2">
              <Link
                href={'/admin/manage-stock'}
                className="text-white  px-5  py-1 rounded-sm hover:bg-[#374151]"
              >
                Manage Stock
              </Link>
            </li>
          </ul>
        </li>
        <Link
          href={'/admin/manage-order'}
          className="text-white text-[15px] px-5  py-1 rounded-sm hover:bg-[#374151]"
        >
          Manage Order
        </Link>
        <Link href={'/admin/sales-report'}>
          <li className="flex items-center mt-2 px-5 py-2 rounded-sm hover:bg-[#374151]">
            <TbReport className="mr-2" />
            Sales Report
          </li>
        </Link>
        <Link href={'/admin/stock-report'}>
          <li className="flex items-center mt-2 px-5 py-2 rounded-sm hover:bg-[#374151]">
            <FaBoxes className="mr-2" />
            Stock Report
          </li>
        </Link>
      </ul>
    </section>
  );
}
