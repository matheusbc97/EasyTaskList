import {useEffect, useState} from 'react';

import {database} from '@/database';
import CategoryModel from '@/database/model/CategoryModel';
import {Category} from '@shared/models';

export function useGetCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
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

      setCategories(newCategories);
    })();
  }, []);

  return {categories};
}
