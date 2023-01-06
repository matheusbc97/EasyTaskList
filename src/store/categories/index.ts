import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {getUserCategories} from './thunkActions';
import {selectCategoriesFetchState, categoryListSelectors} from './selectors';
import {categoryAdapter} from './adapters';
import {Category} from '@shared/models';
import {categoriesInitialState} from '@/initialStates/categoriesInitialState';

const defaultState = categoryAdapter.getInitialState({
  fetchState: {
    isLoading: false,
    hasError: false,
  },
});

const filledState = categoryAdapter.setAll(
  defaultState,
  categoriesInitialState,
);

const categories = createSlice({
  name: 'account/categories',
  initialState: filledState,
  reducers: {
    resetCategories: () => {
      return filledState;
    },
    setCategoriesLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchState.isLoading = action.payload;
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      categoryAdapter.setAll(state, action.payload);
    },
    createCategory: (state, action: PayloadAction<Category>) => {
      categoryAdapter.addOne(state, action.payload);
    },
    updateCategory: (
      state,
      {
        payload: {id, changes},
      }: PayloadAction<{id: string; changes: Partial<Category>}>,
    ) => {
      categoryAdapter.updateOne(state, {id, changes});
    },
  },
});

export default categories.reducer;

export const {resetCategories, setCategories, createCategory, updateCategory} =
  categories.actions;

export {getUserCategories, selectCategoriesFetchState, categoryListSelectors};
