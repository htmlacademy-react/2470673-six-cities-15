import { Routes,Route } from 'react-router-dom';
import MainPage from '../../pages/main-screen/main';
import { AppRoutes } from '../const/const';
import LoginPage from '../../pages/login-screen/login';
import OfferPage from '../../pages/offer-screen/offer';
import NotFoundPage from '../../pages/notfound/notfound';
import Layout from '../layout/layout';
import PrivateRoute from '../privateRoute';
import FavoritesPage from '../../pages/favourites-screen/fauvorites';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { useAppSelector} from '../hooks/reduxIndex';
import { AuthorizationStatuss } from '../const/const';
import Spinner from '../spinner/spinner';
import HistoryRouter from '../../hist-route/history-route';
import browserHistory from '../../browser-hist';
import { getAuthorizationStatus } from '../authorizationStatus';
import { getOffersIsLoading } from '../store/offers-process/selectors';

function App():JSX.Element{
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(getOffersIsLoading);

  if (authorizationStatus === AuthorizationStatuss.Unknown || isOffersDataLoading) {
    return (
      <Spinner />
    );
  }

  return(
    <HistoryRouter history={browserHistory}>
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route path={AppRoutes.Main} element={<Layout></Layout>}>


          <Route
            index
            element={<MainPage />}
          />
          <Route
            path={AppRoutes.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <FavoritesPage/>
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
              <OfferPage></OfferPage>
            }
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />

        </Route>
      </Routes>
    </HistoryRouter>
  );
}
export default App;

