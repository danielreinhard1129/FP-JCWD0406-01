/* eslint-disable @next/next/no-img-element */
import { IModalPaymnetProofProps } from '@/types/props.type';
import { Modal } from 'flowbite-react';
import React from 'react';

const ModalPaymetProof = ({
  open,
  setOpen,
  transaction,
}: IModalPaymnetProofProps) => {
  return (
    <div>
      <Modal show={open} onClose={() => setOpen(false)}>
        <Modal.Header>Payment Proof</Modal.Header>
        <Modal.Body>
          <div className="h-full w-full object-cover">
            {transaction?.paymentProof !== null && (
              <img src={transaction?.paymentProof} alt="payment" />
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalPaymetProof;
