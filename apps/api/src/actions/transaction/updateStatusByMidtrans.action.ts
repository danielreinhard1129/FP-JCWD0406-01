import { updateTransactionStatus } from '@/repositories/transaction/updateTransactionStatus';

interface updateStatusMidtransParams {
  transactionId: string;
  transactionStatus: string;
}

export const updateStatusByMidtransAction = async ({
  transactionId,
  transactionStatus,
}: updateStatusMidtransParams) => {
  try {
    let status = 0;

    if (transactionStatus == 'capture') {
      status = 3;
    } else if (transactionStatus == 'settlement') {
      status = 3;
    } else if (
      transactionStatus == 'cancel' ||
      transactionStatus == 'deny' ||
      transactionStatus == 'expire'
    ) {
      status = 1;
    } else if (transactionStatus == 'pending') {
      status = 1;
    }

    const transaction = await updateTransactionStatus(transactionId, status);

    return {
      message: 'success',
      status: 200,
      data: transaction,
    };
  } catch (error) {
    throw error;
  }
};
