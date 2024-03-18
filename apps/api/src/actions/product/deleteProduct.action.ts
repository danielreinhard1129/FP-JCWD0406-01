import { deleteProductRepo } from '@/repositories/product/deleteProductRepo';
import { findProductByIdRepo } from '@/repositories/product/findProductByIdRepo';

export async function deleteProductAction(id: number) {
  try {
    const isExist = await findProductByIdRepo(id);
    // if (!isExist) return { status: 404, message: 'Product is not found' };
    await deleteProductRepo(id);
    return { status: 200, message: 'Success delete product' };
  } catch (error) {
    throw error;
  }
}
