import { prisma } from '@/helper/prisma';

export const getStoresRepo = async () => {
  try {
    const result = await prisma.store_Branch.findMany();
    return result;
  } catch (error) {}
};
