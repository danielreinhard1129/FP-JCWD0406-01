import { hashPassword } from '@/helpers/bcrypt';
import { logger } from '@/logger';
import prisma from '@/prisma';
import { createUser } from '@/repositories/user/createUser';
import { findUserByEmailAndUsername } from '@/repositories/user/findUserByEmailAndUsername';
import { IRegisterUser } from '@/types/user.type';

export const registerUserAction = async (data: IRegisterUser) => {
  try {
    await prisma.$transaction(async (transaction) => {
      try {
        const { email, username, password } = data;
        const users = await findUserByEmailAndUsername(email, username);

        if (users.length) {
          logger.error(`${email} and ${username} already exist`);
          return {
            status: 400,
            message: 'email or username already exist',
          };
        }

        const hashedPassword = await hashPassword(password);
        data.password = hashedPassword;

        await createUser(data, transaction);

        logger.info(`register new user ${username} was success`);
      } catch (error) {
        throw error;
      }
    });
    return {
      status: 200,
      message: `register new user was success`,
    };
  } catch (error) {
    throw error;
  }
};
