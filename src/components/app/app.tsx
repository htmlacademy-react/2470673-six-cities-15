import { Routes,Route } from 'react-router-dom';
import MainPage from '../../pages/main-screen/main-screen';
import { AppRoutes } from '../../const';
import LoginPage from '../../pages/login-screen/login-screen';
import OfferPage from '../../pages/offer-screen/offer-screen';
import NotFoundPage from '../../pages/not-found-screen/not-found-screen';
import Layout from '../layout/layout';
import PrivateRoute from '../private-route/private-route';
import FavoritesPage from '../../pages/favourites-screen/fauvorites-screen';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { useAppSelector} from '../../hooks';
import { AuthorizationStatuss } from '../../const';
import Spinner from '../spinner/spinner';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getOffersIsLoading } from '../../store/offers-process/selectors';

function App():JSX.Element{
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(getOffersIsLoading);

  if (authorizationStatus === AuthorizationStatuss.Unknown || isOffersDataLoading) {
    return (
      <Spinner />
    );
  }

  return(
    <>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoutes.Main} element={<Layout></Layout>}>
          <Route index element={<MainPage />}/>
          <Route path={AppRoutes.Favorites} element={<PrivateRoute authorizationStatus={authorizationStatus}><FavoritesPage /></PrivateRoute>}/>
          <Route path={AppRoutes.Login} element={<LoginPage />} />
          <Route path={AppRoutes.Offer} element={<OfferPage></OfferPage>} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;

