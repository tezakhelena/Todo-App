// App.tsx
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ZadaciPageContainer from '../Zadaci/Container/ZadaciPageContainer';
import Pocetna from './Pocetna';
import Notifikacije from '../Notifikacije/pages/Notifikacije';

const RoutesComponent = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Pocetna} />
          <Route path='/zadaciPage' Component={ZadaciPageContainer} />
          <Route path='/notifikacije' Component={Notifikacije} />
        </Routes>
      </Router>
    </>
  );
};

export default RoutesComponent;
