import styled from "styled-components";
import { Dialog, DialogContent, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useAppDispatch, useAppSelector } from "@app/hooks";
import { closeModal } from "@features/ui";

const StyledDialogContent = styled(DialogContent)`
  padding: 24px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const PlaceholderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
`;

export const LocationModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.modal.activeModal);

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Dialog fullScreen open={!!isOpen} onClose={handleClose}>
      <StyledDialogContent>
        <ModalHeader>
          <Typography variant="h5">Location Details</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </ModalHeader>
        <PlaceholderContent>
          <Typography variant="h6" color="text.secondary">
            Photos will be here
          </Typography>
        </PlaceholderContent>
      </StyledDialogContent>
    </Dialog>
  );
};
