import { NameSpace, RequestStatus } from '../../const';
import { Reviews } from '../../types/rewiew';
import {State} from '../../types/state';

export const getReviews = (state: Pick<State, NameSpace.Reviews>): Reviews =>
  state[NameSpace.Reviews].reviews;

export const getReviewsIsLoading = (state: Pick<State, NameSpace.Reviews>): boolean =>
  state[NameSpace.Reviews].reviewsIsLoading;

export const getReviewsIsNotFound = (state: Pick<State, NameSpace.Reviews>): boolean =>
  state[NameSpace.Reviews].reviewsIsNotFound;

export const selectReviewRequestStatus = (state: Pick<State, NameSpace.Reviews>): RequestStatus => state[NameSpace.Reviews].reviewRequestStatus;
