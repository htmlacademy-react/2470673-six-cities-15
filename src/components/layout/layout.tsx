import {NavLink, Link, Outlet, useLocation} from 'react-router-dom';
import style from '../layout/layout.module.css'
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AppRoutes, AuthorizationStatuss } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { getFavoritesLength } from '../../store/fauvorite-process/selectors';
import { getUser } from '../../store/user-process/selectors';
import { assignauthorizationStatusByDefault } from '../../store/user-process/user-process';
import React from 'react';

function Layout(): JSX.Element {
  const authorizationStatusActive = useAppSelector(getAuthorizationStatus);
  const userConnect = useAppSelector(getUser);
  const favoriteCardsLength = useAppSelector(getFavoritesLength);
  const isLogged = authorizationStatusActive === AuthorizationStatuss.Auth;
  const dispatch = useAppDispatch();
  const pathname = useLocation()
  
  const handleClick = () => {
    dispatch(logoutAction());
    dispatch(assignauthorizationStatusByDefault());
  };
  return(
    <>
      <header className='header'>
        <div className='container'>
          <div className="header__wrapper">
            <div className='header__left'>
              <Link className="header__logo-link header__logo-link--active" to="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
      {pathname.pathname==AppRoutes.Login ? (null) :
      <nav className="header__nav">
      {isLogged ? (
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <NavLink
              className="header__nav-link header__nav-link--profile"
              to={AppRoutes.Favorites}
              data-testid="header-link"
            >
              <div className="header__avatar-wrapper user__avatar-wrapper">
                <img src={userConnect?.avatarUrl} />
              </div>
              <span className="header__user-name user__name">
                {userConnect?.email}
              </span>
              <span className="header__favorite-count">{favoriteCardsLength.toString()}</span>
            </NavLink>
          </li>
          <li className="header__nav-item">

            <button className={`header__nav-link ${style.resetStyleButton}`}
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
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>}
          </div>
        </div>
      </header>
      <Outlet></Outlet>
    </>

  );
}

export default Layout;
