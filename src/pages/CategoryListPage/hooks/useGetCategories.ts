import {useCallback, useState} from 'react';

import {database} from '@/database';
import CategoryModel from '@/database/model/CategoryModel';
import {Category} from '@/shared/models';
import {useFocusEffect} from '@react-navigation/native';

async function fetchCategories() {
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

export function useGetCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const newCategories = await fetchCategories();

        setCategories(newCategories);
      })();
    }, []),
  );

  return {categories};
}
