import { findCategoryByIdRepo } from '@/repositories/categories/findCategoryByIdRepo';
import { createProductRepo } from '@/repositories/product/createProductRepo';
import { findProductByNameRepo } from '@/repositories/product/findProductByNameRepo';
import { getStoresRepo } from '@/repositories/store/getStoresRepo';
import { IProduct } from '@/type.api/product.type';
import { Request } from 'express';
import { validationResult } from 'express-validator';

export async function createProductAction(req: Request) {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) return { error: error.array(), status: 400 };

    let { name, image, price, weight, unitWeight, categoryId, description } =
      req.body as IProduct;

    const findByName = await findProductByNameRepo(name);
    const findIdCategory = await findCategoryByIdRepo(categoryId);
    // const stores = await getStoresRepo();

    // if (!stores?.length) {
    //   return { status: 400, message: 'there are no branch stores' };
    // }

    if (findByName)
      return { message: 'product name already exists', status: 400 };
    if (!findIdCategory)
      return { message: 'Category is not found', status: 400 };
    if (!req.file) return { status: 400, message: 'No file chosen' };

    if (unitWeight === 'GRAM' && weight >= 1000)
      return {
        status: 400,
        message: 'The unit weight in grams cannot be more than 1000',
      };

    image = `${process.env.API_URL}/media/products/${req.file.filename}`;
    price = parseInt(String(price), 0);
    categoryId = parseInt(String(categoryId), 0);
    weight = parseInt(String(weight), 0);
    const data: IProduct = {
      name,
      image,
      description,
      price,
      weight,
      unitWeight,
      categoryId,
    };
    await createProductRepo(data);

    return { message: 'Success add product', status: 200 };
  } catch (error) {
    throw error;
  }
}
