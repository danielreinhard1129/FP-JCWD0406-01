import { prisma } from '@/helpers/prisma';

export async function getOrdersRepo(
  id: number,
  startDate: string,
  endDate: string,
  categoryId: number = 0,
  search: string,
) {
  try {
    let AND: [] | any = [{ branchId: id }];
    let product = {};
    let createdAt = {};

    if (categoryId && categoryId > 0) {
      product = {
        categoryId,
      };
      AND.push({ product });
    }
    if (startDate && endDate) {
      createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
      AND.push({ createdAt });
    }

    if (search) {
      product = {
        name: {
          contains: search,
        },
      };
      AND.push({ product });
    }

    // const result = await prisma.order.findMany({
    //   where: {
    //     AND,
    //   },

    //   include: {
    //     customer: {
    //       include: {
    //         profile: true,
    //       },
    //     },
    //     product: {
    //       include: {
    //         category: true,
    //       },
    //     },
    //     status: true,
    //     StoreBranch: true,
    //   },
    // });
    // return result;
  } catch (error) {
    throw error;
  }
}
