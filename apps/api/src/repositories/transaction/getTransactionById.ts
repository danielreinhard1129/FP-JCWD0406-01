import prisma from '@/prisma';

export const getTransactionById = async (transactionId: string) => {
  try {
    const result = await prisma.order.findUnique({
      where: { order_id: transactionId },
      include: {
        orderItem: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                image: true,
              },
            },
          },
        },
        customer: true,
        status: true,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
