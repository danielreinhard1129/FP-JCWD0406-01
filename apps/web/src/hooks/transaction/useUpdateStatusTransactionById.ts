import { axiosInstance } from '@/libs/axios';

interface ITransactionParams {
  transactionId: string;
  getTransactionById?: () => void;
  reason?: string;
  setUpdate?: (input: any) => void;
}

export const useUpdateStatusTransactionById = ({
  transactionId,
  getTransactionById,
  reason,
  setUpdate,
}: ITransactionParams) => {
  const updateStatus = async (statusId: number) => {
    try {
      await axiosInstance.patch(`/transactions/status/${transactionId}`, {
        statusId,
        reason,
      });

      if (getTransactionById) {
        getTransactionById();
      }

      if (setUpdate) {
        setUpdate((prev: any) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    updateStatus,
  };
};
