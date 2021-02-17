import {createSlice} from '@reduxjs/toolkit';

import {getAboutItems} from './thunkActions';
import {aboutItemsListSelectors, selectAboutItemsFetchState} from './selectors';
import {aboutItemsAdapter} from './adapters';

const initialState = aboutItemsAdapter.getInitialState({
  fetchState: {
    isLoading: false,
    hasError: false,
  },
});

const aboutItems = createSlice({
  name: 'aboutItems',
  initialState,
  reducers: {
    resetAboutItems: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAboutItems.pending, (state) => {
      state.fetchState.isLoading = true;
      state.fetchState.hasError = false;
    });

    builder.addCase(getAboutItems.fulfilled, (state, action) => {
      aboutItemsAdapter.setAll(state, action.payload);
      state.fetchState.isLoading = false;
      state.fetchState.hasError = false;
    });

    builder.addCase(getAboutItems.rejected, (state) => {
      state.fetchState.isLoading = false;
      state.fetchState.hasError = true;
    });
  },
});

export default aboutItems.reducer;

export const {resetAboutItems} = aboutItems.actions;

export {aboutItemsListSelectors, selectAboutItemsFetchState, getAboutItems};
