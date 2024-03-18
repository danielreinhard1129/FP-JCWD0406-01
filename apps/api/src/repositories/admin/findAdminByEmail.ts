import prisma from '@/prisma';

export const findAdminByEmail = async (email: string) => {
  try {
    const users = await prisma.admin.findUnique({
      where: { email },
      include: {storeBranch: true}
    });
    return users;
  } catch (error) {
    throw error;
  }
};
