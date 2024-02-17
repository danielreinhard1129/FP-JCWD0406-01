import prisma from '@/prisma';

export const getProducts = async () => {
  try {
    // const result = await prisma.stock.findMany({
    //   include: {
    //     product: true,
    //     storeBranch: true,
    //   },
    // });
    // return result;
  } catch (error) {
    throw error;
  }
};
