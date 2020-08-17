import {createAsyncThunk} from '@reduxjs/toolkit';

import {handleErrorMessage} from '@shared/utils/errorHandler';
import {
  getUserCategories as FgetUserCategories,
  createUserCategory,
} from '@shared/firebase';
import {Category} from '@shared/models';
import {selectUser} from '@store/account/user';
import {RootState} from '..';
import {loaderHandler} from '@shared/components/LoadingHandler';

export const getUserCategories = createAsyncThunk(
  'categories/getUserCategories',
  async (): Promise<Category[]> => {
    try {
      const categories = await FgetUserCategories();

      return categories;
    } catch (error) {
      handleErrorMessage(error);
      throw new Error(error);
    }
  },
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (category: Omit<Category, 'id'>, {getState}): Promise<Category> => {
    try {
      loaderHandler.showLoader();
      const user = selectUser(getState() as RootState);

      const categoryId = await createUserCategory(user!.uid, category);

      loaderHandler.hideLoader();
      return {
        id: categoryId,
        ...category,
      };
    } catch (error) {
      handleErrorMessage(error);
      throw new Error(error);
    }
  },
);
