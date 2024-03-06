import prisma from '@/prisma';

export const getTransactionById = async (transactionId: string) => {
  try {
    const result = await prisma.order.findUnique({
      where: { orderId: transactionId },
      include: {
        orderItems: {
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
        user: true,
        status: true,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
