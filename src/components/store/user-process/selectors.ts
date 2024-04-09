import { State } from '../../types/types';
import { NameSpace,AuthorizationStatuss } from '../../const/const';
import {UserConnect} from '../../types/user';

export const getAuthorizationStatus = (state: State): AuthorizationStatuss =>
  state[NameSpace.User].authorizationStatus;

export const getAuthCheckedStatus = (state: State): boolean =>
  state[NameSpace.User].authorizationStatus !== AuthorizationStatuss.Unknown;

export const getUser = (state: State): UserConnect | null =>
  state[NameSpace.User].user;
