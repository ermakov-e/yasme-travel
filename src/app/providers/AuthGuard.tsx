import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@app/hooks';

export const AuthGuard = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};
