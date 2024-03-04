import { getTransactionById } from '@/repositories/transaction/getTransactionById';

export const getTransactionByIdAction = async (transactionId: string) => {
  try {
    const result = await getTransactionById(transactionId);
    return {
      message: 'get transaction by id success',
      status: 200,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};
