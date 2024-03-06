import prisma from '@/prisma';
import { IProduct } from '@/type.api/product.type';
import { IStore } from '@/type.api/store.type';

export async function createProductRepo(data: IProduct , stores: IStore[]) {
  try {
    // const result = await prisma.$transaction(async (tx) => {
      // const product = await prisma.product.create({
      //   data,
      // });
      // let stock;
      // let stockChange;
      // for (const store of stores) {
      //   stock = await prisma.stock.create({
      //     data: {
      //       amount: 0,
      //       productId: product.id,
      //       branchId: store.id,
      //     },
      //   });

        // stockChange = await prisma.stock_Change.create({
        //   data: {
        //     StockAfter: 0,
        //     StockBefore: 0,
        //     stockId: stock.id,
        //   },
        // });
      // }
      // return product;
    // });
    // return result;
  } catch (error) {
    throw error;
  }
}
