import {Link} from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxIndex';
import { setCityActive } from '../../store/offers-process/offers-process';
import { AppRoutes } from '../../components/const/const';

function NotFoundPage(): JSX.Element {
  const cityButton = 'Paris';
  const dispatch = useAppDispatch();

  function onCityButton (city:string) {
    dispatch(setCityActive(city));
  }

  return (
    <div className="page page--gray page--login">

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">
              404. Page not found
            </h1>
            <Link to="/">Go back to the main page.</Link>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                onClick={() =>
                  onCityButton(cityButton)}
                to={AppRoutes.Main}
              >
                <span>
                  {cityButton}
                </span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;

