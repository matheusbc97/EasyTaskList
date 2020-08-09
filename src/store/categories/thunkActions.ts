import {createAsyncThunk} from '@reduxjs/toolkit';

import {handleErrorMessage} from '@shared/utils/errorHandler';
import {getUserCategories as FgetUserCategories} from '@shared/firebase';
import {Category} from '@shared/models';

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
