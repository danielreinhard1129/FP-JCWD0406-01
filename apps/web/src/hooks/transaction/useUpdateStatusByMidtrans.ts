import { useEffect, useState } from 'react';
import { axiosInstance } from '@/libs/axios';

interface UpdateStatusParams {
  transactionId: string | null;
  transactionStatus: string | null;
}

export const useUpdateStatusByMidtrans = ({
  transactionId,
  transactionStatus,
}: UpdateStatusParams) => {
  const [isLoading, setIsLoading] = useState(false);

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
