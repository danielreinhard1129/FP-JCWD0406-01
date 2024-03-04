import { updateTransactionStatus } from '@/repositories/transaction/updateTransactionStatus';

interface updateStatusMidtransParams {
  transaction_id: string;
  transaction_status: string;
}

export const updateStatusByMidtransAction = async ({
  transaction_id,
  transaction_status,
}: updateStatusMidtransParams) => {
  try {
    let status = 0;

    if (transaction_status == 'capture') {
      status = 3;
    } else if (transaction_status == 'settlement') {
      status = 3;
    } else if (
      transaction_status == 'cancel' ||
      transaction_status == 'deny' ||
      transaction_status == 'expire'
    ) {
      status = 1;
    } else if (transaction_status == 'pending') {
      status = 1;
    }

    const transaction = await updateTransactionStatus(transaction_id, status);

    return {
      message: 'success',
      status: 200,
      data: transaction,
    };
  } catch (error) {
    throw error;
  }
};
