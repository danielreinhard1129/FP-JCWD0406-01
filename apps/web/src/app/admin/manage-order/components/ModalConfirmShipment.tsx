import { IModalConfirmShipmentProps } from '@/types/props.type';
import { Modal } from 'flowbite-react';
import React from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const ModalConfirmShipment = ({
  openSent,
  setOpenSent,
  setTransactionId,
  transaction,
  updateStatus,
  setOpenModal,
}: IModalConfirmShipmentProps) => {
  return (
    <div>
      <Modal show={openSent} size="md" onClose={() => setOpenSent(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Is this item ready for shipment?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setTransactionId(transaction?.orderId as string),
                    updateStatus(4);
                  setOpenModal(false), setOpenSent(false);
                }}
                className="mx-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
              >
                {"Yes, I'm sure"}
              </button>

              <button
                onClick={() => {
                  setOpenSent(false);
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

export default ModalConfirmShipment;
