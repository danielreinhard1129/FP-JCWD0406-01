import { IModalConfirmOrderReceivedProps } from '@/types/props.type';
import { Button, Modal } from 'flowbite-react';
import React from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const ModalConfirmOrderReceived = ({
  openConfirm,
  setOpenConfirm,
  updateStatus,
}: IModalConfirmOrderReceivedProps) => {
  return (
    <div>
      <Modal
        show={openConfirm}
        size="md"
        onClose={() => setOpenConfirm(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Is it confirmed that this order has been received?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setOpenConfirm(false), updateStatus(5);
                }}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenConfirm(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalConfirmOrderReceived;
