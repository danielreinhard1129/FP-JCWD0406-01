import prisma from '@/prisma';

export const findUserByEmailAndUsername = async (
  email: string,
  username: string,
) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            email: {
              equals: email,
            },
          },
          {
            username: {
              equals: username,
            },
          },
        ],
      },
    });
    return users;
  } catch (error) {
    throw error;
  }
};
