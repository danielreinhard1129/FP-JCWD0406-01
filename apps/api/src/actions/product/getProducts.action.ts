import { getProducts } from '@/repositories/product/getProducts';
import { IFilter } from '@/type.api/filter.type';

export const getProductsAction = async (search: string ,filter:IFilter) => {
  try {
    // const result = await getProducts(search ,filter);
    // console.log(filter);
    
    return {
      message: 'get products success',
      status: 200,
      // data: result,
    };
  } catch (error) {
    throw error;
  }
};
