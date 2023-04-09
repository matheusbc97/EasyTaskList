import {User} from '@/modules/shared/models';
import {AnyAction, configureStore} from '@reduxjs/toolkit';
import React, {PropsWithChildren} from 'react';
import {
  createStoreHook,
  createDispatchHook,
  createSelectorHook,
  ReactReduxContextValue,
  TypedUseSelectorHook,
  Provider,
} from 'react-redux';

import userReducer from './user';

const UserContext = React.createContext(
  {} as ReactReduxContextValue<User, AnyAction>,
);

export const useUserStore = createStoreHook(UserContext);
export const useUserDispatch = createDispatchHook(UserContext);

export const useFundDetailsSelector: TypedUseSelectorHook<User> =
  createSelectorHook(UserContext);

interface UserProviderProps {
  user: User;
}

export function FundDetailsProvider({
  children,
  user,
}: PropsWithChildren<UserProviderProps>) {
  return (
    <Provider
      context={UserContext as any}
      store={configureStore({
        reducer: userReducer,
        preloadedState: user,
      })}>
      {children}
    </Provider>
  );
}
