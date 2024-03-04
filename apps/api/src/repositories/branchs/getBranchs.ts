import prisma from '@/prisma';

export const getBranchs = async () => {
  try {
    const result = await prisma.store_Branch.findMany();
    return result;
  } catch (error) {
    throw error;
  }
};
