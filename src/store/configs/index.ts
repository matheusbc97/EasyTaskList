import {createSlice} from '@reduxjs/toolkit';

type TokenInterceptorId = null | number;

const configs = createSlice({
  name: 'configs',
  initialState: {
    tokenInterceptorId: null as TokenInterceptorId,
  },
  reducers: {
    setTokenInterceptorId: (state, action) => {
      state.tokenInterceptorId = action.payload;
    },
    resetTokenInterceptorId: (state) => {
      state.tokenInterceptorId = null;
    },
  },
});

export default configs.reducer;
export const {setTokenInterceptorId, resetTokenInterceptorId} = configs.actions;
