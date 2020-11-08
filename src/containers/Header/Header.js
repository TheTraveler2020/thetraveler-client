import React, { useCallback } from 'react';
import { useNavigation } from 'react-navi';

import Button from 'components/Button';
import { useMutation } from 'hook/axios.hook';
import { authService } from 'utils/auth.service';

const Header = () => {
  const [sign_out] = useMutation({
    url: 'https://a2ztravel-server.herokuapp.com/auth/sign_out',
    method: 'DELETE',
  });

  const { navigate } = useNavigation();

  const handleLogout = useCallback(() => {
    sign_out()
      .then(() => {
        authService.logout();
      })
      .finally(navigate('/login'));
  }, [navigate, sign_out]);

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Header;
