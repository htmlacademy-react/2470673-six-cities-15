import {createSlice} from '@reduxjs/toolkit';
import { UserProcess } from '../../types/types';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
import { NameSpace,AuthorizationStatuss } from '../../const/const';
import {getToken} from '../../services/token';

const token = getToken();

const initialState: UserProcess = {
  authorizationStatus: token
    ? AuthorizationStatuss.Auth
    : AuthorizationStatuss.Unknown,
  user:  null
};

export const user = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatuss.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatuss.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        const userData = action.payload;
        state.authorizationStatus = AuthorizationStatuss.Auth;

        if (userData) {
          state.user = userData;
        }
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatuss.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatuss.NoAuth;
      });
  },
});
