/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';

const CategoryProduct = () => {
  return (
    <div className="py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Market Category</h1>
      </div>
      <div className="flex row justify-between">
        <div>
          <Link href={`/category/fruits`}>
            <div className="bg-[#f3faf5] p-14 rounded-md">
              <img
                src="https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/category-img/c-img-1.webp"
                alt=""
                className="w-[80px] h-[80px] transition-transform duration-300 transform-gpu hover:scale-110"
              />
            </div>
          </Link>
          <h1 className="mt-7 text-center text-2xl">Fruits</h1>
        </div>
        <div>
          <Link href={`/category/vegetables`}>
            <div className="bg-[#f3faf5] p-14 rounded-md">
              <img
                src="https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/category-img/c-img-2.webp"
                alt=""
                className="w-[80px] h-[80px] transition-transform duration-300 transform-gpu hover:scale-110"
              />
            </div>
          </Link>
          <h1 className="mt-7 text-center text-2xl">Vegetables</h1>
        </div>
        <div>
          <Link href={`/category/juices`}>
            <div className="bg-[#f3faf5] p-14 rounded-md">
              <img
                src="https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/category-img/c-img-3.webp"
                alt=""
                className="w-[80px] h-[80px] transition-transform duration-300 transform-gpu hover:scale-110"
              />
            </div>
          </Link>
          <h1 className="mt-7 text-center text-2xl">Juices</h1>
        </div>
        <div>
          <Link href={`/category/meats`}>
            <div className="bg-[#f3faf5] p-14 rounded-md">
              <img
                src="https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/category-img/c-img-4.webp"
                alt=""
                className="w-[80px] h-[80px] transition-transform duration-300 transform-gpu hover:scale-110"
              />
            </div>
          </Link>
          <h1 className="mt-7 text-center text-2xl">Meats</h1>
        </div>
        <div>
          <Link href={`/category/cold-drinks`}>
            <div className="bg-[#f3faf5] p-14 rounded-md">
              <img
                src="https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/category-img/c-img-5.webp"
                alt=""
                className="w-[80px] h-[80px] transition-transform duration-300 transform-gpu hover:scale-110"
              />
            </div>
          </Link>
          <h1 className="mt-7 text-center text-2xl">Cold Drinks</h1>
        </div>
        <div>
          <Link href={`/category/breads`}>
            <div className="bg-[#f3faf5] p-14 rounded-md">
              <img
                src="https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/category-img/c-img-6.webp"
                alt=""
                className="w-[80px] h-[80px] transition-transform duration-300 transform-gpu hover:scale-110"
              />
            </div>
          </Link>
          <h1 className="mt-7 text-center text-2xl">Breads</h1>
        </div>
      </div>
      <div className="flex row gap-10 mt-10">
        <div className="bg-[#c9e8dd] rounded-md">
          <div className="px-8 pt-5">
            <h1 className="text-sm font-semibold">FRUITS</h1>
            <h1 className="my-2 font-bold text-3xl">
              Healthy & Goods <br /> Fruits
            </h1>
            <Link href={`/category/fruits`}>
              <button className="flex items-center bg-[#34a853] hover:bg-black text-white font-bold py-2 px-4 transition-all rounded-md duration-300 mt-4">
                Shop Now <IoIosArrowForward />
              </button>
            </Link>
          </div>
          <img
            src="https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/category-img/c-shop-img-1.webp"
            alt=""
          />
        </div>
        <div className="bg-[#fed9da] rounded-md">
          <img
            src="https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/category-img/c-shop-img-2.webp"
            alt=""
          />
          <div className="px-8 pt-5">
            <h1 className="text-sm font-semibold">VEGETABLE</h1>
            <h1 className="my-2 font-bold text-3xl">
              Frash & Goods <br /> Vegetable
            </h1>
            <Link href={`/category/vegetables`}>
              <button className="flex items-center bg-[#fe0600] hover:bg-black text-white font-bold py-2 px-4 transition-all rounded-md duration-300 mt-4">
                Shop Now <IoIosArrowForward />
              </button>
            </Link>
          </div>
        </div>
        <div className="bg-[#e9d9f7] rounded-md">
          <div className="px-8 pt-5">
            <h1 className="text-sm font-semibold">JUICES</h1>
            <h1 className="my-2 font-bold text-3xl">
              Best Fruits <br /> Juices
            </h1>
            <Link href={`/category/juices`}>
              <button className="flex items-center bg-[#921dff] hover:bg-black text-white font-bold py-2 px-4 transition-all rounded-md duration-300 mt-4">
                Shop Now <IoIosArrowForward />
              </button>
            </Link>
          </div>
          <img
            src="https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/category-img/c-shop-img-3.webp"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
