import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {createTask} from './thunkActions';
import {tasksListSelectors} from './selectors';
import {tasksAdapter} from './adapters';

const initialState = tasksAdapter.getInitialState({
  fetchState: {
    isLoading: false,
    hasError: false,
  },
});

const categories = createSlice({
  name: 'tasks',
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
    builder.addCase(createTask.fulfilled, (state, action) => {
      tasksAdapter.upsertOne(state, action.payload);
    });
  },
});

export default categories.reducer;

export const {resetCategories} = categories.actions;

export {tasksListSelectors, createTask};
