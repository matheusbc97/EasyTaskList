import {RootState} from '../index';
import {aboutItemsAdapter} from './adapters';

export const aboutItemsListSelectors = aboutItemsAdapter.getSelectors(
  (state: RootState) => state.about,
);

export const selectAboutItemsFetchState = (state: RootState) =>
  state.about.fetchState;
