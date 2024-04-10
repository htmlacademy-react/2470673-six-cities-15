import { Outlet } from 'react-router-dom';
import Nav from '../nav/nav';
import Logo from '../../logo/logo';

function Layout():JSX.Element{

  return(
    <><Logo></Logo><Nav></Nav><Outlet></Outlet></>

  );
}

export default Layout;
