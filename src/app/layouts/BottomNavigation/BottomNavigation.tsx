import styled from 'styled-components';
import { BottomNavigation as MuiBottomNavigation, BottomNavigationAction, useMediaQuery } from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Groups', icon: <ExploreIcon />, path: '/groups' },
  { label: 'Friends', icon: <PeopleIcon />, path: '/friends' },
  { label: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const allowedPaths = ['/groups', '/friends', '/settings'];

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background.paper};
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.08);
  z-index: ${({ theme }) => theme.zIndex.fixed};
`;

const StyledBottomNavigation = styled(MuiBottomNavigation)`
  background-color: transparent;
  height: 56px;
  
  & .MuiBottomNavigationAction-root {
    color: ${({ theme }) => theme.colors.text.secondary};
    
    &.Mui-selected {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  
  & .MuiBottomNavigationAction-label {
    font-size: 0.7rem;
    
    &.Mui-selected {
      font-size: 0.7rem;
    }
  }
`;

export const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:960px)');

  const isAllowedPath = allowedPaths.some((path) => 
    location.pathname.startsWith(path)
  );

  if (!isMobile || !isAllowedPath) {
    return null;
  }

  const currentValue = navItems.find((item) => 
    location.pathname.startsWith(item.path)
  )?.label ?? 'Groups';

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    const item = navItems.find((i) => i.label === newValue);
    if (item) {
      navigate(item.path);
    }
  };

  return (
    <NavContainer>
      <StyledBottomNavigation
        value={currentValue}
        onChange={handleChange}
        showLabels
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            icon={item.icon}
            value={item.label}
          />
        ))}
      </StyledBottomNavigation>
    </NavContainer>
  );
};
