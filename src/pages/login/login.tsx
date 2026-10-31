import { LoginUI } from '@ui-pages';
import { type SyntheticEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from '../../services/store';
import { clearError, loginUser } from '../../services/userSlice';

import type { RouteLocationState } from '../../utils/types';

export const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as RouteLocationState | null)?.from ?? {
    pathname: '/',
  };
  const { error } = useSelector((state) => state.user);

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    void dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => navigate(from, { replace: true }))
      .catch(() => undefined);
  };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <LoginUI
      errorText={error ?? ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
