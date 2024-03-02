import { excludeFields } from '@/helper/excludeFields';
import { getStoreAdminRepo } from '@/repositories/storeAdmin/getStoreAdminsRepo';

export const getStoreAdminAction = async () => {
  try {
    const data = await getStoreAdminRepo();
    

    return {
      message: 'get Store Admin success',
      status: 200,
      data,
    };
  } catch (error) {
    throw error;
  }
};
