import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

interface IRegisterAdmin {
  email: string;
  username: string;
  password: string;
  branchId: number;
}

export const createAdmin = async (
  data: IRegisterAdmin,
  transaction?: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
) => {
  try {
    const { email, username, password, branchId } = data;

    const prisma = transaction || new PrismaClient();

    const admin = prisma.admin.create({
      data: { email, username, password, branchId, image: '' },
    });

    return admin;
  } catch (error) {
    throw error;
  }
};
