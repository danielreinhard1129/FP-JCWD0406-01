'use client';
import useGetAllProduct from '@/app/hooks/products/useGetAllProduct';
import { FormatRupiah } from '@arismun/format-rupiah';
import { Button } from 'flowbite-react';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
const poppins2 = Poppins({ subsets: ['latin'], weight: '400' });

const ListProducts = () => {
  const { data } = useGetAllProduct();
  //   const [dropDown, setDropdown] = useState(false);
  return (
    <div className="w-full mb-5">
      <div className="flex justify-between items-center shadow-lg mb-8 mx-5 rounded-lg p-2">
        <p>Showing 1-6 of 66 Results</p>
        <div className="flex items-center mr-3">
          <p className="mr-3">Sort By: </p>
          <select className="rounded-lg">
            <option>Default</option>
            <option>latest</option>
            <option>highest price</option>
            <option>lowest price</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="grid grid-cols-4 gap-5 ">
          {data?.map((product) => {
            return (
              <div
                key={product.id}
                className="bg-[#f2f2f2] border rounded-lg h-max justify-center hover:shadow-lg transition-shadow duration-300 cursor-pointer "
              >
                <div className="w-full relative mb-3 h-32 flex items-center justify-center">
                  <Image
                    src={product.image as string}
                    alt={product.name}
                    width={600}
                    height={100}
                    className="object-cover h-32 w-full rounded-lg"
                  />
                </div>
                <div className={`${poppins2.className} text-left px-4 mb-4`}>
                  <h3 className="text-lg font-semibold h-[3rem] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 ">
                    {product.weight} {product.unitWeight}
                  </p>
                  <div className="flex mb-3 items-center justify-between">
                    <p className="text-base font-bold  mr-6 text-[#b1bf4c]">
                      <FormatRupiah value={product?.price} />
                    </p>
                    <Link href={'/cart'}>
                      <Button color="success" className="text-2xl text-white">
                        <MdOutlineAddShoppingCart />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListProducts;
