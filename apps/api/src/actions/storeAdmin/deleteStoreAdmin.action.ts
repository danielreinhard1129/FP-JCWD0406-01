import { deleteStoreAdminRepo } from '@/repositories/storeAdmin/deleteStoreAdminRepo';
import { getStoreAdminByIdRepo } from '@/repositories/storeAdmin/getStoreAdminByIdRepo';

export const deleteStoreAdminAction = async (id: number) => {
  try {
    const isExist = await getStoreAdminByIdRepo(id);
    if (!isExist) return { status: 404, message: 'Store Admin is not found' };

    await deleteStoreAdminRepo(id);

    return {
      status: 200,
      message: 'Succes Delete',
    };
  } catch (error) {
    throw error;
  }
};
