import { PrismaClient } from '@prisma/client';

interface IUser {
  email: string;
  username: string;
  password: string;
  phone: number;
}

export const createUser = async (data: IUser, transaction?: any) => {
  try {
    const prisma = transaction || new PrismaClient();

    const { email, username, password, phone } = data;
    const user = await prisma.user.create({
      data: { email, username, password, phone, image: '' },
    });

    return user;
  } catch (error) {
    throw error;
  }
};
