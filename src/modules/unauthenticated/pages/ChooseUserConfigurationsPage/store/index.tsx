import {AnyAction, configureStore} from '@reduxjs/toolkit';
import React, {PropsWithChildren} from 'react';
import {
  Provider,
  createStoreHook,
  createDispatchHook,
  createSelectorHook,
  ReactReduxContextValue,
  TypedUseSelectorHook,
} from 'react-redux';
import {UserPreppingState} from './userPrepping/types';
import userPreppingReducer from './userPrepping';

const UserPreppingContext = React.createContext(
  {} as ReactReduxContextValue<UserPreppingState, AnyAction>,
);

export const useUserPreppingStore = createStoreHook(UserPreppingContext);
export const useUserPreppingDispatch = createDispatchHook(UserPreppingContext);

export const useUserPreppingSelector: TypedUseSelectorHook<UserPreppingState> =
  createSelectorHook(UserPreppingContext);

export function UserPreppingProvider({children}: PropsWithChildren) {
  return (
    <Provider
      context={UserPreppingContext as any}
      store={configureStore({
        reducer: userPreppingReducer,
      })}>
      {children}
    </Provider>
  );
}
