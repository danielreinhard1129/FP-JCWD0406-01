import { getProductById } from '@/repositories/product/getProductById';

export const getProductByIdAction = async (id: number) => {
  try {
    const result = await getProductById(id);
    return {
      message: 'get product by id success',
      status: 200,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};
