import { BrowserRouter, Routes,Route } from 'react-router-dom';
import MainPage from '../../pages/main-screen/main';
import { AppRoutes } from '../const/const';
import LoginPage from '../../pages/login-screen/login';
import OfferPage from '../../pages/offer-screen/offer';
import NotFoundPage from '../../pages/notfound/notfound';
import Layout from '../layout/layout';
import PrivateRoute from '../privateRoute';
import { getAuthorizationStatus } from '../authorizationStatus';
import FavoritesPage from '../../pages/favourites-screen/fauvorites';
import { Offers, Reviews } from '../types/types';
import ScrollToTop from '../scroll-to-top/scroll-to-top';

type AppPageProps={
    placesCount:number;
    offers:Offers;
    reviews:Reviews;
    nearbyOffers:Offers;
    citiesList:string[];
}


function App({placesCount,offers,nearbyOffers,citiesList,reviews}:AppPageProps):JSX.Element{
  const AuthorizationStatus = getAuthorizationStatus();
  return(
    <BrowserRouter>
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route path={AppRoutes.Main} element={<Layout></Layout>}>


          <Route
            index
            element={<MainPage placesCount={placesCount} offers = {offers} citiesList={citiesList} />}
          />
          <Route
            path={AppRoutes.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus}
              >
                <FavoritesPage offers = {offers}/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoutes.Login}
            element={<LoginPage />}
          />
          <Route
            path={AppRoutes.Offer}
            element={
              <OfferPage offers = {offers} reviews = {reviews} nearbyOffers ={nearbyOffers}
                onReview={(rating, comment) => {
                  console.log(rating, comment);
                }}
              />
            }
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />

        </Route>
      </Routes>
    </BrowserRouter>   
  );
}
export default App;

