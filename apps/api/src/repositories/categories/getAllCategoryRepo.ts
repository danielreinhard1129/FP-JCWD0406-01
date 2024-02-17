import prisma from '@/prisma';

export async function getAllCategoryRepo() {
  try {
    const result = await prisma.category.findMany();
    return result;
  } catch (error) {
    throw error;
  }
}
