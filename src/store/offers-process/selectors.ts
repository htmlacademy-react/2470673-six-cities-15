import {createSelector} from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { SortType } from '../../const';
import { offersSorting } from '../../utils/offer-sorting';
import { State } from '../../types/state';
import { Offers } from '../../types/offer';
import { getOffersByCity } from '../../utils/get-off-by-city';

export const getOffers = (state: Pick<State, NameSpace.Offers>): Offers =>
  state[NameSpace.Offers].offers;

export const getOffersIsLoading = (state: Pick<State, NameSpace.Offers>): boolean =>
  state[NameSpace.Offers].offersIsLoading;

export const getOffersIsNotFound = (state: Pick<State, NameSpace.Offers>): boolean =>
  state[NameSpace.Offers].offersIsNotFound;

export const getCityActive = (state: Pick<State, NameSpace.Offers>): string =>
  state[NameSpace.Offers].cityActive;

export const getSortType = (state: Pick<State, NameSpace.Offers>): SortType =>
  state[NameSpace.Offers].sortType;

export const getOffersByCityAndSort = createSelector(
  [getCityActive, getSortType, getOffers],
  (cityActive, sortType, offers) => offersSorting(sortType, getOffersByCity(offers, cityActive)));
