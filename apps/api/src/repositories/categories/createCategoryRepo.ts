import { prisma } from '@/helper/prisma';
import { ICategory } from '@/type.api/category.type';

export async function createCategoryRepo(data: ICategory) {
  try {
    const result = await prisma.category.create({
      data,
    });
    return result;
  } catch (error) {
    throw error;
  }
}
