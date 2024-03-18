import prisma from '@/prisma';

export const findAdminByUsername = async (username: string) => {
  try {
    const users = await prisma.admin.findUnique({
      where: { username },
      include: {storeBranch: true}
    });
    return users;
  } catch (error) {
    throw error;
  }
};
