import { useState } from 'react';
import styled from 'styled-components';
import { TextField, Button, Typography } from '@mui/material';

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

export const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.warn('Login attempt:', { email, password });
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton>Sign In</SubmitButton>
        </Form>
      </AuthCard>
    </AuthContainer>
  );
};
