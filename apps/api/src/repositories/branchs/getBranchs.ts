import prisma from '@/prisma';

export const getBranchs = async () => {
  try {
    const result = await prisma.storeBranch.findMany({
      where: {
        name: {
          not: 'Kantor Pusat',
        },
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
