import { prisma } from '@/helper/prisma';

export const getStoreAdminByEmail = async (email: string) => {
  try {
    return await prisma.admin.findUnique({ where: { email } });
  } catch (error) {
    throw error;
  }
};
