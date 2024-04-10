import {NavLink, Link, useLocation, useNavigate} from 'react-router-dom';
import { useAppSelector,useAppDispatch } from '../hooks/reduxIndex';
import { AuthorizationStatuss,AppRoutes, PRIVATE_ROUTES } from '../const/const';
import { logoutAction } from '../store/api-actions';
import { getAuthorizationStatus,getUser } from '../store/user-process/selectors';
import { getFavorites } from '../store/fauvorite-process/selectors';

function Nav(): JSX.Element {
  const authorizationStatusActive = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const favoriteCardsLength = useAppSelector(getFavorites).length;
  const isLogged = authorizationStatusActive === AuthorizationStatuss.Auth;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const handleClick = () => {
    dispatch(logoutAction());

    if (PRIVATE_ROUTES.includes(pathname)) {
      navigate(AppRoutes.Main);
    }
  };

  return (
    <nav className="header__nav">
      {isLogged ? (
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <NavLink
              className="header__nav-link header__nav-link--profile"
              to={AppRoutes.Favorites}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"
                style={{ backgroundImage: user?.avatarUrl }}
              >
              </div>
              <span className="header__user-name user__name">
                {user?.email}
              </span>
              <span className="header__favorite-count">{favoriteCardsLength}</span>
            </NavLink>
          </li>
          <li className={'header__nav-link '}>
            <button className="header__nav-link"
              onClick={handleClick}
            >
              <span className="header__signout">Sign out</span>
            </button>
          </li>
        </ul>
      ) : (
        <ul className="header__nav-list">
          <li
            className="header__nav-item user"
          >
            <Link
              className="header__nav-link header__nav-link--profile"
              to={AppRoutes.Login}
              state={{ from: pathname }}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Nav;
