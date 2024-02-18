import { getProducts } from '@/repositories/product/getProducts';

export const getProductsAction = async (search: string) => {
  try {
    const result = await getProducts(search);
    return {
      message: 'get products success',
      status: 200,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};
