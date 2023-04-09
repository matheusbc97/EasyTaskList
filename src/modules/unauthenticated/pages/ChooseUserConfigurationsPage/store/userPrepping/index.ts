import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AppThemeName} from '@/modules/shared/models';
import {selectUserPrepping} from './selectors';
import {UserPreppingState} from './types';

const initialState = {} as UserPreppingState;

const user = createSlice({
  name: 'userPrepping',
  initialState,
  reducers: {
    setUserPreppingName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setUserPreppingAvatar: (state, action: PayloadAction<number>) => {
      state.avatar = action.payload;
    },
    setUserPreppingTheme: (state, action: PayloadAction<AppThemeName>) => {
      state.theme = action.payload;
    },
  },
});

export default user.reducer;

export const {
  setUserPreppingAvatar,
  setUserPreppingName,
  setUserPreppingTheme,
} = user.actions;

export {selectUserPrepping};
