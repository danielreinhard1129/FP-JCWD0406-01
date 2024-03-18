import { getTotalTransactions } from '@/repositories/transaction/getTotalTransactions';
import { getTransactions } from '@/repositories/transaction/getTransactions';

export const getTransactionsAction = async (page: number, perPage: number) => {
  try {
    const skip = (page - 1) * perPage;
    const result = await getTransactions(skip, perPage);
    const getTotalTransaction = await getTotalTransactions();
    return {
      message: 'get transaction success',
      status: 200,
      data: result,
      total: getTotalTransaction,
    };
  } catch (error) {
    throw error;
  }
};
