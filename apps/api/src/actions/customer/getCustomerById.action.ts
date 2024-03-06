import { getCustomerById } from '@/repositories/customer/getCustomerById';

export const getCustomerByIdAction = async (id: number) => {
  try {
    const result = await getCustomerById(id);
    return {
      message: 'get customer by id success',
      status: 200,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};
