/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React from 'react';
import Sidebar from './components/Sidebar';
import ListProducts from './components/ListProducts';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { ICategoryParams } from '@/types/params.type';
import { useGetCategoryByTitle } from '@/hooks/category/useGetCategoryByTitle';
import { useGetProducts } from '@/hooks/product/useGetProducts';

const CategoryPage = ({ params }: { params: ICategoryParams }) => {
  const slug: string = params?.slug;
  const limit = 15;

  const { products } =
    slug === 'products' || slug === 'top-selling'
      ? useGetProducts({ limit })
      : useGetCategoryByTitle({ title: slug, limit });

  return (
    <div className="bg-[#ffffff]">
      <Header />
      <div className="flex max-w-7xl mx-auto gap-10 my-14 rounded-md">
        <Sidebar />
        <ListProducts products={products} />
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
