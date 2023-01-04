import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {User, AppThemeName} from '@shared/models';
import {
  authenticateUser,
  registerUser,
  verifyIfUserIsLogged,
  resetUser,
  updateUser,
} from './thunkActions';
import {selectUser, selectUserName} from './selectors';

type State = User;

const user = createSlice({
  name: 'account/user',
  initialState: {name: '', email: '', theme: null, uid: ''} as State,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setUserAvatar: (state, action: PayloadAction<number>) => {
      state.avatar = action.payload;
    },
    setUserTheme: (state, action: PayloadAction<AppThemeName>) => {
      state.theme = action.payload;
    },
  },
  extraReducers: builder => {
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

    builder.addCase(updateUser.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
      } as State;
    });
  },
});

export default user.reducer;

export const {setUserName, setUserAvatar, setUserTheme} = user.actions;

export {
  authenticateUser,
  selectUser,
  registerUser,
  selectUserName,
  resetUser,
  updateUser,
};
