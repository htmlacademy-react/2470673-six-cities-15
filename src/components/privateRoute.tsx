import { Navigate } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from './const/const';

type PrivateRouteProps={
    authorizationStatus:AuthorizationStatus;
    isReverse?:boolean;
    children:JSX.Element;
}
export default function PrivateRoute({authorizationStatus,isReverse,children}:PrivateRouteProps){
  return(
    authorizationStatus === (isReverse ? AuthorizationStatus.NoAuth : AuthorizationStatus.Auth) ?
      children :
      <Navigate to={isReverse ? AppRoutes.Main : AppRoutes.Login}></Navigate>
  );
}
