import { PrismaClient } from '@prisma/client';

export const createJurnalHistory = async (
  branchId: number,
  title: string,
  details: string,
  transaction?: any,
) => {
  try {
    const prisma = transaction || new PrismaClient();

    const result = await prisma.journal.create({
      data: {
        branchId,
        title,
        reason: details,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
