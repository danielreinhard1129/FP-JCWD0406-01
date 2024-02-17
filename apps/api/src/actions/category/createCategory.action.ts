import { createCategoryRepo } from '@/repositories/categories/createCategoryRepo';
import { findCategoryByNameRepo } from '@/repositories/categories/findCategoryByNameRepo';
import { ICategory } from '@/type.api/category.type';
import { Request } from 'express';
import { validationResult } from 'express-validator';

export async function createCategoryAction(req: Request) {
  try {
    
    const error = validationResult(req);
    if (!error.isEmpty()) return { status: 400, error: error.array() };
    const { name } = req.body as ICategory;
    const isExist = await findCategoryByNameRepo(name);

    if (isExist) return { message: 'Category already exist', status: 400 };
    if (!req.file) return { status: 400, message: 'No file chosen' };

    req.body.image = `${process.env.API_URL}/media/categories/${req.file.filename}`;

    await createCategoryRepo(req.body);
    return { status: 200, message: 'Success add Category' };
  } catch (error) {
    throw error;
  }
}
