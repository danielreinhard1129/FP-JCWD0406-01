import { axiosInstance } from '@/libs/axios';
import { useAppSelector } from '@/libs/hooks';
import { useEffect, useState } from 'react';

export const useGetUserAddress = () => {
  const [addresses, setAddresses]: any = useState();

  const user = useAppSelector((state) => state.user);

  const getUserAddress = async () => {
    try {
      const response = await axiosInstance.get(`/customers/filter/${user.id}`);
      setAddresses(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    addresses,
  };
};
