import { logger } from '@/logger';
import { getTotalTransactionsByDate } from '@/repositories/transaction/getTotalTransactionsByDate';
import { getTransactionByDate } from '@/repositories/transaction/getTransactionByDate';

export const getTransactionByDateAction = async (
  date: string,
  page: number,
  perPage: number,
) => {
  try {
    const skip: number = (page - 1) * perPage;

    const gte = new Date(date);
    gte.setHours(0, 0, 0, 0);
    const lte = new Date(gte);
    lte.setDate(gte.getDate() + 1);

    const result = await getTransactionByDate(gte, lte, skip, perPage);
    const total = await getTotalTransactionsByDate(gte, lte);

    logger.info(`get transaction with date ${date} was success`);
    return {
      message: `get transaction with date ${date} was success`,
      status: 200,
      data: result,
      total,
    };
  } catch (error) {
    throw error;
  }
};
