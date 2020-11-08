import React, { useCallback, useState } from 'react';

import { ADMIN, GUIDER } from 'utils/constants';
import { authService } from 'utils/auth.service';
import { useMutation } from 'hook/axios.hook';
import { useNavigation } from 'react-navi';
import Button from 'components/Button';
import Input from 'components/Input';

const Login = () => {
  const { navigate } = useNavigation();
  const [sign_in] = useMutation({ url: 'https://a2ztravel-server.herokuapp.com/auth/sign_in' });
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNavigate = useCallback(
    role => {
      switch (role) {
        case ADMIN:
          return navigate('/admin/homepage');
        case GUIDER:
          return navigate('/guider/homepage');
        default:
          return navigate('/user/homepage');
      }
    },
    [navigate],
  );

  const handleSubmit = useCallback(() => {
    sign_in({ email, password })
      .then(response => {
        if (!response.data.success) {
          return;
        }

        const { headers } = response;
        delete headers['content-type'];
        authService.login({
          currentUser: { ...response.data.data },
          token: headers,
        });

        const { role } = response.data.data;
        handleNavigate(role);
      })
      .catch(err => {
        console.log(err);
        setIsError(true);
      });
  }, [email, password, sign_in, handleNavigate]);

  // return <LoginForm onSubmit={handleSubmit} />;

  //using formik
  return (
    <div className="container">
      <Input
        type="email"
        value={email}
        onChange={e => {
          setEmail(e.target.value);
        }}
        placeholder="email"
      />
      <Input
        type="password"
        value={password}
        onChange={e => {
          setPassword(e.target.value);
        }}
        placeholder="password"
      />
      <Button type="submit" onClick={handleSubmit}>
        Sign In
      </Button>
      {isError && <div>The email or password provider were incorrect.</div>}
    </div>
  );
};

export default Login;
