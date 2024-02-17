import prisma from '@/prisma';

export const getProductsByIds = async ({products}: any) => {
  try {
    const result = await prisma.stock.findMany({
      where: {
        productId: {
            in: products.map((product: any) => product.id)
        }
      },
      include: {
        product: { include: { category: true } },
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
