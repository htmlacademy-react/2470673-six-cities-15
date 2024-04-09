import {useNavigate} from 'react-router';
import { useAppDispatch,useAppSelector } from './reduxIndex';
import { getAuthorizationStatus } from '../authorizationStatus';
import { AppRoutes,FavoritesTriggerUpdate,AuthorizationStatuss } from '../const/const';
import {setFavoritesAction} from '../store/api-actions';

export const useFavorites = (
  offerId: string,
  status: number,
  triggerUpdate: FavoritesTriggerUpdate
) => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  function onChangeFavorites() {
    if (authorizationStatus !== AuthorizationStatuss.Auth) {
      navigate(AppRoutes.Login);
    }

    dispatch(setFavoritesAction({offerId, status, triggerUpdate}));
  }

  return onChangeFavorites;
};