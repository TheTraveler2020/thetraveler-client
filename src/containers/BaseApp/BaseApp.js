import React, { Suspense, useState, useEffect } from 'react';
import { Router, View } from 'react-navi';

import PageTitle from 'components/PageTitle';
import { authService } from 'utils/auth.service';
import { Provider as ModalConfirmUnSaveDataProvider } from 'contexts/modalConfirmUnSaveData';

const BaseApp = ({ routes }) => {
  authService.init();

  const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser());

  useEffect(() => {
    authService.subscribe(setCurrentUser);
  }, []);

  return (
    <Router routes={routes} context={{ authService, currentUser }}>
      <ModalConfirmUnSaveDataProvider>
        <PageTitle />
        <Suspense fallback={null}>
          <View />
        </Suspense>
      </ModalConfirmUnSaveDataProvider>
    </Router>
  );
};

export default BaseApp;
