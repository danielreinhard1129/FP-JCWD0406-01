import prisma from '@/prisma';

export const getBranchs = async () => {
  try {
    const result = await prisma.storeBranch.findMany();
    return result;
  } catch (error) {
    throw error;
  }
};
