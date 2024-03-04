import prisma from '@/prisma';

export const getTotalTransactionsByBranchId = async (branchId: number) => {
  console.log({ branchId });
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
