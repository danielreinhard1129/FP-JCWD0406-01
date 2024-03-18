import prisma from '@/prisma';

export const getTotalJournals = async () => {
  try {
    const result = await prisma.journal.count();
    return result;
  } catch (error) {
    throw error;
  }
};
