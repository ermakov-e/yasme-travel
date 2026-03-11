import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import type { RootState } from "@/app/store";
import { styledTheme } from "@/app/styles/theme";
import { CreateGroupModal } from "@/widgets/create-group-modal";

const StyledContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${styledTheme.zIndex.modal};
`;

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { activeModal } = useSelector((state: RootState) => state.modal);

  return (
    <>
      {children}
      {activeModal === "create-group" && (
        <StyledContainer>
          <CreateGroupModal />
        </StyledContainer>
      )}
    </>
  );
};
