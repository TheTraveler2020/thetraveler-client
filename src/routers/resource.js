import React from 'react';
import { route, withView, mount } from 'navi';
import { View } from 'react-navi';

import AdminContainer from 'role/admin/containers/AdminContainer';
import GuiderContainer from 'role/guider/containers/GuiderContainer';
import Homepage from 'containers/Homepage';
import Login from 'containers/Login';
import UserContainer from 'role/user/containers/UserContainer';
import withAuth from './withAuth';
import withNotAuth from './withNotAuth';
import withRoles from './withRoles';

export const routes = {
  '/login': withNotAuth('/', route({ title: 'Login', view: <Login /> })),
  '/admin': withRoles(
    'admin',
    '/admin',
    withView(
      <View />,
      mount({
        '/admin_page': withAuth(route({ title: 'Admin Homepage', view: <AdminContainer /> })),
      }),
    ),
  ),
  '/guider': withRoles(
    'guider',
    '/guider',
    withView(
      <View />,
      mount({
        '/guider_page': withAuth(route({ title: 'Guider Homepage', view: <GuiderContainer /> })),
      }),
    ),
  ),
  '/user': withView(
    <View />,
    mount({
      '/user_page': withAuth(route({ title: 'User Homepage', view: <UserContainer /> })),
    }),
  ),

  '/': withAuth(route({ title: 'User Homepage', view: <Homepage /> })),
};
