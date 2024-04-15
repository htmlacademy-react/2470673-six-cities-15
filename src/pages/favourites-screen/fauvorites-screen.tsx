import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import FavoritesEmpty from '../../components/favourites-empty/favourites-empty';
import Favorites from '../../components/favourites/favourites';
import { store } from '../../store';
import { fetchFavoritesAction } from '../../store/api-actions';
import { getFavoritesLength } from '../../store/fauvorite-process/selectors';
import { AppRoutes, AuthorizationStatuss } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';


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


      {!isFavoritesEmpty && <Favorites />}
      {isFavoritesEmpty && <FavoritesEmpty />}

      <footer className="footer container">
        <Link className="footer__logo" to="/">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div>

  );
}

export default FavoritesPage;
