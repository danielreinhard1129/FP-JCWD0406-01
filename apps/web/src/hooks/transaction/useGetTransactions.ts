import { axiosInstance } from '@/libs/axios';
import { IUseTransactionsParams } from '@/types/params.type';
import { ITransaction } from '@/types/transaction.type';
import { useEffect, useState } from 'react';

export const useGetTransactions = ({
  setTotalPage,
  page,
  itemPerPage,
  isSuperAdmin,
}: IUseTransactionsParams) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const getTransactions = async () => {
    try {
      setTotalPage(0);

      if (isSuperAdmin === false) return false;

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
