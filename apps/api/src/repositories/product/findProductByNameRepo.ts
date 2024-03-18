import prisma from '@/prisma';

export async function findProductByNameRepo(name: string) {
  try {
    // const result = await prisma.product.findUnique({
    //   where: {
    //     name,
    //   },
    // });
    // return result;
  } catch (error) {
    throw error;
  }
}
