import { axiosInstance } from '@/libs/axios';
import { IUseUpdateStatusTransactionByIdParams } from '@/types/params.type';
import { toast } from 'sonner';

export const useUpdateStatusTransactionById = ({
  transactionId,
  getTransactionById,
  reason,
  setUpdate,
}: IUseUpdateStatusTransactionByIdParams) => {
  const updateStatus = async (statusId: number) => {
    try {
      await axiosInstance.patch(`/transactions/${transactionId}/status`, {
        statusId,
        reason,
      });

      if (getTransactionById) {
        getTransactionById();
      }

      if (setUpdate) {
        setUpdate((prev: any) => !prev);
      }

      if (statusId == 6) toast.success('your order has been canceled');

      if (statusId == 5) toast.success('your order has been received');
    } catch (error) {
      console.log(error);
    }
  };

  return {
    updateStatus,
  };
};
