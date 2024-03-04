import prisma from '@/prisma';

export const createJurnalHistory = async ({
  branchId,
  notes,
  details,
}: any) => {
  try {
    const result = await prisma.jurnal.create({
      data: {
        branchId,
        notes,
        details,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
