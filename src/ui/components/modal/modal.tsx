import React from 'react';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useUpdateEffect } from 'react-use';

import * as s from './modal.style';

type Props = {
  isOpen:boolean,
  onClose: Function,
  children?: React.ReactNode,
};

const TransitionsModal: React.FC<Props> = ({
  isOpen = false,
  onClose,
  children,
}) => {
  const [open, setOpen] = React.useState(isOpen);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  useUpdateEffect(isOpen ? handleOpen : handleClose, [isOpen]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade
        in={open}
        style={{ outline: 'none' }}
      >
        <Box boxShadow={3}>
          <s.BodyWrapper>
            {children}
          </s.BodyWrapper>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TransitionsModal;
