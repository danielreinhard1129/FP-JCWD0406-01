import { findProductByIdRepo } from '@/repositories/product/findProductByIdRepo';

export const getProductByIdAction = async (id: number) => {
  try {
    const result = await findProductByIdRepo(id)
    return {
      message: 'get product by id success',
      status: 200,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};
