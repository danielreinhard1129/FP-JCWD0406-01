import { useEffect, useState } from 'react';
import { axiosInstance } from '@/libs/axios';
import { ITransaction } from '@/types/transaction.type';
import { toast } from 'sonner';

interface ItransactionByIdParams {
  transactionId: string | null;
  setTransactions?: (input: string[]) => void;
  setTotalPage?: (input: number) => void;
  submit?: boolean;
}

export const useGetTransactionById = ({
  transactionId,
  setTransactions,
  setTotalPage,
  submit,
}: ItransactionByIdParams) => {
  const [transaction, setTransaction] = useState<ITransaction | any>();

  const getTransactionById = async () => {
    try {
      setTransactions && setTransactions([]);
      setTotalPage && setTotalPage(0);

      if (!transactionId) {
        return false;
      }

      const response = await axiosInstance.get(
        `/transactions/filter/${transactionId}`,
      );

      setTransaction(response.data.data);

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
