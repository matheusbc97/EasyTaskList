import {configureStore} from '@reduxjs/toolkit';

import combinedReducer from '../store/reducers';

const rootReducer = (state: any, action: any) => {
  if (action.type === 'configs/resetAll') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
