import prisma from '@/prisma';

export const getBranchById = async (branchId: number) => {
  try {
    const result = await prisma.storeBranch.findUnique({
      where: {
        id: branchId,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
