import CardMainList from '../../components/cardMainList/card-main-list';
import { useAppSelector } from '../../components/hooks/reduxIndex';


import Spinner from '../../components/spinner/spinner';
import { getFavorites, getFavoritesIsLoading, getFavoritesIsNotFound } from '../../components/store/fauvorite-process/selectors';
import FavoritesEmptyPage from './favourites-empty';

function FavoritesPage(): JSX.Element {
  const favoriteCards = useAppSelector(getFavorites);
  const favoritesIsLoading = useAppSelector(getFavoritesIsLoading);
  const favoritesIsNotFound = useAppSelector(getFavoritesIsNotFound);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoritesIsLoading && <Spinner />}
          {(favoritesIsNotFound || !favoriteCards.length) ? (
            <FavoritesEmptyPage />
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                <CardMainList elementType={'favorite'} offers = {favoriteCards}/>
              </ul>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
