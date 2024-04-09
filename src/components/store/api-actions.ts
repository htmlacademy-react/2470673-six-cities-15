import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatch,FavoriteData,State } from '../types/types';
import { Offers,Offer } from '../types/types';
import { Reviews,Review } from '../types/types';
import { CommentData } from '../types/types';

import {saveToken, dropToken} from '../services/token';
import { AuthData } from '../types/types';
import {UserConnect} from '../types/user';
import { ApiRoute,AppRoutes, FavoritesTriggerUpdate } from '../const/const';
import { redirectToRoute } from './action';
import { setFavoriteOffers } from './offers-process/offers-process';
import { setFavoriteOffer } from './offer-process/offer-process';
import { setFavoriteNearby } from './offer-nearby-process/offers-nearby-process';


export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>('fetchOffers',async (_arg, {extra: api}) => {
  const {data} = await api.get<Offers>(ApiRoute.Offers);

  return data;
});

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>('checkAuth', async (_arg, {extra: api}) => await api.get(ApiRoute.Login));

export const loginAction = createAsyncThunk<UserConnect, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>
('login', async ({login: email, password}, {dispatch, extra: api}) => {
  const {data} = await api.post<UserConnect>(ApiRoute.Login, {email, password});
  const {token} = data;
  saveToken(token);
  dispatch(redirectToRoute(AppRoutes.Main));

  return data;
});

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>('logout', async (_arg, {extra: api}) => {
  await api.delete(ApiRoute.Logout);
  dropToken();
});

export const fetchOfferAction = createAsyncThunk<
  Offer,
  number | string | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}
>('fetchOffer', async (_arg, {extra: api}) => {
  const id = _arg;

  const {data} = await api.get<Offer>(`${ApiRoute.Offers}/${id}`);

  return data;
});

export const fetchReviewsAction = createAsyncThunk<
  Reviews,
  number | string | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'fetchReviews', async (_arg, {extra: api}) => {
    const id = _arg;
    const {data} = await api.get<Reviews>(`${ApiRoute.Comments}/${id}`);

    return data;
  });

export const fetchOffersNearbyAction = createAsyncThunk<
  Offers,
  number | string | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
  >('fetchOffersNearby', async (_arg, { extra: api}) => {
    const id = _arg;

    const {data} = await api.get<Offers>(`${ApiRoute.Offers}/${id}/nearby`);

    return data;
  });

export const submitReviewAction = createAsyncThunk<
    Review,
    CommentData,
    {
      dispatch: AppDispatch;
      state: State;
      extra: AxiosInstance;
    }
  >('submitComment', async ({id, comment, rating}, {extra: api}) => {
    const { data } = await api.post<Review>(`${ApiRoute.Comments}/${id}`, {
      comment: comment,
      rating: rating,
    });

    return data;
  }
  );

export const fetchFavoritesAction = createAsyncThunk<
  Offers,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('fetchFavorites', async (_arg, {extra: api}) => {
  const {data} = await api.get<Offers>(ApiRoute.Favorite);

  return data;
});

export const setFavoritesAction = createAsyncThunk<
  Offer,
  FavoriteData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('setFavorites', async (favoriteParams: FavoriteData, {dispatch, extra: api}) => {
  const {data} = await api.post<Offer>(
    `${ApiRoute.Favorite}/${favoriteParams.offerId}/${favoriteParams.status}`
  );

  switch (favoriteParams.triggerUpdate) {
    case FavoritesTriggerUpdate.Offers:
      dispatch(setFavoriteOffers(data));
      break;
    case FavoritesTriggerUpdate.Offer:
      dispatch(setFavoriteOffer(data.isFavorite));
      break;
    case FavoritesTriggerUpdate.Favorites:
      dispatch(fetchFavoritesAction());
      break;
    case FavoritesTriggerUpdate.Nearby:
      dispatch(setFavoriteNearby(data));
      break;
  }

  return data;
}
);
