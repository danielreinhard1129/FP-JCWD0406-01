import { logger } from '@/logger';
import { getTransactionById } from '@/repositories/transaction/getTransactionById';

export const getTransactionByIdAction = async (transactionId: string) => {
  try {
    const result = await getTransactionById(transactionId);

    logger.info(`get transaction with id ${transactionId} was success`)
    return {
      message:`get transaction with id ${transactionId} was success`,
      status: 200,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};
