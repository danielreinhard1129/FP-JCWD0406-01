import { logger } from '@/logger';
import { getUserById } from '@/repositories/user/getUserById';

export const getUserByIdAction = async (id: number) => {
  try {
    const result = await getUserById(id);

    logger.info(`get customer by id ${id} was success`)
    return {
      message: `get customer by id ${id} was success`,
      status: 200,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};
