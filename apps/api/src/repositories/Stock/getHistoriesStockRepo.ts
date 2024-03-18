import { prisma } from '@/helpers/prisma';

export async function getHistoriesStockRepo(
  id: number,
  startDate: string,
  endDate: string,
  categoryId: number = 0,
  search: string,
) {
  try {
    let AND: [] | any = [{stock :{ branchId: id }}];
    let product = {};
    let createdAt = {};

    if (categoryId && categoryId > 0) {
      product = {
        categoryId,
      };
      AND.push({stock:{ product }});
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
      AND.push({stock:{ product }});
    }

    // const result = await prisma.stock_Change.findMany({
    //   where: {
    //     AND,
    //   },
    //   include:{
    //     stock: {
    //       include: {
    //         product: {
    //           include: {
    //             category: true
    //           }
    //         },StoreBranch: true
    //       }
    //     }
    //   }
    // });
    // return result;
  } catch (error) {
    throw error;
  }
}
