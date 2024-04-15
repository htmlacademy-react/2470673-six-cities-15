import {Link} from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { setCityActive } from '../../store/offers-process/offers-process';
import { AppRoutes } from '../../const';

function NotFoundPage(): JSX.Element {
  const cityButton = 'Paris';
  const dispatch = useAppDispatch();

  function onCityButton (city:string) {
    dispatch(setCityActive(city));
  }

  return (
    <div className="page page--gray page--login">
      
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
