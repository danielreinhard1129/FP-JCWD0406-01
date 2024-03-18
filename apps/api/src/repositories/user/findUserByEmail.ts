import prisma from '@/prisma';

export const findUserByEmail = async (email: string) => {
  try {
    const users = await prisma.user.findUnique({
      where: { email },
    });
    return users;
  } catch (error) {
    throw error;
  }
};
