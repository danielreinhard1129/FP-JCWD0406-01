import { getBranchs } from '@/repositories/branchs/getBranchs';

export const getBranchsAction = async () => {
  try {
    const result = await getBranchs();
    return {
      message: 'get branchs success',
      status: 200,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};
