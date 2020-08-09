import {RootState} from '../index';
import {categoryAdapter} from './adapters';

export const categoryListSelectors = categoryAdapter.getSelectors(
  (state: RootState) => state.categories,
);

export const selectCategoriesFetchState = (state: RootState) =>
  state.categories.fetchState;
