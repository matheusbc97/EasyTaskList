import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  getUserCategories,
  createCategory,
  updateCategory,
} from './thunkActions';
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
  },
  extraReducers: builder => {
    builder.addCase(getUserCategories.pending, state => {
      state.fetchState.hasError = false;
      state.fetchState.isLoading = true;
    });

    builder.addCase(getUserCategories.fulfilled, (state, action) => {
      categoryAdapter.setAll(state, action.payload);
      state.fetchState.isLoading = false;
    });

    builder.addCase(getUserCategories.rejected, state => {
      state.fetchState.isLoading = false;
      state.fetchState.hasError = true;
    });

    builder.addCase(createCategory.fulfilled, (state, action) => {
      categoryAdapter.addOne(state, action.payload);
    });

    builder.addCase(
      updateCategory.fulfilled,
      (state, {payload: {id, ...changes}}) => {
        categoryAdapter.updateOne(state, {id, changes});
      },
    );
  },
});

export default categories.reducer;

export const {resetCategories, setCategories} = categories.actions;

export {
  getUserCategories,
  selectCategoriesFetchState,
  categoryListSelectors,
  createCategory,
  updateCategory,
};
