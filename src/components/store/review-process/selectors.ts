import { State } from '../../types/types';
import { NameSpace } from '../../const/const';
import { Reviews } from '../../types/types';

export const getReviews = (state: State): Reviews =>
  state[NameSpace.Reviews].reviews;

export const getReviewsIsLoading = (state: State): boolean =>
  state[NameSpace.Reviews].reviewsIsLoading;

export const getReviewsIsNotFound = (state: State): boolean =>
  state[NameSpace.Reviews].reviewsIsNotFound;