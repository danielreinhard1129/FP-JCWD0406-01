'use client';

import { ISidebarAdminProps } from '@/types/props.type';
import { Dropdown } from 'flowbite-react';
import Link from 'next/link';
import { FaBoxOpen } from 'react-icons/fa6';
import { MdDashboard } from 'react-icons/md';

export function SidebarAdmin({ isOpen }: ISidebarAdminProps) {
  return (
    <div className={`${isOpen ? '' : 'sidebar'} relative`}>
      <section className="bg-[#272c2f] text-white w-max h-screen pl-10 pt-4 md:px-12 sticky top-0 500 shadow-[rgb(165,170,178)_3px_0px_8px_0px] shadow-black">
        <h1 className={`font-mono font-bold text-[2rem] pl-5`}>
          Gr<span className="text-yellow-300">oc</span>eria
        </h1>
        <ul className="mt-20">
          <li className="flex items-center px-5 py-2 rounded-sm hover:bg-[#374151]">
            <MdDashboard className="mr-2" />
            <Link href={'/admin'}>Dashboard</Link>
          </li>
          <li className="flex items-center mt-2 px-5 py-2 rounded-sm hover:bg-[#374151]">
            <FaBoxOpen className="mr-2" />
            <Dropdown
              label={`Product Management`}
              className="bg-[#272c2f] shadow-none font-mono font-bold  border-none "
              inline
            >
              <ul>
                <li className="mt-2">
                  <Link
                    href={'/admin/manage-product'}
                    className="text-white text-[15px] px-5  py-1 rounded-sm hover:bg-[#374151]"
                  >
                    Manage Product
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href={'/admin/manage-category'}
                    className="text-white text-[15px] px-5  py-1 rounded-sm hover:bg-[#374151]"
                  >
                    Manage Category
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href={'/admin/manage-stock'}
                    className="text-white text-[15px] px-5  py-1 rounded-sm hover:bg-[#374151]"
                  >
                    Manage Stock
                  </Link>
                </li>
              </ul>
            </Dropdown>
          </li>
          <li className="flex items-center mt-2 px-5 py-2 rounded-sm hover:bg-[#374151]">
            <FaBoxOpen className="mr-2" />
            <Dropdown
              label={`Order Management`}
              className="bg-[#272c2f] shadow-none font-mono font-bold  border-none "
              inline
            >
              <ul>
                <li className="mt-2">
                  <Link
                    href={'/admin/manage-order'}
                    className="text-white text-[15px] px-5  py-1 rounded-sm hover:bg-[#374151]"
                  >
                    Manage Order
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href={'/admin/journal'}
                    className="text-white text-[15px] px-5  py-1 rounded-sm hover:bg-[#374151]"
                  >
                    Journal
                  </Link>
                </li>
              </ul>
            </Dropdown>
          </li>
        </ul>
      </section>
    </div>
  );
}
