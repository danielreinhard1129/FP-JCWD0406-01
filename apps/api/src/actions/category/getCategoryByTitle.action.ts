import { getCagetoryByTitle } from '@/repositories/category/getCategoryByTitle';

export const getCategoryByTitleAction = async (
  title: string,
  limit: number,
) => {
  try {
    const result = await getCagetoryByTitle(title, limit);
    return {
      message: 'get category by title success',
      status: 200,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};
