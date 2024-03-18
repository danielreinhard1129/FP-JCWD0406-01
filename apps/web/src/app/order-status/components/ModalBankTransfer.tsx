/* eslint-disable @next/next/no-img-element */
import { IModalBankTransferProps } from '@/types/props.type';
import { Button, Modal } from 'flowbite-react';
import React from 'react';

const ModalBankTransfer = ({
  openModal,
  setOpenModal,
}: IModalBankTransferProps) => {
  return (
    <div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Bank Transfer</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="flex gap-10">
              <img src="/bca.png" alt="" className="h-20 w-20" />
              <div className="flex flex-col py-5">
                <span>No Rek: 123123123</span>
                <span>A/N: PT.Grocery Indonesia</span>
              </div>
            </div>
            <div className="flex gap-10">
              <img src="/bni.jpg" alt="" className="h-20 w-20" />
              <div className="flex flex-col py-5">
                <span>No Rek: 231231231</span>
                <span>A/N: PT.Grocery Indonesia</span>
              </div>
            </div>
            <div className="flex gap-10">
              <img src="/mandiri.png" alt="" className="h-20 w-20" />
              <div className="flex flex-col py-5">
                <span>No Rek: 345345345</span>
                <span>A/N: PT.Grocery Indonesia</span>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Done</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalBankTransfer;
