import prisma from '@/prisma';
import { IGetStocksByProductIdParams } from '@/types/params.type';
import { IProductRequest } from '@/types/product.type';

export const getStocksByProductId = async ({
  products,
}: IGetStocksByProductIdParams) => {
  try {
    const result = await prisma.stock.findMany({
      where: {
        productId: {
          in: products.map((product: IProductRequest) => product.id),
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
