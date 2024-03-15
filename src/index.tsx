import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Setting } from './components/const/const';
import { offers } from './moks/offers';
import { reviews } from './moks/reviews';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <h1>Hello, World!</h1>
    <App placesCount={Setting.PlacesCount} offers={offers} reviews={reviews}></App>

  </React.StrictMode>
);
