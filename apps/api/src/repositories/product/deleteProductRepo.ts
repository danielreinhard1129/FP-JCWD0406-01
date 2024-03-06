import prisma from '@/prisma';

export async function deleteProductRepo(id: number) {
  try {
    const result = await prisma.product.delete({
      where: {
        id,
      },
    });
    return  result
  } catch (error) {
    throw error;
  }
}
