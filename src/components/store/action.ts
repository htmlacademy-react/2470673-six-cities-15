import {createAction} from '@reduxjs/toolkit';
import { CityMap } from '../types/types';
import { SortType,AuthorizationStatuss,AppRoutes,NameSpace } from '../const/const';
import { Offers,Offer } from '../types/types';
import { UserConnect } from '../types/user';
import { Reviews } from '../types/types';
export const setCityActive = createAction('main/CityActive', (value: string)=>({payload: value}));

export const getOffers = createAction('main/Offers');

export const setChangeMap = createAction('map/ChangeMap', (value: CityMap)=>({payload: value}));

export const getSortType = createAction('main/SortType', (value: SortType)=>({payload: value}));

export const setSorting = createAction('offers/setSorting');

export const loadOffers = createAction<Offers>('data/loadOffers');

export const setOffersIsLoading = createAction<boolean>('setOffersIsLoading');

export const requireAuthorization = createAction<AuthorizationStatuss>('user/requireAuthorization');

export const setError = createAction<string | null>('setError');
export const redirectToRoute = createAction<AppRoutes>('main/redirectToRoute');

export const setUser = createAction<UserConnect | null>(`${NameSpace.User}/setUser`);
export const loadOffer = createAction<Offer | null>('data/loadOffer');

export const setOfferIsNotFound = createAction<boolean>('setOfferIsNotFound');
export const setOfferIsLoading = createAction<boolean>('setOfferIsLoading');
export const addReviews = createAction<Reviews>('data/addReviews');

export const loadNearPlaces = createAction<Offers>('data/loadNearPlaces');

export const setNearPlacesIsNotFound = createAction<boolean>('setNearPlacesNotFound');

export const setNearPlacesIsLoading = createAction<boolean>('setloadNearIsLoading');
