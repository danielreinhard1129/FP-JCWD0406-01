import { findCategoryByIdRepo } from '@/repositories/categories/findCategoryByIdRepo';
import { updateCategoryRepo } from '@/repositories/categories/updateCategoryRepo';
import { ICategory } from '@/type.api/category.type';

export async function updateCategoryAction(
  id: number,
  body: ICategory,
  file: any,
) {
  try {
    const isExist = await findCategoryByIdRepo(id);
    // if (Object.keys(body).length === 0) return { status: 400, message: 'Body cannot empty' };
    if (!isExist) return { status: 404, message: 'Category is not found' };
    if (file)
      body.image = `${process.env.API_URL}/media/categories/${file.filename}`;
    await updateCategoryRepo(id, body);
    
    return { status: 200, message: 'Success update Category'};
  } catch (error) {
    throw error;
  }
}
