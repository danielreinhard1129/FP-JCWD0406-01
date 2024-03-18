import prisma from '@/prisma';

export const getBranchesExcluding = async (branchId: number) => {
  try {
    const result = await prisma.storeBranch.findMany({
      where: {
        id: {
          not: branchId,
        },
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
