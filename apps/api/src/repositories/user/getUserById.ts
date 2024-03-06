import prisma from '@/prisma';

export const getUserById = async (id: number) => {
  try {
    const result = await prisma.user.findUnique({
      where: { id },
      include: {
        addresses: true,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
