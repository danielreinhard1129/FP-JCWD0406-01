import { logger } from '@/logger';
import { getJournals } from '@/repositories/journal/getJournals';
import { getTotalJournals } from '@/repositories/journal/getTotalJournals';

export const getJournalsAction = async (page: number, perPage: number) => {
  try {
    const skip: number = (page - 1) * perPage;
    const result = await getJournals(skip, perPage);
    const getTotalJournal = await getTotalJournals();

    logger.info('get journals success');
    return {
      message: 'get journals success',
      status: 200,
      data: result,
      total: getTotalJournal,
    };
  } catch (error) {
    throw error;
  }
};
