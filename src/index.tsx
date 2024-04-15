import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import {store} from './store';
import {fetchOffersAction, checkAuthAction} from './store/api-actions';
import HistoryRouter from './components/history-router/history-route';
import browserHistory from './browser-hist';
import { getToken } from './services/token';
import { assignauthorizationStatusByDefault } from './store/user-process/user-process';

const token = getToken();

if (token !== '') {
store.dispatch(checkAuthAction());
 
} else {
  store.dispatch(assignauthorizationStatusByDefault());
}
store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer autoClose = {2000}/>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,

);
