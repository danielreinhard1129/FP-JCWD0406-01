/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { axiosInstance } from '@/libs/axios';
import { IProduct } from '@/types/product.type';
import { IUseGetCategoryByTitle } from '@/types/props.type';
import { useEffect, useState } from 'react';

export const useGetCategoryByTitle = ({
  title,
  limit,
}: IUseGetCategoryByTitle) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const getProductByVegetable = async () => {
    try {
      const response = await axiosInstance.get(
        `/categories/filter?title=${title}&limit=${limit}`,
      );
      setProducts(response.data.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductByVegetable();
  }, []);

  return {
    products,
  };
};
