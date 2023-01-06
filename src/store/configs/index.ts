import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';
import {AppTheme} from '@shared/models';
import {BLUE_GREEN} from '@assets/themes';

const initialTheme = BLUE_GREEN;

const initialState = {
  theme: initialTheme,
  isLogged: false,
};

const configs = createSlice({
  name: 'configs',
  initialState,
  reducers: {
    setAppTheme: (state, action: PayloadAction<AppTheme>) => {
      state.theme = action.payload;
    },
    resetAppTheme: state => {
      state.theme = initialTheme;
    },
    setIsLogged: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
    },
    resetAll: () => {
      return initialState;
    },
  },
});

export default configs.reducer;
export const {setAppTheme, resetAppTheme, setIsLogged, resetAll} =
  configs.actions;

export const selectAppTheme = (state: RootState) => state.configs.theme;

export const selectIsLogged = (state: RootState) => state.configs.isLogged;
