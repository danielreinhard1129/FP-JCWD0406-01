import { PrismaClient } from '@prisma/client';

interface IRegisterAdmin {
  email: string;
  username: string;
  password: string;
  branchId: number;
}

export const createAdmin = async (
  data: IRegisterAdmin,
  transaction?: any,
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
