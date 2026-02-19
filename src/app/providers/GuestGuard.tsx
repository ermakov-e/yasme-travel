import { Navigate } from 'react-router-dom';

import { useAppSelector } from '@app/hooks';

interface GuestGuardProps {
  children: React.ReactNode;
}

export const GuestGuard = ({ children }: GuestGuardProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/groups" replace />;
  }

  return <>{children}</>;
};
