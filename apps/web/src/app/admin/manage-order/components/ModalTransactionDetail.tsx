import { IModalTransactionDetailProps } from '@/types/props.type';
import { Modal } from 'flowbite-react';
import React from 'react';

const ModalTransactionDetail = ({
  openModal,
  setOpenModal,
  transaction,
  setOpen,
  setAccept,
  setDecline,
  setOpenSent,
  setCancel,
}: IModalTransactionDetailProps) => {
  return (
    <div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Transaction Detail</Modal.Header>
        <Modal.Body>
          <div>
            <div className="flex p-4 border">
              <div className="">
                <h1 className="font-semibold">Name:</h1>
              </div>
              <div className="ml-3">
                <p className="font-[500]">{transaction?.user?.username}</p>
              </div>
            </div>
            <div className="flex p-4 border">
              <div className="">
                <h1 className="font-semibold">Email:</h1>
              </div>
              <div className="ml-3">
                <p className="font-[500]">{transaction?.user?.email}</p>
              </div>
            </div>
            <div className="flex p-4 border">
              <div className="">
                <h1 className="font-semibold">Phone:</h1>
              </div>
              <div className="ml-3">
                <p className="font-[500]">{transaction?.user?.phone}</p>
              </div>
            </div>
            <div className="flex p-4 border">
              <div className="">
                <h1 className="font-semibold">Address:</h1>
              </div>
              <div className="ml-3">
                <p className="font-[500]">{transaction?.address}</p>
              </div>
            </div>
            {transaction?.orderItem?.map((product: any) => (
              <div key={product.id} className="flex p-5 justify-between border">
                <div className="flex gap-3 md:gap-20">
                  <div className="font-semibold">{product.quantity}x</div>
                  <div className="font-semibold">{product.productName}</div>
                </div>
                <div className="font-semibold">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(product.price)}
                </div>
              </div>
            ))}
            {transaction?.statusId !== 1 && (
              <div className="flex p-4 border flex-col text-center">
                <div className="">
                  <h1 className="font-semibold">Confirm Payment</h1>
                </div>
                <div className="p-5">
                  <button
                    onClick={() => {
                      setOpen(true);
                    }}
                    className="px-4 py-2 bg-gray-100 text-[#333] rounded-md hover:bg-gray-200"
                  >
                    Detail
                  </button>

                  {transaction?.statusId === 2 && (
                    <>
                      <button
                        onClick={() => {
                          setAccept(true);
                        }}
                        className="mx-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => setDecline(true)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 mt-2"
                      >
                        Decline
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {transaction?.statusId === 3 && (
              <div className="flex p-4 border flex-col text-center">
                <div className="">
                  <h1 className="font-semibold">Order Status</h1>
                </div>
                <div className="p-5">
                  <>
                    <button
                      onClick={() => {
                        setOpenSent(true);
                      }}
                      className="mx-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
                    >
                      Send Order
                    </button>

                    <button
                      onClick={() => {
                        setCancel(true);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 mt-2"
                    >
                      Cancel Order
                    </button>
                  </>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalTransactionDetail;
