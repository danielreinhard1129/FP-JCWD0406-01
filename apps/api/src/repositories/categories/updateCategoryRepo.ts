import { prisma } from '@/helper/prisma';
import { ICategory } from '@/type.api/category.type';

export async function updateCategoryRepo(id: number, data: ICategory) {
  try {
    const result = await prisma.category.update({
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
