import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {User, AppThemeName} from '@shared/models';
import {authenticateUser, registerUser} from './thunkActions';
import {selectUser, selectUserName} from './selectors';

type State = User | null;

const user = createSlice({
  name: 'account/user',
  initialState: null as State,
  reducers: {
    resetUser: () => {
      return null;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      if (state) {
        state.name = action.payload;
      }
    },
    setUserAvatar: (state, action: PayloadAction<number>) => {
      if (state) {
        state.avatar = action.payload;
      }
    },
    setUserTheme: (state, action: PayloadAction<AppThemeName>) => {
      if (state) {
        state.theme = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      return action.payload.user as User;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      return action.payload as User;
    });
  },
});

export default user.reducer;

export const {
  resetUser,
  setUserName,
  setUserAvatar,
  setUserTheme,
} = user.actions;

export {authenticateUser, selectUser, registerUser, selectUserName};
