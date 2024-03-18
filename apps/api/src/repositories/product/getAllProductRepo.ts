import { prisma } from '@/helpers/prisma';

export async function getAllProductRepo() {
  try {
    const result = await prisma.product.findMany({
      include: {
        category: true,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
}
