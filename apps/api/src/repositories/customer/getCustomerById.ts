import prisma from '@/prisma';

export const getCustomerById = async (id: number) => {
  try {
    // const result = await prisma.customer.findUnique({
    //   where: { id },
    //   include: {
    //     addresses: true,
    //   },
    // });
    // return result;
  } catch (error) {
    throw error;
  }
};
