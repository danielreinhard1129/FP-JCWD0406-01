import { IProductDB } from '@/types/product.type';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export const createTransactionItems = async (
  products: Partial<IProductDB>[],
  transactionId: string,
  transaction?: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
) => {
  const data: any = products.map((product: Partial<IProductDB>) => ({
    orderId: transactionId,
    productId: product?.product?.id,
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
