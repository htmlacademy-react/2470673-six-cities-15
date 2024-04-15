import {useState} from 'react';
import Map from '../../components/map/map.tsx';
import CardMainList from '../../components/card-main-list/card-main-list.tsx';
import Locations from '../../components/locations/locations.tsx';
import Sort from '../../components/sort/sort.tsx';
import { getCityActive, getOffersByCityAndSort, getOffersIsLoading, getOffersIsNotFound } from '../../store/offers-process/selectors.ts';
import Spinner from '../../components/spinner/spinner.tsx';
import { Navigate } from 'react-router-dom';
import MainEmpty from '../../components/main-empty/main-empty.tsx';
import { AppRoutes } from '../../const.tsx';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/index.ts';


function MainPage(): JSX.Element {
  const [cardHoverId, setCardHoverId] = useState<string | null>(null);
  const cityActive = useAppSelector(getCityActive);
  const offers = useAppSelector(getOffersByCityAndSort);
  const cityMapActive = offers[0]?.city;
  const placesCount = offers.length;
  const offersIsLoading = useAppSelector(getOffersIsLoading);
  const offersIsNotFound = useAppSelector(getOffersIsNotFound);
  const isEmpty = offersIsNotFound || !placesCount;

  return (
    <div className={classNames('page', 'page--gray', 'page--main', {'page__main--index-empty' : isEmpty})} data-testid="main-page">

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Locations />
        {offersIsLoading && <Spinner />}
        {offersIsNotFound && <Navigate to={AppRoutes.NotFound} />}
        {!offersIsLoading && (
          <div className="cities" data-testid="cities-container">
            {placesCount ? (
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{placesCount} {placesCount === 1 ? 'place' : 'places'} to stay in {cityActive}</b>
                  <Sort />
                  <CardMainList elementType='cities' offers = {offers} setActivePlaceCard = {setCardHoverId}/>
                </section>
                <div className="cities__right-section" data-testid="map-container">
                  {cityMapActive && (<Map mapType='cities' offers={offers} cardHoverId={cardHoverId} city={cityMapActive}/>)}
                </div>
              </div>
            ) : (
              <MainEmpty cityActive = {cityActive} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default MainPage;
