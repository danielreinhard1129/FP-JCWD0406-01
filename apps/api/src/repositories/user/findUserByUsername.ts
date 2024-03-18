import prisma from '@/prisma';

export const findUserByUsername = async (username: string) => {
  try {
    const users = await prisma.user.findUnique({
      where: { username },
    });
    return users;
  } catch (error) {
    throw error;
  }
};
