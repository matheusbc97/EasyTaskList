import {configureStore} from '@reduxjs/toolkit';

import reducer from '../store/reducers';

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
