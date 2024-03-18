import prisma from "@/prisma";

export const getJournals = async (skip: number, limit: number) => {
  try {
    const result = await prisma.journal.findMany({
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
