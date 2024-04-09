import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../services/api';
export const api = createAPI();
import { redirect } from './middleware/redirect';
import {rootReducer} from './root-reducer';
export const store = configureStore({
  reducer:rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
