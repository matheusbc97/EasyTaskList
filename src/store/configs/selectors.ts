import {RootState} from '../index';

export const selectTokenInterceptorId = (state: RootState) =>
  state.configs.tokenInterceptorId;
