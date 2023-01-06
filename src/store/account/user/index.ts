import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {User, AppThemeName} from '@shared/models';
import {
  authenticateUser,
  registerUser,
  resetUser,
  updateUser,
} from './thunkActions';
import {selectUser, selectUserName} from './selectors';

type State = User;

const user = createSlice({
  name: 'account/user',
  initialState: {
    name: 'Teste',
    email: 'teste@teste.com',
    theme: 'BLUE_GREEN',
    uid: '1',
    avatar: 1,
  } as State,
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
