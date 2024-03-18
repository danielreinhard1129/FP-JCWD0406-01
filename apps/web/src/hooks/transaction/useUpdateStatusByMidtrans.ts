import { useEffect, useState } from 'react';
import { axiosInstance } from '@/libs/axios';
import { IUseUpdateStatusByMidtransParams } from '@/types/params.type';

export const useUpdateStatusByMidtrans = ({
  transactionId,
  transactionStatus,
}: IUseUpdateStatusByMidtransParams) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpdateStatus = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.post(
        `/transactions/status/midtrans/${transactionId}`,
        {
          transactionStatus,
        },
      );
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleUpdateStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId, transactionStatus]);

  return {
    isLoading,
  };
};
