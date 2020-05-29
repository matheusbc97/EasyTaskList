import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';
import {AppTheme} from '../../library/models/AppTheme';
import {BLUE_GREEN} from '../../assets/themes';

type TokenInterceptorId = null | number;

const initialTheme = BLUE_GREEN;

const initialState = {
  tokenInterceptorId: null as TokenInterceptorId,
  theme: initialTheme,
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
  },
});

export default configs.reducer;
export const {
  setTokenInterceptorId,
  resetTokenInterceptorId,
  setAppTheme,
  resetAppTheme,
} = configs.actions;

export const selectTokenInterceptorId = (state: RootState) =>
  state.configs.tokenInterceptorId;

export const selectAppTheme = (state: RootState) => state.configs.theme;
