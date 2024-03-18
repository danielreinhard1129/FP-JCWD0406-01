import { useEffect, useState } from 'react';
import { axiosInstance } from '@/libs/axios';
import { ITransaction } from '@/types/transaction.type';
import { toast } from 'sonner';
import { IUseGetTransactionByIdParams } from '@/types/params.type';

export const useGetTransactionById = ({
  transactionId,
  setTransactionId,
  setTransactions,
  setTotalPage,
  submit,
}: IUseGetTransactionByIdParams) => {
  const [transaction, setTransaction] = useState<ITransaction | null>(null);

  const getTransactionById = async () => {
    try {
      setTransactions && setTransactions([]);
      setTotalPage && setTotalPage(0);

      if (!transactionId) {
        return false;
      }

      const response = await axiosInstance.get(
        `/transactions/${transactionId}`,
      );

      setTransaction(response.data.data);

      if (setTransactionId) {
        setTransactionId('');
      }

      let transactionData = response.data.data;

      if (setTransactions && transactionData != null) {
        setTransactions([transactionData]);
      }

      if (transactionData == null) {
        toast.info('Data not Found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactionById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit]);

  return {
    data: transaction,
    getTransactionById,
  };
};
