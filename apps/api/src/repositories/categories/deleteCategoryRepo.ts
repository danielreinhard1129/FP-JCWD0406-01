import { prisma } from '@/helper/prisma';

export async function deleteCategoryRepo(id: number) {
  try {
    const result = prisma.category.delete({
      where: {
        id,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
}
