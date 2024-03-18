// import { getStocksByIdStoreRepo } from '@/repositories/Stock/getStocksByIdStoreRepo';
import { getStoreByIdRepo } from '@/repositories/store/getStoreByIdRepo';

export const getStocksByIdStoreAction = async (branchId: number) => {
  try {
    const isExist = await getStoreByIdRepo(branchId);
    // if (!isExist) return { message: 'Store Branch is not found', status: 404 };
    // const data = await getStocksByIdStoreRepo(branchId);
    return {
      message: 'Success get Data',
      status: 200,
      // data,
    };
  } catch (error) {
    throw error;
  }
};
