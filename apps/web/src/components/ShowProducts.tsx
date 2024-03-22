/* eslint-disable @next/next/no-img-element */

'use client';
import { numberToRupiah } from '@/app/utils/numberToRupiah';
import { AiOutlinePlus } from 'react-icons/ai';
import React from 'react';
import ReactStars from 'react-stars';
import { useGetProducts } from '@/hooks/product/useGetProducts';
import { IProduct } from '@/types/product.type';
import Link from 'next/link';

const ShowProducts = () => {
  const limit = 16;
  const { products } = useGetProducts({ limit });
  return (
    <div>
      <div className="grid grid-cols-4 gap-10">
        {products.map((product: IProduct) => (
          <div className="bg-white p-5 group rounded-md" key={product.id}>
            <Link href={`/product/${product.id}`}>
              <div className="w-[200px] h-[200px] mx-auto flex items-center">
                <img
                  src={product.image}
                  alt=""
                  className="transition-transform duration-300 transform-gpu group-hover:scale-110"
                />
              </div>
            </Link>
            <div>
              <div className="flex justify-center">
                <ReactStars count={5} size={24} color2={'#ffd700'} value={5} />
              </div>
              <h1 className="text-center font-bold text-xl">{product.name}</h1>
              <div className="text-center my-3 mb-2 font-bold text-xl">
                {numberToRupiah(product.price)}
              </div>
              <div className="flex justify-center mb-4">
                <button className="flex px-[74px] py-3 items-center bg-[#d6eedd] hover:bg-[#34a853] hover:text-white">
                  <AiOutlinePlus /> Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowProducts;
