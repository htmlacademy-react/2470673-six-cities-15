import { State } from '../../types/types';
import { NameSpace } from '../../const/const';
import { Offers } from '../../types/types';

export const getOffersNearby = (state: State): Offers =>
  state[NameSpace.OffersNearby].offersNearby;

export const getOffersNearbyIsLoading = (state: State): boolean =>
  state[NameSpace.OffersNearby].offersNearbyIsLoading;

export const getOffersNearbyIsNotFound = (state: State): boolean =>
  state[NameSpace.OffersNearby].offersNearbyIsNotFound;
