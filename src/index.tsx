import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Setting, citiesList, } from './components/const/const';
import { offers } from './moks/offers';
import { reviews } from './moks/reviews';
import { nearbyOffers } from './moks/nearbyOff';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placesCount={Setting.PlacesCount} offers={offers} reviews={reviews} nearbyOffers={nearbyOffers} citiesList={citiesList}></App>
  </React.StrictMode>
);
