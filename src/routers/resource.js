import React from 'react';
import { route, withView, mount } from 'navi';
import { View } from 'react-navi';

import Login from 'containers/Login';
import withRoles from './withRoles';

import AdminHomepage from 'role/admin/containers/Homepage';
import GuiderHomepage from 'role/guider/containers/Homepage';
import UserHomepage from 'role/user/containers/Homepage';

export const routes = {
  '/login': ('/', route({ title: 'Login', view: <Login /> })),
  '/admin': withRoles(
    'admin',
    '/admin',
    withView(
      <View />,
      mount({
        '/homepage': route({ title: 'Admin Homepage', view: <AdminHomepage /> }),
      }),
    ),
  ),
  '/guider': withRoles(
    'guider',
    '/guider',
    withView(
      <View />,
      mount({
        '/homepage': route({ title: 'Guider Homepage', view: <GuiderHomepage /> }),
      }),
    ),
  ),
  '/user': withView(
    <View />,
    mount({
      '/homepage': route({ title: 'User Homepage', view: <UserHomepage /> }),
    }),
  ),
};
