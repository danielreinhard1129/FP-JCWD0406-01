'use client';

import { Dropdown } from 'flowbite-react';
import Link from 'next/link';
import { FaBoxOpen } from 'react-icons/fa6';
import { MdDashboard } from 'react-icons/md';

export function SidebarAdmin({ isOpen, onClose }: any) {
  return (
    <div className={`${isOpen ? '' : 'sidebar'}`}>
      <button
        onClick={onClose}
        className="fixed z-90 bottom-10 right-10 bg-teal-800 w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-teal-800 duration-300"
      >
        <span className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-6 m-auto"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
            />
          </svg>
        </span>
      </button>
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
              </ul>
            </Dropdown>
          </li>
        </ul>
      </section>
    </div>
  );
}
