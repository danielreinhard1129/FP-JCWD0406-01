import prisma from '@/prisma';
import { IGetStocksByProductIdAndBranchIdParams } from '@/types/params.type';
import { IProductRequest } from '@/types/product.type';

export const getStocksByProductIdAndBranchId = async ({
  products,
  branchId,
}: IGetStocksByProductIdAndBranchIdParams) => {
  try {
    const result = await prisma.stock.findMany({
      where: {
        productId: {
          in: products.map((product: IProductRequest) => product.id),
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
