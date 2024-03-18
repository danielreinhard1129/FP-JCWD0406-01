import { logger } from '@/logger';
import { getBranchs } from '@/repositories/branchs/getBranchs';

export const getBranchsAction = async () => {
  try {
    const result = await getBranchs();
    logger.info('get branchs success')
    return {
      message: 'get branchs success',
      status: 200,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};
