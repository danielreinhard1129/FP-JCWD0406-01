import prisma from '@/prisma';

export const getStocksByProductId = async ({ products }: any) => {
  try {
    const result = await prisma.stock.findMany({
      where: {
        productId: {
          in: products.map((product: any) => product.id),
        },
      },
      include: {
        product: true,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
