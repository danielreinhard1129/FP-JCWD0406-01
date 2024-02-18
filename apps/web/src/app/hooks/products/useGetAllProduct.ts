import { IProduct } from '@/app/type.web/product.type';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetAllProduct = (search: string | null = null) => {
  const [data, setData] = useState<IProduct[]>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    fetch();
  }, [search]);
  const fetch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/api/products${search ? '?search=' + search : ''}`,
      );
      setData(data.data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const refreshData = () => {
    fetch();
  };
  return { data, refreshData, loading };
};

export default useGetAllProduct;
