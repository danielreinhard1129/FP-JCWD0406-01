import { useEffect, useState } from 'react';
import { axiosInstance } from '@/libs/axios';

interface UpdateStatusParams {
  transaction_id: string | null;
  transaction_status: string | null;
}

export const useUpdateStatusByMidtrans = ({
  transaction_id,
  transaction_status,
}: UpdateStatusParams) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateStatus = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.post(
        `/transactions/status/midtrans/${transaction_id}`,
        {
          transaction_status,
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
  }, [transaction_id, transaction_status]);

  return {
    isLoading,
  };
};
