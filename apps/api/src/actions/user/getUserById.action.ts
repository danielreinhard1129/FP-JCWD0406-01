import { getUserById } from '@/repositories/user/getUserById';

export const getUserByIdAction = async (id: number) => {
  try {
    const result = await getUserById(id);
    return {
      message: 'get customer by id success',
      status: 200,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};
