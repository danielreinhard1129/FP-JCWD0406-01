import { axiosInstance } from '@/libs/axios';
import { useEffect, useState } from 'react';

interface ITransactionsParams {
  setTotalPage: (input: number) => void;
  page: number;
  itemPerPage: number;
}

export const useGetTransactions = ({
  setTotalPage,
  page,
  itemPerPage,
}: ITransactionsParams) => {
  const [transactions, setTransactions]: any = useState([]);

  const getTransactions = async () => {
    try {
      setTotalPage(0);
      const response = await axiosInstance.get(
        `/transactions?page=${page}&perPage=${itemPerPage}`,
      );
      setTransactions(response.data.data);
      setTotalPage(response.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return {
    data: transactions,
    setTransactions,
    getTransactions,
  };
};
