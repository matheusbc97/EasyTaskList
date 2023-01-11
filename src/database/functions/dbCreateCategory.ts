import {database} from '../config';
import {TABLE_KEYS} from '../constants/tableKeys';
import CategoryModel from '../models/CategoryModel';

interface CreateCategoryParams {
  name: string;
  colorIndex: number;
  iconIndex: number;
}

export async function dbCreateCategory(params: CreateCategoryParams) {
  await database.write(async () => {
    await database.get<CategoryModel>(TABLE_KEYS.CATEGORIES).create(data => {
      data.name = params.name;
      data.colorIndex = params.colorIndex;
      data.iconIndex = params.iconIndex;
    });
  });
}
