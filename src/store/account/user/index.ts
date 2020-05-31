import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {User} from '../../../library/models/User';
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
  },
  extraReducers: (builder) => {
    builder.addCase(
      authenticateUser.fulfilled,
      (state, action: PayloadAction<{user: User; token: string}>) => {
        return action.payload.user;
      },
    );

    builder.addCase(authenticateUser.rejected, () => {
      //console.log('error', action.error);
    });

    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<{user: User; token: string}>) => {
        return action.payload.user;
      },
    );
  },
});

export default user.reducer;

export const {resetUser, setUserName, setUserAvatar} = user.actions;

export {authenticateUser, selectUser, registerUser, selectUserName};
