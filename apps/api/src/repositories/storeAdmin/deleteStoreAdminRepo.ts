import { prisma } from '@/helpers/prisma';

export const deleteStoreAdminRepo = async (id: number) => {
  try {
    const result = await prisma.admin.delete({
      where: {
        id,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
