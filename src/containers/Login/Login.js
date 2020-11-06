import React, { useState } from 'react';

import { authService } from 'utils/auth.service';
import { useMutation } from 'hook/axios.hook';
import Button from 'components/Button';
import Input from 'components/Input';

const Login = () => {
  const [sign_in] = useMutation({ url: 'https://a2ztravel-server.herokuapp.com/auth/sign_in' });
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    sign_in({ email, password })
      .then(response => {
        if (!response.data.success) {
          console.log('success');
          return;
        }

        const { headers } = response;
        delete headers['content-type'];
        authService.login({
          currentUser: { ...response.data.data, role: response.data.role },
          token: headers,
        });
      })
      .catch(err => {
        console.log(err);
        setIsError(true);
      });
  };

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
