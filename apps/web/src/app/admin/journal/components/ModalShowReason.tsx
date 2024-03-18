import { IModalShowReasonProps } from '@/types/props.type';
import { Modal } from 'flowbite-react';
import React from 'react';

const ModalShowReason = ({
  openModal,
  setOpenModal,
  reason,
}: IModalShowReasonProps) => {
  return (
    <div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Reason</Modal.Header>
        <Modal.Body>
          <p>{reason}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalShowReason;
