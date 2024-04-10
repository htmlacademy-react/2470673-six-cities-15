import { useAppSelector } from '../../components/hooks/reduxIndex';
import { useEffect } from 'react';
import FavoritesCardList from '../../components/favourites-card-list/favourite-card-list';
import Spinner from '../../components/spinner/spinner';
import { getFavorites, getFavoritesIsLoading, getFavoritesIsNotFound } from '../../components/store/fauvorite-process/selectors';
import FavoritesEmptyPage from './favourites-empty';
import { store } from '../../components/store';
import { fetchFavoritesAction } from '../../components/store/api-actions';
import { groupByCityOffers } from '../../components/utils/groupcitybyoffers';
function FavoritesPage(): JSX.Element {
  const favoriteCards = useAppSelector(getFavorites);
  const favoritesIsLoading = useAppSelector(getFavoritesIsLoading);
  const favoritesIsNotFound = useAppSelector(getFavoritesIsNotFound);

  const groupedFavorites =
  favoriteCards.length > 0 ? groupByCityOffers(favoriteCards) : [];

  useEffect(() => {
    store.dispatch(fetchFavoritesAction());
  }, []);

  return (
    <div className="page">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoritesIsLoading && <Spinner />}
          {(favoritesIsNotFound || !favoriteCards.length) ? (
            <FavoritesEmptyPage />
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {groupedFavorites.map(({city, list}) => (
                  <FavoritesCardList city={city} list={list} key={city} elementType='favorite' />
                ))}
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
