import prisma from '@/prisma';
import { IProduct } from '@/type.api/product.type';

export async function createProductRepo(data: IProduct) {
  try {
    const result = await prisma.product.create({
     data,
    });
    return result;
  } catch (error) {
    throw error;
  }
}
