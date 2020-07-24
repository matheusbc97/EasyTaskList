import {createAsyncThunk} from '@reduxjs/toolkit';

import AccountService from '@services/AccountService';
import {tokenIterceptor} from '@shared/api/interceptors';
import {loaderHandler} from '@shared/components/LoadingHandler';
import {handleErrorMessage} from '@shared/utils/errorHandler';
import {setTokenInterceptorId} from '../../configs';

export const authenticateUser = createAsyncThunk(
  'account/user/login',
  async ({email}: {email: string}, {dispatch}) => {
    try {
      loaderHandler.showLoader();
      const response = await AccountService.login(email);
      const id = tokenIterceptor(response.data.token);
      dispatch(setTokenInterceptorId(id));
      loaderHandler.hideLoader();
      return response.data;
    } catch (error) {
      handleErrorMessage(error);
      throw error.data;
    }
  },
);

export const registerUser = createAsyncThunk(
  'account/user/register',
  async ({email}: {email: string; password: string}, {dispatch}) => {
    try {
      loaderHandler.showLoader();
      const response = await AccountService.register(email);
      const id = tokenIterceptor(response.data.token);
      dispatch(setTokenInterceptorId(id));
      loaderHandler.hideLoader();
      return response.data;
    } catch (error) {
      handleErrorMessage(error);
      throw error.data;
    }
  },
);
