import { prisma } from '@/helper/prisma';

export const getStoreByIdRepo = async (id: number) => {
  try {
    const result = await prisma.store_Branch.findUnique({
      where: {
        id,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
