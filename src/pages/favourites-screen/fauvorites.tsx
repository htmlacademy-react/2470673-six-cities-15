import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import FavoritesEmpty from '../../components/favourites-empty/favourites-empty';
import Favorites from '../../components/favourites/favourites';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxIndex';
import { store } from '../../store';
import { fetchFavoritesAction } from '../../store/api-actions';
import { getFavoritesLength } from '../../store/fauvorite-process/selectors';
import { AppRoutes, AuthorizationStatuss } from '../../components/const/const';


function FavoritesPage(): JSX.Element {
  const isFavoritesEmpty = !useAppSelector(getFavoritesLength);
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  useEffect(() => {
    store.dispatch(fetchFavoritesAction());
  }, [dispatch]);

  useEffect(() => {
    if (authStatus === AuthorizationStatuss.NoAuth) {
      navigate(AppRoutes.Login);
    }
  }, [authStatus, navigate]);

  return (
    <div className="page page--favorites-empty">

      <header className="header" data-testid="header-container">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
            </div>
          </div>
        </div>
      </header>

      {!isFavoritesEmpty && <Favorites />}
      {isFavoritesEmpty && <FavoritesEmpty />}

      <footer className="footer container">
      </footer>
    </div>
  );
}

export default FavoritesPage;
