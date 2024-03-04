import prisma from '@/prisma';

export const getStocksByProductIdAndBranchId = async ({
  products,
  branchId,
}: any) => {
  try {
    const result = await prisma.stock.findMany({
      where: {
        productId: {
          in: products.map((product: any) => product.id),
        },
        branchId,
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
