import { IModalCancelReasonProps } from '@/types/props.type';
import { Modal } from 'flowbite-react';
import React from 'react';

const ModalCancelReason = ({
  cancel,
  setCancel,
  reason,
  handleReasonChange,
  setTransactionId,
  transaction,
  updateStatus,
  setOpenModal,
}: IModalCancelReasonProps) => {
  return (
    <div>
      <Modal show={cancel} onClose={() => setCancel(false)}>
        <Modal.Header>Cancel Reason</Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <textarea
              id="reason"
              name="reason"
              value={reason}
              onChange={handleReasonChange}
              rows={4}
              cols={50}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
            onClick={(e) => {
              handleReasonChange(e),
                setTransactionId(transaction?.orderId as string),
                updateStatus(6);
              setCancel(false), setOpenModal(false);
            }}
          >
            send
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalCancelReason;
