import prisma from '@/prisma';

export const createJurnalHistory = async ({ branchId, title, reason }: any) => {
  try {
    const result = await prisma.journal.create({
      data: {
        branchId,
        title,
        reason,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
