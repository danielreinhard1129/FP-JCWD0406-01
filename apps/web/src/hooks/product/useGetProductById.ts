import { useEffect, useState } from 'react';
import { axiosInstance } from '@/libs/axios';

export const useGetProductById = (id: any) => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProduct = async () => {
    setIsLoading(true);
    try {
      const product = await axiosInstance.get(`/products/filter/${id}`);
      setProduct(product.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    data: product,
    isLoading,
  };
};
