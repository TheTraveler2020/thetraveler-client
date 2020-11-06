import { useMemo } from 'react';

import { authService } from 'utils/auth.service';

const useGetRole = () => {
  const currentUser = useMemo(() => authService.getCurrentUser(), []);

  const role = currentUser.role;

  return { role };
};

export default useGetRole;
