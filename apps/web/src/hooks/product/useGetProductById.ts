import { useEffect, useState } from 'react';
import { axiosInstance } from '@/libs/axios';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { IProduct } from '@/types/product.type';

export const useGetProductById = (id: number) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getProduct = async () => {
    setIsLoading(true);
    try {
      const product = await axiosInstance.get(`/products/${id}`);
      setProduct(product.data.data);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error?.response?.data?.message;
        toast.error(errorMsg);
      }
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
