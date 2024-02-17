import prisma from '@/prisma';
import { nanoid } from 'nanoid';

export const createTransactionItems = async ({
  products,
  transactionId,
}: any) => {
  
  try {
    // console.log("result",products.map((product: any) => ({
    //       id: `OGWA-ITEM-${nanoid(8)}`,
    //       orderId: transactionId,
    //       productId: product.product.id,
    //       productName: product.product.name,
    //       price: product.product.price,
    //       quantity: product.amount,
    //     })))
    // const result = await prisma.order_Item.createMany({
    //   data: products.map((product: any) => ({
    //     id: `OGWA-ITEM-${nanoid(8)}`,
    //     orderId: transactionId,
    //     productId: product.product.id,
    //     productName: product.product.name,
    //     price: product.product.price,
    //     quantity: product.amount,
    //   })),
    // });
    // return result;
    const result = await prisma.order_Item.createMany({
      data: {
        id: `OGWA-ITEM-${nanoid(8)}`,
        orderId: "OGWA-6e9y-dnSC",
        productId: 1,
        productName: "es buah",
        price: 123,
        quantity: 2,
      }
    });
    return result;
  } catch (error) {
    throw error;
  }
};
