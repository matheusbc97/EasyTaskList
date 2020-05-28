import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../../library/models/User';
import {authenticateUser} from '../user/thunkActions';

type State = User | null;

const user = createSlice({
  name: 'account/user',
  initialState: null as State,
  reducers: {
    resetUser: () => {
      console.log('reseted');
      return null;
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
  },
});

export default user.reducer;

const {resetUser} = user.actions;

export {resetUser, authenticateUser};
