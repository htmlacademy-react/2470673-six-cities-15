import {useNavigate} from 'react-router';
import { getAuthorizationStatus } from '../store/user-process/selectors';
import { setFavoritesAction } from '../store/api-actions';
import { useAppDispatch, useAppSelector } from './reduxIndex';
import { AppRoutes, AuthorizationStatuss } from '../components/const/const';

export const useFavorites = (
  offerId: string,
  status: number,
) => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  function onChangeFavorites() {
    if (authorizationStatus !== AuthorizationStatuss.Auth) {
      navigate(AppRoutes.Login);
    }

    dispatch(setFavoritesAction({offerId, status}));
  }

  return onChangeFavorites;
};
