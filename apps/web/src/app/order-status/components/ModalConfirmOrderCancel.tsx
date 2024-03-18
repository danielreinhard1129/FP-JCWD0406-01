import { IModalConfirmOrderCancelProps } from '@/types/props.type';
import { Button, Modal } from 'flowbite-react';
import React from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const ModalConfirmOrderCancel = ({
  openCancel,
  setOpenCancel,
  updateStatus,
}: IModalConfirmOrderCancelProps) => {
  return (
    <div>
      <Modal
        show={openCancel}
        size="md"
        onClose={() => setOpenCancel(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to cancel this order?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setOpenCancel(false), updateStatus(6);
                }}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenCancel(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalConfirmOrderCancel;
