import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {User, AppThemeName} from '@shared/models';
import {
  authenticateUser,
  registerUser,
  verifyIfUserIsLogged,
  resetUser,
} from './thunkActions';
import {selectUser, selectUserName} from './selectors';

type State = User | null;

const user = createSlice({
  name: 'account/user',
  initialState: null as State,
  reducers: {
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

    builder.addCase(verifyIfUserIsLogged.fulfilled, (state, action) => {
      return action.payload as User;
    });

    builder.addCase(resetUser.fulfilled, () => {
      return null;
    });
  },
});

export default user.reducer;

export const {setUserName, setUserAvatar, setUserTheme} = user.actions;

export {authenticateUser, selectUser, registerUser, selectUserName, resetUser};
