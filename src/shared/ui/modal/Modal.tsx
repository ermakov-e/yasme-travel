import React from "react";
import { useMediaQuery, useTheme as useMuiTheme, Dialog } from "@mui/material";
import { Root, Portal, Overlay, Content } from "vaul";
import styled from "styled-components";

import { styledTheme } from "../../../app/styles/theme";

// Styled components for vaul
const StyledOverlay = styled(Overlay)`
  background-color: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(2px);
  position: fixed;
  inset: 0;
  z-index: ${styledTheme.zIndex.modal};
`;

const DrawerHandle = styled.div`
  width: 36px;
  height: 4px;
  border-radius: ${styledTheme.borderRadius.full};
  background-color: ${styledTheme.colors.border.main};
  margin: 12px auto 4px;
  flex-shrink: 0;
`;

const StyledContent = styled(Content)`
  background-color: ${styledTheme.colors.background.paper};
  border-radius: ${styledTheme.borderRadius.lg} ${styledTheme.borderRadius.lg} 0
    0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: ${styledTheme.zIndex.modal + 1};
  box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.18);

  &:focus-visible {
    outline: none;
  }
`;

const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    border-radius: ${styledTheme.borderRadius.lg};
    box-shadow: ${styledTheme.shadows.xl};
    max-height: 85vh;
  }

  & .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(2px);
  }
`;

// Common styled components
const StyledHeader = styled.div`
  padding: ${styledTheme.spacing(2)};
  border-bottom: 1px solid ${styledTheme.colors.border.light};
  position: sticky;
  top: 0;
  background-color: ${styledTheme.colors.background.paper};
  z-index: 1;
`;

const StyledBody = styled.div`
  padding: ${styledTheme.spacing(2)};
  overflow-y: auto;
  flex: 1;
`;

const StyledActions = styled.div`
  padding: ${styledTheme.spacing(2)};
  border-top: 1px solid ${styledTheme.colors.border.light};
  position: sticky;
  bottom: 0;
  background-color: ${styledTheme.colors.background.paper};
  display: flex;
  justify-content: flex-end;
  gap: ${styledTheme.spacing(1)};
`;

// Types
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  fullScreen?: boolean;
}

// Mobile/Tablet version (vaul)
const MobileModal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  title,
  actions,
}) => {
  return (
    <Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Portal>
        <StyledOverlay onClick={onClose} />
        <StyledContent>
          <DrawerHandle />
          {title && <StyledHeader>{title}</StyledHeader>}
          <StyledBody>{children}</StyledBody>
          {actions && <StyledActions>{actions}</StyledActions>}
        </StyledContent>
      </Portal>
    </Root>
  );
};

// Desktop version (MUI Dialog)
const DesktopModal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  title,
  actions,
  maxWidth = "md",
  fullScreen = false,
}) => {
  const muiTheme = useMuiTheme();

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          ...(title && {
            "& .MuiDialogTitle-root": {
              padding: muiTheme.spacing(2),
              borderBottom: `1px solid ${styledTheme.colors.border.light}`,
            },
          }),
          ...(actions && {
            "& .MuiDialogActions-root": {
              padding: muiTheme.spacing(2),
              borderTop: `1px solid ${styledTheme.colors.border.light}`,
            },
          }),
        },
      }}
    >
      {title && <StyledHeader>{title}</StyledHeader>}
      <StyledBody>{children}</StyledBody>
      {actions && <StyledActions>{actions}</StyledActions>}
    </StyledDialog>
  );
};

// Universal Modal component
export const Modal: React.FC<ModalProps> = (props) => {
  const muiTheme = useMuiTheme();
  const isDesktop = useMediaQuery(muiTheme.breakpoints.up("md"));

  if (isDesktop) {
    return <DesktopModal {...props} />;
  }

  return <MobileModal {...props} />;
};

// Export vaul components for advanced usage
export {
  Root as DrawerRoot,
  Portal as DrawerPortal,
  Overlay as DrawerOverlay,
  Content as DrawerContent,
};
