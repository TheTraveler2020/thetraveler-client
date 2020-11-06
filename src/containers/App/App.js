import React, { Suspense } from 'react';
import { Router, View } from 'react-navi';
import routes from 'routers';

import './index.css';

const App = () => {
  return (
    <Router routes={routes}>
      <Suspense fallback={null}>
        <View />
      </Suspense>
    </Router>
  );
};

export default App;
