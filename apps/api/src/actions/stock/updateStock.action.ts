// import { getStockByIdRepo } from '@/repositories/Stock/getStockByIdRepo';
// import { updateStockRepo } from '@/repositories/Stock/updateStockRepo';
import { IStock } from '@/type.api/stock.type';

export const updateStockAction = async (id: number, body: IStock) => {
  try {
    // const isExist = await getStockByIdRepo(id);

    // if (!isExist) return { message: 'Stock is not found', status: 404 };
    // await updateStockRepo(id, body, isExist.amount);
    // return {
    //   status: 200,
    //   message: 'Stock Succes update',
    // };
  } catch (error) {
    throw error;
  }
};
