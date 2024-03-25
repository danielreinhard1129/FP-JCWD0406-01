import { logger } from '@/logger';
import { getTotalTransactions } from '@/repositories/transaction/getTotalTransactions';
import { getTransactions } from '@/repositories/transaction/getTransactions';

export const getTransactionsAction = async (page: number, perPage: number) => {
  try {
    const skip: number = (page - 1) * perPage;
    const result = await getTransactions(skip, perPage);
    const getTotalTransaction = await getTotalTransactions();

    logger.info('get transactions success');
    return {
      message: 'get transactions success',
      status: 200,
      data: result,
      total: getTotalTransaction,
    };
  } catch (error) {
    throw error;
  }
};
