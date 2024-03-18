import prisma from '@/prisma';

export const getJournalsByBranchId = async (
  branchId: number,
  skip: number,
  limit: number,
) => {
  try {
    const result = await prisma.journal.findMany({
      where: { branchId: branchId },
      skip: skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        storeBranch: true
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
