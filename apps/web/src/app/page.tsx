/* eslint-disable @next/next/no-img-element */
import Banner from '@/components/Banner';
import CategoryDrinksJuice from '@/components/CategoryDrinksJuice';
import CategoryFreshProductVegetables from '@/components/CategoryFreshProductVegetables';
import CategoryProduct from '@/components/CategoryProduct';
import Footer from '@/components/Footer';
import { Header } from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Label from '@/components/Label';
import ShowProducts from '@/components/ShowProducts';
import TopSelling from '@/components/TopSelling';
import Link from 'next/link';

const Home = () => {
  return (
    <main>
      <Header />
      <div className="container max-w-7xl mx-auto">
        <HeroSection />
        <Label />
        <CategoryProduct />
      </div>
      <div className="bg-[#f5faf6] p-10 mb-5">
        <div className="container max-w-7xl mx-auto">
          <div className="flex items-center justify-between my-8">
            <h1 className="text-3xl font-bold">Fresh Vegetables</h1>
            <Link href={`/category/vegetables`}>
              <h2 className="font-bold border-b-2 border-transparent hover:border-black transition-all duration-300 hover:cursor-pointer">
                View All
              </h2>
            </Link>
          </div>
          <CategoryFreshProductVegetables />
        </div>
      </div>
      <div className="container max-w-7xl mx-auto">
        <div className="my-20">
          <img
            src="https://assets.klikindomaret.com///products/promopage/HERO_BNR_SAYUR-BUAH-1-MAR.jpg"
            alt=""
            className="h-[430px] w-full object-cover rounded-md"
          />
        </div>
        <div className="flex items-center justify-between my-8">
          <h1 className="text-3xl font-bold">Top Selling Products</h1>
          <Link href={`/category/top-selling`}>
            <h2 className="font-bold border-b-2 border-transparent hover:border-black transition-all duration-300 hover:cursor-pointer">
              View All
            </h2>
          </Link>
        </div>
        <TopSelling />
        <Banner />
      </div>
      <div className="bg-[#f5faf6] p-10 mb-5">
        <div className="container max-w-7xl mx-auto">
          <div className="flex items-center justify-between my-8">
            <h1 className="text-3xl font-bold">Drinks Juice</h1>
            <Link href={`/category/juices`}>
              <h2 className="font-bold border-b-2 border-transparent hover:border-black transition-all duration-300 hover:cursor-pointer">
                View All
              </h2>
            </Link>
          </div>
          <CategoryDrinksJuice />
        </div>
      </div>
      <div className="container max-w-7xl mx-auto">
        <div className="my-20">
          <img
            src="https://assets.klikindomaret.com///products/promopage/wh-brand-sale-feb2024.jpeg"
            alt=""
            className="h-[430px] w-full object-cover rounded-md"
          />
        </div>
      </div>
      <div className="bg-[#f5faf6] p-10 mb-5">
        <div className="container max-w-7xl mx-auto">
          <div className="flex items-center justify-between my-8">
            <h1 className="text-3xl font-bold">All Products</h1>
            <Link href={`/category/products`}>
              <h2 className="font-bold border-b-2 border-transparent hover:border-black transition-all duration-300 hover:cursor-pointer">
                View All
              </h2>
            </Link>
          </div>
          <ShowProducts />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Home;
