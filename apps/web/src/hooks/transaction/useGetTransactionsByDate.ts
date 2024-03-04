import { axiosInstance } from '@/libs/axios';
import { useEffect, useState } from 'react';

interface ITransactionByDateParams {
  pageOfDate: string;
  itemPerPage: number;
  selectedDate: string;
  setTransactions: (input: string[]) => void;
  setTotalPage: (input: number) => void;
}

export const useGetTransactionsByDate = ({
  pageOfDate,
  itemPerPage,
  selectedDate,
  setTransactions,
  setTotalPage,
}: ITransactionByDateParams) => {
  const [transactionByDate, setTransactionByDate]: any = useState([]);

  const getTransactionByDate = async () => {
    try {
      setTransactions([]);
      setTotalPage(0);
      const response = await axiosInstance.post(
        `/transactions/filter/date?page=${pageOfDate}&perPage=${itemPerPage}`,
        {
          date: selectedDate,
        },
      );
      setTransactionByDate(response.data.data);
      setTotalPage(response.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactionByDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageOfDate]);

  return {
    data: transactionByDate,
    getTransactionByDate,
  };
};
