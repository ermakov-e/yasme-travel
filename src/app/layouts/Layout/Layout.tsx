import styled from 'styled-components';
import { useMediaQuery } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { BottomNavigation } from '../BottomNavigation';

interface LayoutProps {
  readonly children: React.ReactNode;
}

const allowedPaths = ['/groups', '/friends', '/settings'];

const LayoutContainer = styled.div<{ $hasBottomNav: boolean }>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.default};
  padding-bottom: ${({ $hasBottomNav }) => $hasBottomNav ? '56px' : '0'};
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
`;

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:960px)');

  const hasBottomNav = isMobile && allowedPaths.some((path) => 
    location.pathname.startsWith(path)
  );

  return (
    <LayoutContainer $hasBottomNav={hasBottomNav}>
      <MainContent>{children}</MainContent>
      <BottomNavigation />
    </LayoutContainer>
  );
};
