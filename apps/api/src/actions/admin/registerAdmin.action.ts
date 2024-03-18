import { hashPassword } from '@/helpers/bcrypt';
import { logger } from '@/logger';
import prisma from '@/prisma';
import { createAdmin } from '@/repositories/admin/createAdmin';
import { findAdminByEmailAndUsername } from '@/repositories/admin/findAdminByEmailAndUsername';
import { IRegisterAdmin } from '@/types/user.type';

export const registerAdminAction = async (data: IRegisterAdmin) => {
  try {
    await prisma.$transaction(async (transaction) => {
      try {
        const { email, username, password } = data;
        const admins = await findAdminByEmailAndUsername(email, username);

        if (admins.length) {
          logger.error(`${email} and ${username} already exist`);
          return {
            status: 400,
            message: `${email} and ${username} already exist`,
          };
        }

        const hashedPassword = await hashPassword(password);
        data.password = hashedPassword;

        await createAdmin(data, transaction);

        logger.info(`register new admin ${username} was success`);
      } catch (error) {
        throw error;
      }
    });

    return {
      status: 200,
      message: `register new admin success`,
    };
  } catch (error) {
    throw error;
  }
};
