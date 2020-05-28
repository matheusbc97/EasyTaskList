import {createAsyncThunk} from '@reduxjs/toolkit';

import AccountService from '../../../services/AccountService';
import {tokenIterceptor} from '../../../library/api/interceptors';
import {loaderHandler} from '../../../library/components/LoadingHandler';
import {handleErrorMessage} from '../../../library/utils/errorHandler';
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
