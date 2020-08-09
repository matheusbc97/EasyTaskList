import {createAsyncThunk} from '@reduxjs/toolkit';

import {loaderHandler} from '@shared/components/LoadingHandler';
import {handleErrorMessage} from '@shared/utils/errorHandler';
import {setIsLogged, setAppTheme} from '../../configs';
import {
  createUserProfileDocument,
  signInWithEmailAndPassword,
  updateData,
  getCurrentUser,
} from '@shared/firebase';
import {UserBeforeIsLoggedDTO} from '@shared/models/UserBeforeIsLoggedDTO';
import {selectUser} from './selectors';
import {RootState} from '@store/index';
import {Dictionary, User} from '@shared/models';

import * as appThemes from '@assets/themes';

interface AuthCredentials {
  email: string;
  password: string;
}

export const authenticateUser = createAsyncThunk(
  'account/user/login',
  async (
    {email, password}: AuthCredentials,
    {dispatch},
  ): Promise<{user: UserBeforeIsLoggedDTO; isLogged: boolean}> => {
    try {
      loaderHandler.showLoader();
      const {user, isOnFirestore} = await signInWithEmailAndPassword(
        email,
        password,
      );

      if (!isOnFirestore) {
        loaderHandler.hideLoader();
        return {
          user: user as UserBeforeIsLoggedDTO,
          isLogged: false,
        };
      }

      const userLogged = user as User;

      dispatch(setAppTheme(appThemes[userLogged.theme]));
      dispatch(setIsLogged(true));
      loaderHandler.hideLoader();
      return {
        user,
        isLogged: true,
      };
    } catch (error) {
      handleErrorMessage(error);
      throw new Error(error);
    }
  },
);

export const registerUser = createAsyncThunk(
  'account/user/register',
  async ({email, password}: AuthCredentials) => {
    try {
      loaderHandler.showLoader();
      const user = await createUserProfileDocument(email, password);

      loaderHandler.hideLoader();
      return user;
    } catch (error) {
      handleErrorMessage(error);
      throw new Error(error.data);
    }
  },
);

export const updateUser = createAsyncThunk(
  'account/user/updateUser',
  async (updates: Dictionary, {getState}) => {
    try {
      loaderHandler.showLoader();

      const uid = selectUser(getState() as RootState)?.uid;

      await updateData(`users/${uid}`, updates);

      loaderHandler.hideLoader();
      return true;
    } catch (error) {
      handleErrorMessage(error);
      throw new Error(error.data);
    }
  },
);

export const verifyIfUserIsLogged = createAsyncThunk(
  'account/user/verifyIfUserIsLogged',
  async (_, {dispatch}) => {
    try {
      loaderHandler.showLoader();
      const response = await getCurrentUser();

      if (!response) {
        return null;
      }

      const {user, isOnFirestore} = response;

      if (!isOnFirestore) {
        loaderHandler.hideLoader();
        return user as UserBeforeIsLoggedDTO;
      }

      dispatch(setIsLogged(true));
      loaderHandler.hideLoader();
      return user as User;
    } catch (error) {
      handleErrorMessage(error);
      throw new Error(error);
    }
  },
);
