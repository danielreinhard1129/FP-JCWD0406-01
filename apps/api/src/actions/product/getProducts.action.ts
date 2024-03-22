import { getProducts } from '@/repositories/product/getProducts';

export const getProductsAction = async (limit: number) => {
  try {
    const result = await getProducts(limit);
    return {
      message: 'get products success',
      status: 200,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};
