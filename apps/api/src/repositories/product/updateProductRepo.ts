import { prisma } from '@/helper/prisma';
import { IProduct } from '@/type.api/product.type';

export async function updateProductRepo(data: IProduct, id: number) {
  try {
    const result = await prisma.product.update({
      where: {
        id,
      },
      data,
    });
    return result;
  } catch (error) {
    throw error;
  }
}
