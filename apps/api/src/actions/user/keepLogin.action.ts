import { excludeFields } from '@/helpers/excludeFields';
import { logger } from '@/logger';
import { findUserByEmail } from '@/repositories/user/findUserByEmail';

export const keeploginAction = async (email: string) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      logger.error(`user with ${email} not found`);
      return {
        status: 404,
        message: `User with ${email} not found`,
      };
    }

    const dataWithoutPassword = excludeFields(user, ['password']);

    logger.info(`keep login with email ${email} success`);
    return {
      status: 200,
      message: `keep login with email ${email} success`,
      data: dataWithoutPassword,
    };
  } catch (error) {
    throw error;
  }
};
