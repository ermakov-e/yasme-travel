import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TextField, Button, Typography } from '@mui/material';

import { useAppDispatch } from '@app/hooks';
import { login } from '@features/auth';

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.default};
`;

const AuthCard = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 0 16px;
  padding: 32px;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const Title = styled(Typography).attrs({ variant: 'h4' })`
  text-align: center;
  margin-bottom: 8px;
`;

const Subtitle = styled(Typography).attrs({ variant: 'body2' })`
  text-align: center;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Form = styled.form`
  margin-top: 8px;
`;

const SubmitButton = styled(Button).attrs({ type: 'submit', fullWidth: true, variant: 'contained' })`
  margin-top: 24px;
  margin-bottom: 16px;
`;

const ErrorText = styled(Typography).attrs({ variant: 'body2', color: 'error' })`
  margin-top: 8px;
`;

export const AuthPage = () => {
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isFormValid = loginValue.trim() !== '' && password.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setError('Please fill in all fields');
      return;
    }

    dispatch(login(loginValue.trim()));
    navigate('/groups', { replace: true });
  };

  return (
    <AuthContainer>
      <AuthCard>
        <Title>Yasme Travel</Title>
        <Subtitle>Sign in to continue</Subtitle>
        <Form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="login"
            label="Login"
            name="login"
            autoComplete="username"
            autoFocus
            value={loginValue}
            onChange={(e) => {
              setLoginValue(e.target.value);
              setError(null);
            }}
            error={!!error && loginValue.trim() === ''}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            error={!!error && password.trim() === ''}
          />
          {error && <ErrorText>{error}</ErrorText>}
          <SubmitButton disabled={!isFormValid}>Sign In</SubmitButton>
        </Form>
      </AuthCard>
    </AuthContainer>
  );
};
