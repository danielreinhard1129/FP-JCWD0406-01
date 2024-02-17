import { findProductByIdRepo } from '@/repositories/product/findProductByIdRepo';
import { findProductByNameRepo } from '@/repositories/product/findProductByNameRepo';
import { updateProductRepo } from '@/repositories/product/updateProductRepo';
import { IProduct } from '@/type.api/product.type';

export async function updateProductAction(
  id: number,
  body: IProduct,
  file: any,
) {
  try {
    const isExist = await findProductByIdRepo(id);
    const findProductName = await findProductByNameRepo(body.name);
    if (findProductName?.name === body.name && isExist?.name != body.name)
      return { status: 400, message: 'Product name is already exist' };
    if (Object.keys(body).length === 0)
      return { status: 400, message: 'Body cannot empty' };
    if (!isExist) return { status: 404, message: 'Product is not found' };
    if (file) {
      body.image = `${process.env.API_URL}/media/products/${file.filename}`;
    }
    body.price = parseInt(String(body.price), 0);
    body.categoryId = parseInt(String(body.categoryId), 0);
    body.weight = parseInt(String(body.weight), 0);

    await updateProductRepo(body, id);

    return { status: 200, message: 'Success update product' };
  } catch (error) {
    throw error;
  }
}
