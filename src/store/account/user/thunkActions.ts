import {createAsyncThunk} from '@reduxjs/toolkit';

//import AccountService from '@services/AccountService';
//import {tokenIterceptor} from '@shared/api/interceptors';
import {loaderHandler} from '@shared/components/LoadingHandler';
import {handleErrorMessage} from '@shared/utils/errorHandler';
import {setIsLogged} from '../../configs';
import {
  createUserProfileDocument,
  signInWithEmailAndPassword,
} from '@shared/firebase';
//import {setTokenInterceptorId} from '../../configs';

interface AuthCredentials {
  email: string;
  password: string;
}

export const authenticateUser = createAsyncThunk(
  'account/user/login',
  async ({email, password}: AuthCredentials, {dispatch}) => {
    try {
      loaderHandler.showLoader();
      const user = await signInWithEmailAndPassword(email, password);

      dispatch(setIsLogged(true));
      loaderHandler.hideLoader();
      return user;
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
      //AccountService.register(email);
      //const id = tokenIterceptor(response.data.token);
      //dispatch(setTokenInterceptorId(id));
      loaderHandler.hideLoader();
      return user;
    } catch (error) {
      handleErrorMessage(error);
      console.log('qqqq');
      throw new Error(error.data);
    }
  },
);
