import {createAsyncThunk} from '@reduxjs/toolkit';

import {handleErrorMessage} from '@shared/utils/errorHandler';
import {getAboutItemsFromDatabase} from '@shared/firebase';
import {AboutItem} from '@shared/models';

export const getAboutItems = createAsyncThunk(
  'tasks/getAboutItems',
  async (): Promise<AboutItem[]> => {
    try {
      const databaseAboutItems = await getAboutItemsFromDatabase();

      return databaseAboutItems;
    } catch (error) {
      handleErrorMessage(error);
      throw new Error(error);
    }
  },
);
