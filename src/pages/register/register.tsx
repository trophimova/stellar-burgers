import { RegisterUI } from '@ui-pages';
import { type SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from '../../services/store';
import { clearError, registerUser } from '../../services/userSlice';

export const Register = (): React.JSX.Element => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.user.error);

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    void dispatch(registerUser({ email, password, name: userName }))
      .unwrap()
      .then(() => {
        void navigate('/');
      })
      .catch((error: unknown) => {
        console.error('Ошибка регистрации:', error);
      });
  };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <RegisterUI
      errorText={error ?? ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
