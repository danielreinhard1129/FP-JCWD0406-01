import { prisma } from '@/helpers/prisma';

export async function findProductByIdRepo(id: number) {
  try {
    // const result = await prisma.product.findUnique({
    //   where: {
    //     id,
    //   },
    //   include: {
    //     category: true,
    //     stock: {
    //       include: {
    //         StoreBranch: true,
    //         stockChange: true,
    //       },
    //     },
    //   },
    // });
    // return result;
  } catch (error) {
    throw error;
  }
}
