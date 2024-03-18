import { IProductDB } from '@/types/product.type';
import { PrismaClient } from '@prisma/client';

export const createTransactionItems = async (
  products: IProductDB[],
  transactionId: string,
  transaction?: any,
) => {
  const data = products.map((product: IProductDB) => ({
    orderId: transactionId,
    productId: product?.product.id,
    productName: product?.product?.name,
    price: product?.product?.price,
    quantity: product?.amount,
  }));

  try {
    const prisma = transaction || new PrismaClient();

    const result = await prisma.orderItem.createMany({
      data: data,
    });

    return result;
  } catch (error) {
    throw error;
  }
};
