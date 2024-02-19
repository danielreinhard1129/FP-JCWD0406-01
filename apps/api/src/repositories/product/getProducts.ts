import prisma from '@/prisma';
import { IFilter } from '@/type.api/filter.type';

export const getProducts = async (search: string, filter: IFilter) => {
  try {
    let category = {};
    if (Object.keys(filter).length > 0) {
      category = {
        OR: [
          { id: filter.category1 },
          { id: filter.category2 },
          { id: filter.category3 },
        ],
      };
    }
    const result = await prisma.product.findMany({
      where: {
        name: {
          contains: search,
        },
        category,
      },
      include: {
        category: true,
        stock: {
          include: {
            StoreBranch: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
