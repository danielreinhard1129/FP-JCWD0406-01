import prisma from '@/prisma';

export const findAdminByEmailAndUsername = async (
  email: string,
  username: string,
) => {
  try {
    const users = await prisma.admin.findMany({
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
