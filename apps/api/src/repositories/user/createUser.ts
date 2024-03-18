import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

interface IUser {
  email: string;
  username: string;
  password: string;
  phone: number;
}

export const createUser = async (
  data: IUser,
  transaction?: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
) => {
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
