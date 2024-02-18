import { getStoresRepo } from '@/repositories/store/getStoresRepo';

export const getStoresAction = async () => {
  try {
    const result = await getStoresRepo();

    return {
      message: 'get products success',
      status: 200,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};
