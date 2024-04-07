import { Navigate } from 'react-router-dom';
import { AppRoutes, AuthorizationStatuss } from './const/const';

type PrivateRouteProps={
    authorizationStatus:AuthorizationStatuss;
    isReverse?:boolean;
    children:JSX.Element;
}
export default function PrivateRoute({authorizationStatus,isReverse,children}:PrivateRouteProps){
  return(
    authorizationStatus === (isReverse ? AuthorizationStatuss.NoAuth : AuthorizationStatuss.Auth) ?
      children :
      <Navigate to={isReverse ? AppRoutes.Main : AppRoutes.Login}></Navigate>
  );
}
