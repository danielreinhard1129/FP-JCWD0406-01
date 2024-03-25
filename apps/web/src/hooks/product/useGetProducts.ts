/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/libs/axios';
import { IUseGetProductsParams } from '@/types/params.type';

export const useGetProducts = ({ limit }: IUseGetProductsParams) => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const response = await axiosInstance.get(`/products?limit=${limit}`);
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products,
  };
};
