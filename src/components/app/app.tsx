import React from 'react';
import Main from '../../pages/main-screen/main';

type AppPageProps={
    placesCount:number;
}


function App({placesCount}:AppPageProps):JSX.Element{
  return(
    <Main placesCount={placesCount}></Main>
  );
}
export default App;
