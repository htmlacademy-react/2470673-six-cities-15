import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Main from '../../pages/main-screen/main';
import { AppRoutes } from '../const/const';
import React from 'react';
import LoginScreen from '../../pages/login-screen/login';
import Offer from '../../pages/offer-screen/offer';
import NotFound from '../../pages/notfound/notfound';

type AppPageProps={
    placesCount:number;
}


function App({placesCount}:AppPageProps):JSX.Element{
  return(
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoutes.Main} element={<Main placesCount={placesCount}></Main>}
        >
        </Route>
        <Route
          path={AppRoutes.Login} element={<LoginScreen></LoginScreen>}
        >
        </Route>
        <Route
          path={AppRoutes.Offer} element={<Offer></Offer>}
        >
        </Route>
        <Route
          path="*" element={<NotFound></NotFound>}
        >
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
