import prisma from '@/prisma';

export const getProducts = async () => {
  try {
    const result = await prisma.product.findMany({
      include:{
        stock: {
          include:{
             StoreBranch: true
          }
        }
      }
    });
    return result;
  } catch (error) {
    throw error;
  }
};
