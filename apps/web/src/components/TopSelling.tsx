/* eslint-disable @next/next/no-img-element */
'use client';

import { numberToRupiah } from '@/app/utils/numberToRupiah';
import { useGetProducts } from '@/hooks/product/useGetProducts';
import { IProduct } from '@/types/product.type';
import Link from 'next/link';
import { AiOutlinePlus } from 'react-icons/ai';
import ReactStars from 'react-stars';

const TopSelling = () => {
  const limit = 6;

  const { products } = useGetProducts({ limit });

  return (
    <div className="mb-20">
      <div className="grid grid-cols-3 gap-8">
        {products.map((product: IProduct) => (
          <div
            className="flex px-3 pb-7 pt-6 shadow-md border-1 items-center gap-3 group rounded-md"
            key={product.id}
          >
            <Link href={`/product/${product.id}`}>
              <div>
                <img
                  src={product.image}
                  alt=""
                  className="w-48 h-30 transition-transform duration-300 transform-gpu group-hover:scale-110"
                />
              </div>
            </Link>
            <div className="w-[250px]">
              <ReactStars count={5} size={24} color2={'#ffd700'} value={5} />
              <h1 className="font-bold text-xl">{product.name}</h1>
              <div className="my-2 mb-7 font-bold text-xl">
                {numberToRupiah(product.price)}
              </div>
              <div className="flex">
                <button className="flex row px-[50px] py-3 items-center bg-[#d6eedd] hover:bg-[#34a853] hover:text-white">
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

export default TopSelling;
