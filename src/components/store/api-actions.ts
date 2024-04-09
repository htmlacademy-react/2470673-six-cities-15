import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatch,State } from '../types/types';
import { Offers,Offer } from '../types/types';
import { Reviews } from '../types/types';
import { CommentData } from '../types/types';
import {loadOffers,
  requireAuthorization,
  setOffersIsLoading,
  getOffers,
  setError,
  redirectToRoute,
  setUser,
  loadOffer,
  setOfferIsLoading,
  addReviews,
  setOfferIsNotFound,
  loadNearPlaces,
  setNearPlacesIsLoading,
  setNearPlacesIsNotFound} from './action';
import {saveToken, dropToken} from '../services/token';
import { AuthData } from '../types/types';
import {UserConnect} from '../types/user';
import {store} from './';
import { ApiRoute,AuthorizationStatuss,TIMEOUT_SHOW_ERROR,AppRoutes } from '../const/const';


export const fetchOffersAction = createAsyncThunk<void, undefined, {
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
    dispatch(requireAuthorization(AuthorizationStatuss.Auth));
    dispatch(redirectToRoute(AppRoutes.Main));
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

export const fetchOfferAction = createAsyncThunk<
  void,
  number | string | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOfferIsLoading(true));
    dispatch(setOfferIsNotFound(false));

    const id = _arg;

    try {
      const {data} = await api.get<Offer>(`${ApiRoute.Offers}/${id}`);

      if (data) {
        dispatch(loadOffer(data));
      }
    } catch {
      dispatch(setOfferIsNotFound(true));
    } finally {
      dispatch(setOfferIsLoading(false));
    }
  },
);

export const fetchReviewsAction = createAsyncThunk<
  void,
  number | string | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (_arg, { dispatch, extra: api }) => {
    const id = _arg;
    const {data} = await api.get<Reviews>(`${ApiRoute.Comments}/${id}`);

    dispatch(addReviews(data));
  });

export const fetchNearPlacesAction = createAsyncThunk<
  void,
  number | string | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchNearPlacesAction', async (_arg, { dispatch, extra: api }) => {
      const id = _arg;

      dispatch(setNearPlacesIsLoading(true));
      dispatch(setNearPlacesIsNotFound(false));

      try {
        const { data } = await api.get<Offers>(
          `${ApiRoute.Offers}/${id}/nearby`
        );

        if (data) {
          dispatch(loadNearPlaces(data));
        }
      } catch {
        dispatch(setNearPlacesIsNotFound(true));
      } finally {
        dispatch(setNearPlacesIsLoading(false));
      }
    });

export const submitCommentAction = createAsyncThunk<
    void,
    CommentData,
    {
      dispatch: AppDispatch;
      state: State;
      extra: AxiosInstance;
    }
  >(
    'submitComment',
    async ({id, comment, rating}, { dispatch, extra: api }) => {
      await api.post<CommentData>(`${ApiRoute.Comments}/${id}`, {
        comment: comment,
        rating: rating,
      });

      dispatch(fetchReviewsAction(id));
    }
  );
