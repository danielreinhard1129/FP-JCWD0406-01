import { prisma } from '@/helpers/prisma';

export const getStoreAdminByIdRepo = async (id: number) => {
  try {
    const result = await prisma.admin.findUnique({
      where: {
        id,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
