import { IModalConfirmPaymentValidProps } from '@/types/props.type';
import { Modal } from 'flowbite-react';
import React from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const ModalConfirmPaymentValid = ({
  accept,
  setAccept,
  setTransactionId,
  transaction,
  updateStatus,
  setOpenModal,
}: IModalConfirmPaymentValidProps) => {
  return (
    <div>
      <Modal show={accept} size="md" onClose={() => setAccept(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure that this payment proof is valid?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setTransactionId(transaction?.orderId as string),
                    updateStatus(3);
                  setOpenModal(false), setAccept(false);
                }}
                className="mx-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
              >
                {"Yes, I'm sure"}
              </button>

              <button
                onClick={() => {
                  setAccept(false);
                }}
                className="px-4 py-2 bg-gray-100 text-[#333] rounded-md hover:bg-gray-200"
              >
                No, cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalConfirmPaymentValid;
