import { prisma } from '@/helpers/prisma';

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
