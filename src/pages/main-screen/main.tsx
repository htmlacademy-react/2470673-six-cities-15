import {useState} from 'react';
import { useAppSelector } from '../../components/hooks/reduxIndex.ts';
import Map from '../../components/map/map';
import CardMainList from '../../components/cardMainList/card-main-list';
import Locations from '../../components/locations/locations.tsx';
import Sort from '../../components/sort/sort.tsx';
import { getCity, getCityActive, getOffers, getOffersIsLoading, getOffersIsNotFound } from '../../components/store/offers-process/selectors.ts';
import Spinner from '../../components/spinner/spinner.tsx';
import { Navigate } from 'react-router-dom';
import MainEmpty from './main-empty.tsx';
import { AppRoutes } from '../../components/const/const.tsx';


function MainPage(): JSX.Element {
  const [cardHoverId, setCardHoverId] = useState<string | null>(null);
  const cityActive = useAppSelector(getCityActive);
  const offers = useAppSelector(getOffers);
  const cityMapActive = useAppSelector(getCity);
  const placesCount = offers.length;

  const offersIsLoading = useAppSelector(getOffersIsLoading);
  const offersIsNotFound = useAppSelector(getOffersIsNotFound);


  return (
    <div className="page page--gray page--main">
  <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Locations />
        {offersIsLoading && <Spinner />}
        {offersIsNotFound && <Navigate to={AppRoutes.NotFound} />}
        {!offersIsLoading && (
          <div className="cities">
            {placesCount ? (
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{placesCount} places to stay in {cityActive}</b>
                  <Sort />
                  <div className="cities__places-list places__list tabs__content">
                    <CardMainList elementType={'cities'} offers = {offers} setActivePlaceCard = {setCardHoverId}/>
                  </div>
                </section>
                <div className="cities__right-section">
                  <Map mapType='cities' offers={offers} cardHoverId={cardHoverId} city={cityMapActive}/>
                </div>
              </div>
            ) : (
              <MainEmpty />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default MainPage;
