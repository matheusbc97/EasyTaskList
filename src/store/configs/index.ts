import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';
import {AppTheme} from '@shared/models';
import {BLUE_RED} from '@assets/themes';

type TokenInterceptorId = null | number;

const initialTheme = BLUE_RED;

const initialState = {
  tokenInterceptorId: null as TokenInterceptorId,
  theme: initialTheme,
  isLogged: true,
};

const configs = createSlice({
  name: 'configs',
  initialState,
  reducers: {
    setTokenInterceptorId: (state, action) => {
      state.tokenInterceptorId = action.payload;
    },
    resetTokenInterceptorId: (state) => {
      state.tokenInterceptorId = null;
    },
    setAppTheme: (state, action: PayloadAction<AppTheme>) => {
      state.theme = action.payload;
    },
    resetAppTheme: (state) => {
      state.theme = initialTheme;
    },
    setIsLogged: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
    },
  },
});

export default configs.reducer;
export const {
  setTokenInterceptorId,
  resetTokenInterceptorId,
  setAppTheme,
  resetAppTheme,
  setIsLogged,
} = configs.actions;

export const selectTokenInterceptorId = (state: RootState) =>
  state.configs.tokenInterceptorId;

export const selectAppTheme = (state: RootState) => state.configs.theme;

export const selectIsLogged = (state: RootState) => state.configs.isLogged;
