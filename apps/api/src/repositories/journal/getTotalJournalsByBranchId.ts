import prisma from '@/prisma';

export const getTotalJournalsByBranchId = async (branchId: number) => {
  try {
    const result = await prisma.journal.count({
      where: {
        branchId,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
