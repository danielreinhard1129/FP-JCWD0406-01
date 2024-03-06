import { updateTransactionPaymentProof } from '@/repositories/transaction/updateTransactionPaymentProof';
import { updateTransactionStatus } from '@/repositories/transaction/updateTransactionStatus';

export const updateTransactionPaymentProofAction = async (
  transactionId: string,
  paymentProof: string,
) => {
  try {
    const statusId = 2;
    const result = await updateTransactionPaymentProof(
      transactionId,
      paymentProof,
    );
    const updateStatus = await updateTransactionStatus(transactionId, statusId);
    return {
      message: 'update transaction payment proof success',
      status: 200,
      data: { result, updateStatus },
    };
  } catch (error) {
    throw error;
  }
};
