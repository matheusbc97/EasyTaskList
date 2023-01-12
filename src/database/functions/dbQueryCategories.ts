import {database} from '@/database/config';
import CategoryModel from '@/database/models/CategoryModel';
import {Category} from '@/shared/models';

export async function dbQueryCategories() {
  const categoriesCollection = await database
    .get<CategoryModel>('categories')
    .query()
    .fetch();

  const newCategories = categoriesCollection.map(
    categoryItem =>
      ({
        colorIndex: categoryItem.colorIndex,
        iconIndex: categoryItem.iconIndex,
        id: categoryItem.id,
        name: categoryItem.name,
      } as Category),
  );

  return newCategories;
}
