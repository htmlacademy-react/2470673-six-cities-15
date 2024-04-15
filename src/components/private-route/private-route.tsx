import {Navigate} from 'react-router-dom';
import { AppRoutes,AuthorizationStatuss } from '../../const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatuss;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatuss.Auth
      ? children
      : <Navigate to={AppRoutes.Login} />
  );
}

export default PrivateRoute;
