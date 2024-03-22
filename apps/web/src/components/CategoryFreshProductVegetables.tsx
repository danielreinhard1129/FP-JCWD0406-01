/* eslint-disable @next/next/no-img-element */
'use client';
import { numberToRupiah } from '@/app/utils/numberToRupiah';
import { AiOutlinePlus } from 'react-icons/ai';
import ReactStars from 'react-stars';
import { IProduct } from '@/types/product.type';
import { useGetCategoryByTitle } from '@/hooks/category/useGetCategoryByTitle';
import Link from 'next/link';

const CategoryFreshProductVegetables = () => {
  const title = 'vegetables';
  const limit = 4;

  const { products } = useGetCategoryByTitle({ title, limit });

  return (
    <div className="flex gap-10">
      {products?.map((product: IProduct) => (
        <div className="bg-white p-5 group rounded-md" key={product.id}>
          <Link href={`/product/${product.id}`}>
            <div className="w-[200px] h-[200px] mx-auto">
              <img
                src={product.image}
                alt="pic"
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
  );
};

export default CategoryFreshProductVegetables;
