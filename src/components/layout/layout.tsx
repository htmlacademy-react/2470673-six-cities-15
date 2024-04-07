import { Link, Outlet, useLocation } from 'react-router-dom';
import { AppRoutes, AuthorizationStatuss } from '../const/const';
import { getAuthorizationStatus } from '../authorizationStatus';
const getLayoutState = (pathname:AppRoutes) => {
  let rootClassName = '';
  let linkClassName = '';
  let shouldRenderUser = true;
  let shouldRenderFooter = false;
  if(pathname === AppRoutes.Main){
    rootClassName = ' page--gray page--main ';
    linkClassName = ' header__logo-link--active';
  }else if(pathname === AppRoutes.Login){
    rootClassName = ' page--gray page--login ';
    shouldRenderUser = false;
  }else if(pathname === AppRoutes.Favorites){
    shouldRenderFooter = true;
  }

  return{rootClassName,linkClassName,shouldRenderUser,shouldRenderFooter};
};

function Layout():JSX.Element{
  const {pathname} = useLocation();
  const {rootClassName,linkClassName,shouldRenderUser,shouldRenderFooter} = getLayoutState(pathname as AppRoutes);
  const authorizationStatus = getAuthorizationStatus();
  return(
    <div className={`page${rootClassName}`}>


      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoutes.Main} className={`header__logo-link${linkClassName}`}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            {shouldRenderUser ? (
              <nav className="header__nav">

                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      {authorizationStatus === AuthorizationStatuss.Auth ? (
                        <>
                          <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                          <span className="header__favorite-count">0</span>
                        </>
                      ) : <span className="header__login">Sign In</span>}

                    </a>
                  </li>
                  {authorizationStatus === AuthorizationStatuss.Auth ? (
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#">
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>) : null }
                </ul>
              </nav>
            ) : null }

          </div>
        </div>
      </header>
      <Outlet></Outlet>
      {shouldRenderFooter ? (
        <footer className="footer container">
          <Link to={AppRoutes.Main} className={`header__logo-link${linkClassName}`}>
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
          </Link>
        </footer>
      ) : null}
    </div>
  );
}

export default Layout;
