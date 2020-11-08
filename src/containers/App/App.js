import React, { Suspense, useState, useEffect } from 'react';
import { Router, View } from 'react-navi';

import { authService } from 'utils/auth.service';
import PageTitle from 'components/PageTitle';
import routes from '../../routers';

import './index.css';

const App = () => {
  authService.init();

  const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser());

  useEffect(() => {
    authService.subscribe(setCurrentUser);
  }, []);

  return (
    <Router routes={routes} context={{ authService, currentUser }}>
      <PageTitle />
      <Suspense fallback={null}>
        <View />
      </Suspense>
    </Router>
  );
};

export default App;
