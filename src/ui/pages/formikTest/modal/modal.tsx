import React from 'react';

import Modal from 'ui/components/modal';

import * as s from './modal.style';

type Props = {
  isOpen:boolean,
  onClose: Function,
  children?: React.ReactNode,
};

const FormModal: React.FC<Props> = ({
  isOpen = false,
  onClose,
  children,
}) => {
  console.log('isOpen', isOpen);
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <s.Body>
        dsdsds
      </s.Body>
      {children}
    </Modal>
  );
};

export default FormModal;
