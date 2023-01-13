import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {User, AppThemeName} from '@/shared/models';
import {selectUser, selectUserName} from './selectors';

type State = User;

const user = createSlice({
  name: 'account/user',
  initialState: {} as State,
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
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export default user.reducer;

export const {setUserName, setUserAvatar, setUserTheme, setUser} = user.actions;

export {selectUser, selectUserName};
