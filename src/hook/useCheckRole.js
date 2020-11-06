import { useMemo } from 'react';
import get from 'lodash/get';

import { authService } from 'utils/auth.service';

const useCheckRole = () => {
  const currentUser = useMemo(() => authService.getCurrentUser(), []);
  const isAdmin = useMemo(() => get(currentUser, 'role') === 'guider', [currentUser]);

  return { isAdmin };
};

export default useCheckRole;
