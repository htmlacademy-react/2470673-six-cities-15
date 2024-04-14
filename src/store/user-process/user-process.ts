import {createSlice} from '@reduxjs/toolkit';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
import { NameSpace,AuthorizationStatuss } from '../../components/const/const';
import { UserProcess } from '../../types/state';


const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatuss.Unknown,
  userConnect:  null,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    assignauthorizationStatusByDefault: (state) => {
      state.authorizationStatus = AuthorizationStatuss.Unknown;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, {payload}) => {
        state.authorizationStatus = AuthorizationStatuss.Auth;
        state.userConnect = payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatuss.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.userConnect = action.payload;
        state.authorizationStatus = AuthorizationStatuss.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatuss.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatuss.NoAuth;
      })

      .addCase(logoutAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatuss.Auth;
      });
  },
});

export const {assignauthorizationStatusByDefault} = userSlice.actions;
