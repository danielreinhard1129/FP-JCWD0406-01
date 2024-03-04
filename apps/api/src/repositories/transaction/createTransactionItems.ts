import prisma from '@/prisma';

export const createTransactionItems = async ({
  products,
  transactionId,
}: any) => {
  const data = products.map((product: any) => ({
    orderId: transactionId,
    productId: product?.product.id,
    productName: product?.product?.name,
    price: product?.product?.price,
    quantity: product?.amount,
  }));

  try {
    const result = await prisma.order_Item.createMany({
      data: data,
    });
    return result;
  } catch (error) {
    throw error;
  }
};
