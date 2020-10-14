import React from 'react';
import { route } from 'navi';

import Login from 'containers/Login';

export const routes = {
  '/login': ('/', route({ title: 'Login', view: <Login /> })),
};
