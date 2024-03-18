import { axiosInstance } from '@/libs/axios';
import { IUseGetTransactionsByDateParams } from '@/types/params.type';
import { ITransaction } from '@/types/transaction.type';
import { useEffect, useState } from 'react';

export const useGetTransactionsByDate = ({
  pageOfDate,
  itemPerPage,
  selectedDate,
  setTransactions,
  setTotalPage,
}: IUseGetTransactionsByDateParams) => {
  const [transactionByDate, setTransactionByDate] = useState<ITransaction[]>(
    [],
  );

  const getTransactionByDate = async () => {
    try {
      setTransactions([]);
      setTotalPage(0);
      const response = await axiosInstance.get(
        `/transactions/filter/date?date=${selectedDate}&page=${pageOfDate}&perPage=${itemPerPage}`,
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
  }, [pageOfDate, selectedDate]);

  return {
    data: transactionByDate,
    getTransactionByDate,
  };
};
