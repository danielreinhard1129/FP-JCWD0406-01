import { IModalConfirmPaymentInvalidProps } from '@/types/props.type';
import { Modal } from 'flowbite-react';
import React from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const ModalConfirmPaymentInvalid = ({
  decline,
  setDecline,
  setTransactionId,
  transaction,
  updateStatus,
  setOpenModal,
}: IModalConfirmPaymentInvalidProps) => {
  return (
    <div>
      <Modal show={decline} size="md" onClose={() => setDecline(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure that this payment proof is not valid?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setTransactionId(transaction?.orderId as string),
                    updateStatus(1);
                  setOpenModal(false), setDecline(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 mt-2"
              >
                {"Yes, I'm sure"}
              </button>

              <button
                onClick={() => {
                  setDecline(false);
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

export default ModalConfirmPaymentInvalid;
