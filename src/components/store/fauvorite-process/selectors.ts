import { State } from '../../types/types';
import { NameSpace } from '../../const/const';
import { Offers } from '../../types/types';

export const getFavorites = (state: State): Offers =>
  state[NameSpace.Favorites].favorites;
export const getFavoritesIsLoading = (state: State): boolean =>
  state[NameSpace.Favorites].favoritesIsLoading;
export const getFavoritesIsNotFound = (state: State): boolean =>
  state[NameSpace.Favorites].favoritesIsNotFound;