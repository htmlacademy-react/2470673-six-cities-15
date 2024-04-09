import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatch,State } from '../types/types';
import { Offers } from '../types/types';
import {loadOffers, requireAuthorization, setOffersIsLoading, getOffers, setError,redirectToRoute,setUser} from './action';
import {saveToken, dropToken} from '../services/token';
import { AuthData } from '../types/types';
import {UserConnect} from '../types/user';
import {store} from './';
import { ApiRoute,AuthorizationStatuss,TIMEOUT_SHOW_ERROR,AppRoutes } from '../const/const';


export const fetchOfferAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersIsLoading(true));

    const {data} = await api.get<Offers>(ApiRoute.Offers);
    dispatch(setOffersIsLoading(false));
    dispatch(loadOffers(data));
    dispatch(getOffers());
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(ApiRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatuss.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatuss.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserConnect>(ApiRoute.Login, {email, password});
    const {token} = data;
    saveToken(token);
    dispatch(setUser(data));
    dispatch(redirectToRoute(AppRoutes.Main));
    dispatch(requireAuthorization(AuthorizationStatuss.Auth));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatuss.NoAuth));
  },
);

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
