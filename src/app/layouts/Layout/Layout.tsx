import { useState } from "react";
import styled from "styled-components";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MapIcon from "@mui/icons-material/Map";
import GroupsIcon from "@mui/icons-material/Groups";
import { useNavigate, useLocation } from "react-router-dom";

interface LayoutProps {
  readonly children: React.ReactNode;
}

const navItems = [
  { text: "Groups", icon: <GroupsIcon />, path: "/groups" },
  { text: "Map", icon: <MapIcon />, path: "/groups" },
];

export const Layout = ({ children }: LayoutProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:960px)");
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const drawer = (
    <DrawerContent>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname.startsWith(item.path)}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </DrawerContent>
  );

  return (
    <LayoutContainer>
      <StyledAppBar>
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <AppTitle onClick={() => navigate("/groups")}>Yasme Travel</AppTitle>
        </Toolbar>
      </StyledAppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

const StyledAppBar = styled(AppBar)`
  position: static;
`;

const AppTitle = styled(Typography).attrs({ variant: "h6" })`
  cursor: pointer;
`;

const DrawerContent = styled.div`
  width: 250px;
`;