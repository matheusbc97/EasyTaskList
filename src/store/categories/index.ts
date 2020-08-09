import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {getUserCategories} from './thunkActions';
import {selectCategoriesFetchState, categoryListSelectors} from './selectors';
import {categoryAdapter} from './adapters';

const initialState = categoryAdapter.getInitialState({
  fetchState: {
    isLoading: false,
    hasError: false,
  },
});

const categories = createSlice({
  name: 'account/categories',
  initialState,
  reducers: {
    resetCategories: () => {
      return initialState;
    },
    setCategoriesLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchState.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserCategories.pending, (state) => {
      state.fetchState.hasError = false;
      state.fetchState.isLoading = true;
    });

    builder.addCase(getUserCategories.fulfilled, (state, action) => {
      categoryAdapter.setAll(state, action.payload);
      state.fetchState.isLoading = false;
    });

    builder.addCase(getUserCategories.rejected, (state) => {
      state.fetchState.isLoading = false;
      state.fetchState.hasError = true;
    });
  },
});

export default categories.reducer;

export const {resetCategories} = categories.actions;

export {getUserCategories, selectCategoriesFetchState, categoryListSelectors};
