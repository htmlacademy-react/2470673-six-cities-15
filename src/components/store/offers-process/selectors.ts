import { State } from '../../types/types';
import { NameSpace } from '../../const/const';
import { Offers } from '../../types/types';
import { SortType } from '../../const/const';
import { City } from '../../types/types';

export const getOffers = (state: State): Offers =>
  state[NameSpace.Offers].offers;

export const getOffersIsLoading = (state: State): boolean =>
  state[NameSpace.Offers].offersIsLoading;

export const getOffersIsNotFound = (state: State): boolean =>
  state[NameSpace.Offers].offersIsNotFound;

export const getCityActive = (state: State): string =>
  state[NameSpace.Offers].cityActive;

export const getCity = (state: State): City =>
  state[NameSpace.Offers].city;

export const getSortType = (state: State): SortType =>
  state[NameSpace.Offers].sortType;
