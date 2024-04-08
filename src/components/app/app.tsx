import { BrowserRouter, Routes,Route } from 'react-router-dom';
import MainPage from '../../pages/main-screen/main';
import { AppRoutes } from '../const/const';
import LoginPage from '../../pages/login-screen/login';
import OfferPage from '../../pages/offer-screen/offer';
import NotFoundPage from '../../pages/notfound/notfound';
import Layout from '../layout/layout';
import PrivateRoute from '../privateRoute';
import FavoritesPage from '../../pages/favourites-screen/fauvorites';
import { Offers, Reviews } from '../types/types';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { useAppSelector} from '../hooks/reduxIndex';
import { AuthorizationStatuss } from '../const/const';
import Spinner from '../spinner/spinner';
type AppPageProps={
  offers: Offers;
  nearbyOffers: Offers;
  reviews: Reviews;
  citiesList: string[];
}


function App({offers,nearbyOffers,citiesList,reviews}:AppPageProps):JSX.Element{
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.offersIsLoading);


  if (authorizationStatus === AuthorizationStatuss.Unknown || isOffersDataLoading) {
    return (
      <Spinner />
    );
  }

  return(
    <BrowserRouter>
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route path={AppRoutes.Main} element={<Layout></Layout>}>


          <Route
            index
            element={<MainPage citiesList={citiesList} />}
          />
          <Route
            path={AppRoutes.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
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

