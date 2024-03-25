import { useState } from 'react';
import { Offers } from '../../components/types/types';
import CardMainList from '../../components/cardMainList/card-main-list';
import Locations from '../../components/locations/locations';
import { citiesList } from '../../components/const/const';
import Mappage from '../../components/map/map.tsx';
import { city } from '../../moks/cityMap.ts';
type MainPageProps = {
  placesCount: number;
  offers: Offers;
}

function MainPage({placesCount, offers}: MainPageProps): JSX.Element {
  const [cardHoverId, setCardHoverId] = useState<string | null>(null);

  return (
    <div className="page page--gray page--main">

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Locations cities={citiesList}></Locations>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesCount} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              <CardMainList elementType = {'cities'} setActivePlaceCard={setCardHoverId} offers={offers}/>
            </section>
            <div className="cities__right-section">
              <Mappage mapType={'offer'} offers={offers} cardHoverId={cardHoverId} city={city}/>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;

