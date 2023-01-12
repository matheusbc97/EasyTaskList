import {database} from '../config';
import {TABLE_KEYS} from '../constants/tableKeys';
import CategoryModel from '../models/CategoryModel';

interface UpdateCategoryParams {
  categoryId: string;
  name?: string;
  colorIndex?: number;
  iconIndex?: number;
}

export async function dbUpdateCategory({
  categoryId,
  ...updates
}: UpdateCategoryParams) {
  await database.write(async () => {
    const categoryModel = await database
      .get<CategoryModel>(TABLE_KEYS.CATEGORIES)
      .find(categoryId);

    categoryModel.update(category => {
      Object.keys(updates).forEach(key => {
        (category as any)[key] = (updates as any)[key];
      });
    });
  });
}
