import { prisma } from '@/helper/prisma';
import { IStoreAdmin } from '@/type.api/storeAdmin.type';

export const addStoreAdminRepo = async (data: IStoreAdmin) => {
  try {
    return await prisma.admin.create({
      data,
    });
  } catch (error) {
    throw error;
  }
};
