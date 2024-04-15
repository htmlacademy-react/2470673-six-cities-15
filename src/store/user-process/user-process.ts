import {createSlice} from '@reduxjs/toolkit';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
import { NameSpace,AuthorizationStatuss, defaultUser } from '../../const';
import { UserProcess } from '../../types/state';


const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatuss.Unknown,
  userConnect: defaultUser,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    assignauthorizationStatusByDefault: (state) => {
      state.authorizationStatus = AuthorizationStatuss.NoAuth;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatuss.Auth;
        state.userConnect = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatuss.NoAuth;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatuss.Auth;
        state.userConnect = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatuss.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatuss.NoAuth;
        state.userConnect = defaultUser;
      });
  }
});

export const { assignauthorizationStatusByDefault } = userSlice.actions;
