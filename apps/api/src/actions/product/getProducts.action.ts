import { getProducts } from '@/repositories/product/getProducts';

export const getProductsAction = async () => {
  try {
    const result = await getProducts();
    return {
      message: 'get products success',
      status: 200,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};
