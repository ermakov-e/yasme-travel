import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useAppDispatch } from "@app/hooks";
import { login } from "@features/auth";
import { Input, Button, Card } from "@shared/ui";

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.colors.background.default};
  background-image: radial-gradient(
    ${({ theme }) => theme.colors.border.main} 1.5px,
    transparent 1px
  );
  background-size: 20px 20px;
`;

const AuthCard = styled(Card)`
  max-width: 400px;
  padding: ${({ theme }) => theme.spacing(5)};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: ${({ theme }) => theme.spacing(4)};
    margin: ${({ theme }) => theme.spacing(1)};
  }
`;

const BrandTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing(5)};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(1.5)}
    ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.colors.errorLight};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-top: ${({ theme }) => theme.spacing(1)};
  border-left: 3px solid ${({ theme }) => theme.colors.error};
`;

const ErrorIcon = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.125rem;
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.errorDark};
  font-size: 0.875rem;
  margin: 0;
`;

const SubmitWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

export const AuthPage = () => {
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isFormValid = loginValue.trim() !== "" && password.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setError("Please fill in all fields");
      return;
    }

    dispatch(login(loginValue.trim()));
    navigate("/groups", { replace: true });
  };

  const handleInputChange =
    (setter: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError(null);
    };

  return (
    <AuthContainer>
      <AuthCard variant="elevated">
        <BrandTitle>Yasme Travel</BrandTitle>

        <Form onSubmit={handleSubmit}>
          <Input
            required
            fullWidth
            id="login"
            label="Login"
            name="login"
            autoComplete="username"
            autoFocus
            value={loginValue}
            onChange={handleInputChange(setLoginValue)}
            error={!!error && loginValue.trim() === ""}
            placeholder="Enter your login"
          />

          <Input
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleInputChange(setPassword)}
            error={!!error && password.trim() === ""}
            placeholder="Enter your password"
          />

          {error && (
            <ErrorContainer>
              <ErrorIcon>!</ErrorIcon>
              <ErrorText>{error}</ErrorText>
            </ErrorContainer>
          )}

          <SubmitWrapper>
            <Button
              type="submit"
              fullWidth
              size="large"
              disabled={!isFormValid}
              variant="primary"
            >
              Sign In
            </Button>
          </SubmitWrapper>
        </Form>
      </AuthCard>
    </AuthContainer>
  );
};
