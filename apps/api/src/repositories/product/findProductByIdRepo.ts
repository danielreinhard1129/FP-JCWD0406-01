import { prisma } from '@/helper/prisma';

export async function findProductByIdRepo(id: number) {
  try {
    const result = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
}
