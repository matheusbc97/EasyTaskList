import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {User} from '@shared/models';
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
      (state, action: PayloadAction<User>) => {
        return action.payload;
      },
    );

    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        return action.payload;
      },
    );
  },
});

export default user.reducer;

export const {resetUser, setUserName, setUserAvatar} = user.actions;

export {authenticateUser, selectUser, registerUser, selectUserName};
