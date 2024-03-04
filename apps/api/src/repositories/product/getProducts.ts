import prisma from '@/prisma';
import { IFilter } from '@/type.api/filter.type';

export const getProducts = async (search: string, filter: IFilter) => {
  try {
<<<<<<< HEAD
    const result = await prisma.product.findMany({
=======
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
>>>>>>> c476141f9f575303ab8721e1dd964618c829a059
      include: {
        category: true,
        stock: {
          include: {
<<<<<<< HEAD
            storeBranch: true,
=======
            StoreBranch: true,
>>>>>>> c476141f9f575303ab8721e1dd964618c829a059
          },
        },
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
