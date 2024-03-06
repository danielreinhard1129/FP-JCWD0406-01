import prisma from '@/prisma';

export const getTotalTransactionsByBranchId = async (branchId: number) => {
  try {
    const result = await prisma.order.count({
      where: {
        branchId,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
