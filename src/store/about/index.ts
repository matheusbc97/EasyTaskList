import {createSlice} from '@reduxjs/toolkit';

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
});

export default aboutItems.reducer;

export const {resetAboutItems} = aboutItems.actions;

export {aboutItemsListSelectors, selectAboutItemsFetchState};
