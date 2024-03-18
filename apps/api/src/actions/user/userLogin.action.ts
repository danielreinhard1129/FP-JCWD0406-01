import { comparePasswords } from '@/helpers/bcrypt';
import { excludeFields } from '@/helpers/excludeFields';
import { createToken } from '@/helpers/jwt';
import { findUserByEmail } from '@/repositories/user/findUserByEmail';
import { findUserByUsername } from '@/repositories/user/findUserByUsername';
import { logger } from '@/logger';

export const LoginUserAction = async (
  usernameOrEmail: string,
  password: string,
) => {
  try {
    let user;

    if (usernameOrEmail.includes('@')) {
      user = await findUserByEmail(usernameOrEmail);
    } else {
      user = await findUserByUsername(usernameOrEmail);
    }

    if (!user) {
      logger.error(`${usernameOrEmail} not found`);
      return {
        status: 404,
        message: 'Account not found',
      };
    }

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      logger.error(`${password} invalid`);
      return {
        status: 400,
        message: 'Invalid credentials',
      };
    }

    const dataWithoutPassword = excludeFields(user, ['password']);

    const token = createToken({ email: user?.email });

    logger.info(`login success with usernameOrEmail ${usernameOrEmail}`);

    return {
      status: 200,
      message: `login success with usernameOrEmail ${usernameOrEmail}`,
      data: dataWithoutPassword,
      token,
    };
  } catch (error) {
    throw error;
  }
};
