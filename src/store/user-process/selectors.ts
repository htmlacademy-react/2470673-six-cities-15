import { NameSpace,AuthorizationStatuss } from '../../const';
import { State } from '../../types/state';
import {UserConnect} from '../../types/user';

export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatuss =>
  state[NameSpace.User].authorizationStatus;

export const getAuthCheckedStatus = (state: Pick<State, NameSpace.User>): boolean =>
  state[NameSpace.User].authorizationStatus !== AuthorizationStatuss.Unknown;

export const getUser = (state: Pick<State, NameSpace.User>): UserConnect | null =>
  state[NameSpace.User].userConnect;
