import { prisma } from '@/helpers/prisma';
// import { IStoreAdmin } from '@/type.api/storeAdmin.type';

export const updateStoreAdminRepo = async (id: number, data: any) => {
  try {
    const result = await prisma.admin.update({
      where: {
        id,
      },
      data,
    });
  } catch (error) {
    throw error;
  }
};
