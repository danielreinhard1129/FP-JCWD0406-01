import { logger } from '@/logger';
import { getJournalsByBranchId } from '@/repositories/journal/getJournalsByBranchId';
import { getTotalJournalsByBranchId } from '@/repositories/journal/getTotalJournalsByBranchId';

export const getJournalsByBranchIdAction = async (
  branchId: number,
  page: number,
  perPage: number,
) => {
  try {

    const skip: number = (page - 1) * perPage;
    const result = await getJournalsByBranchId(branchId, skip, perPage);
    const getTotalJournals = await getTotalJournalsByBranchId(branchId);

    logger.info(`get journals by branch id ${branchId} was success`)
    return {
      message:`get journals by branch id ${branchId} was success`,
      status: 200,
      data: result,
      total: getTotalJournals,
    };
  } catch (error) {
    throw error;
  }
};
