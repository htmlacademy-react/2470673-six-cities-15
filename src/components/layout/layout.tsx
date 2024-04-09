import {NavLink, Link, useNavigate, useLocation, Outlet} from 'react-router-dom';
import { useAppSelector,useAppDispatch } from '../hooks/reduxIndex';
import { AuthorizationStatuss,AppRoutes,PRIVATE_ROUTES } from '../const/const';
import styles from './layout.module.css'
import { logoutAction } from '../store/api-actions';

function Layout():JSX.Element{
  const authorizationStatusActive = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);
  const shouldRenderUser = authorizationStatusActive === AuthorizationStatuss.Auth;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const handleClick = () => {
    dispatch(logoutAction());

    if (PRIVATE_ROUTES.includes(pathname)) {
      navigate(AppRoutes.Main);
    }
  };
  return(
    <><Link className="header__logo-link header__logo-link--active" to="/">
      <img
        className="header__logo"
        src="img/logo.svg"
        alt="6 cities logo"
        width={81}
        height={41} />
    </Link>
    <nav className="header__nav">

        {shouldRenderUser ? (
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
                <span className="header__favorite-count">3</span>
              </NavLink>
            </li>
            <li className={`header__nav-link ${styles.resetStyleButton}`}>
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
      <div>
      <Outlet></Outlet>
    </div>
      </>

  );
}

export default Layout;
