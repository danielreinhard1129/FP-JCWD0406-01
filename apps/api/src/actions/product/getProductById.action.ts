import { logger } from '@/logger';
import { getProductById } from '@/repositories/product/getProductById';

export const getProductByIdAction = async (id: number) => {
  try {
    const result = await getProductById(id);
    logger.info(`get product by id ${id} was success`);
    return {
      message: `get product by id ${id} was success`,
      status: 200,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};
