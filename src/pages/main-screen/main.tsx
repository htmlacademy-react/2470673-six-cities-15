import {useState} from 'react';
import { useAppSelector } from '../../components/hooks/reduxIndex.ts';
import Map from '../../components/map/map';
import CardMainList from '../../components/cardMainList/card-main-list';
import Locations from '../../components/locations/locations.tsx';
import Sort from '../../components/sort/sort.tsx';

type MainPageProps = {
  citiesList: string[];
}

function MainPage({citiesList}: MainPageProps): JSX.Element {
  const [cardHoverId, setCardHoverId] = useState<string | null>(null);
  const cityActive = useAppSelector((state) => state.cityActive);
  const offers = useAppSelector((state) => state.offers);
  const cityMapActive = useAppSelector((state) => state.city);

  const placesCount = offers.length;

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Locations cities = {citiesList}/>
        <div className="cities">
          {placesCount > 0 ? (
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
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">
                  We could not find any property available at the moment in
                    {cityActive}
                  </p>
                </div>
              </section>
              <div className="cities__right-section" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
