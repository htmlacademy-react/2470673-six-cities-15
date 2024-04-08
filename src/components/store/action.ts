import {createAction} from '@reduxjs/toolkit';
import { CityMap } from '../types/types';
import { SortType,AuthorizationStatuss } from '../const/const';
import { Offers } from '../types/types';

export const setCityActive = createAction('main/CityActive', (value: string)=>({payload: value}));

export const getOffers = createAction('main/Offers');

export const setChangeMap = createAction('map/ChangeMap', (value: CityMap)=>({payload: value}));

export const getSortType = createAction('main/SortType', (value: SortType)=>({payload: value}));

export const setSorting = createAction('offers/setSorting');

export const loadOffers = createAction<Offers>('data/loadOffers');

export const setOffersIsLoading = createAction<boolean>('setOffersIsLoading');

export const requireAuthorization = createAction<AuthorizationStatuss>('user/requireAuthorization');

export const setError = createAction<string | null>('setError');
