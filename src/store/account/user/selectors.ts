import {RootState} from '../../index';

export const selectUser = (state: RootState) => state.account.user;
export const selectUserName = (state: RootState) => state.account.user?.name;
