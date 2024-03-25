/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

const Banner = () => {
  return (
    <div className="flex gap-10 mb-20">
      <div className="bg-[#fed9da] h-[280px] w-1/2 flex justify-around rounded-md">
        <div className="ml-5">
          <h1 className="mt-7 font-bold text-sm ">FRESH VEGETABLES</h1>
          <h1 className="mt-2 mb-12 text-4xl font-bold">
            The 14 Most Nutrient- <br /> Dense Vegetables
          </h1>
          <Link href={`/category/vegetables`}>
            <button className="flex items-center bg-[#ffbb38] text-black text-sm hover:bg-black hover:text-white font-bold py-3 px-8 transition-all rounded-md duration-300 mt-4">
              Shop Now <IoIosArrowForward />
            </button>
          </Link>
        </div>
        <div>
          <img
            src="./banner1.png"
            alt=""
            className="w-full h-[280px] bg-transparent"
          />
        </div>
      </div>
      <div className="bg-[#c4e3d9] h-[280px] w-1/2 flex justify-around rounded-md">
        <div className="ml-5">
          <h1 className="mt-7 font-bold text-sm ">FRESH FRUITS</h1>
          <h1 className="mt-2 mb-12 text-4xl font-bold">
            Healthy & Goods <br /> Fruits
          </h1>
          <Link href={`/category/fruits`}>
            <button className="flex items-center bg-[#ffbb38] text-black text-sm hover:bg-black hover:text-white font-bold py-3 px-8 transition-all rounded-md duration-300 mt-4">
              Shop Now <IoIosArrowForward />
            </button>
          </Link>
        </div>
        <div>
          <img
            src="./banner2.png"
            alt=""
            className="w-full h-[280px] bg-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
