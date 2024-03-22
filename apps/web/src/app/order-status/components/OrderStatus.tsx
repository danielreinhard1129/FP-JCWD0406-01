import Link from 'next/link';
import React, { useState } from 'react';
import Dropzone from './Dropzone';
import ModalBankTransfer from './ModalBankTransfer';
import ModalConfirmOrderCancel from './ModalConfirmOrderCancel';
import ModalConfirmOrderReceived from './ModalConfirmOrderReceived';
import { numberToRupiah } from '@/app/utils/numberToRupiah';
import { IOrderStatusProps } from '@/types/props.type';
import { IOrderItem } from '@/types/transaction.type';

const OrderStatus = ({
  transaction,
  createdAt,
  getTransactionById,
  updateStatus,
}: IOrderStatusProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openCancel, setOpenCancel] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  return (
    <div>
      <div className="container mx-auto max-w-7xl">
        <div className="border">
          <div className="flex bg-gray-100 py-4 flex-col md:flex-row md:justify-around border md:h-[100px] md:items-center">
            <div className="flex justify-between md:flex-col md:text-base flex-shrink-0 md:w-1/5 p-4">
              <h1 className="text-gray-600">transactionId:</h1>
              <p className="font-semibold">
                {' '}
                {transaction?.orderId ? `# ${transaction?.orderId}` : ''}
              </p>
            </div>
            <div className="flex justify-between md:flex-col md:text-base flex-shrink-0 md:w-1/5 p-4 md:p-3 lg:p-4">
              <h1 className="text-gray-600">Date:</h1>
              <p className="font-semibold">
                {createdAt != 'NaN Invalid Date' ? createdAt : ''}
              </p>
            </div>
            <div className="flex justify-between md:flex-col md:text-base flex-shrink-0 md:w-1/5 p-4">
              <h1 className="text-gray-600">Price:</h1>
              <div className="font-semibold">
                {transaction?.amount ? numberToRupiah(transaction?.amount) : ''}
              </div>
            </div>
            <div className="flex justify-between md:flex-col md:text-base flex-shrink-0 md:w-1/5 p-4">
              <h1 className="text-gray-600">Status:</h1>
              <p className="font-semibold">{transaction?.status.title}</p>
            </div>
          </div>
        </div>
        <div className="flex p-4 border mt-3 md:mt-10">
          <div className="md:w-1/2">
            <h1 className="font-semibold">Customer Name:</h1>
          </div>
          <div className="ml-3 md:w-1/2">
            <p className="font-[500]">{transaction?.user.username}</p>
          </div>
        </div>
        <div className="flex p-4 border">
          <div className="md:w-1/2">
            <h1 className="font-semibold">Customer Email:</h1>
          </div>
          <div className="ml-3 md:w-1/2">
            <p className="font-[500]">{transaction?.user.email}</p>
          </div>
        </div>
        <div className="flex p-4 border">
          <div className="md:w-1/2">
            <h1 className="font-semibold">Customer Phone:</h1>
          </div>
          <div className="ml-3 md:w-1/2">
            <p className="font-[500]">{transaction?.user.phone}</p>
          </div>
        </div>
        {transaction?.orderItem?.map((product: IOrderItem) => (
          <div
            key={product.id}
            className="flex py-10 px-4 md:p-10 justify-between border"
          >
            <div className="flex gap-3 md:gap-20">
              <div className="font-semibold">{product.quantity}x</div>
              <div className="font-semibold">{product.productName}</div>
            </div>
            <div className="font-semibold">{numberToRupiah(product.price)}</div>
          </div>
        ))}
        <div className="mt-2 mb-10 border p-4 bg-gray-100">
          <span className="font-bold">Note:</span>
          <p className="text-sm mb-2 text-gray-800">
            1. Jika status pesanan tidak diubah dalam 7 hari setelah pengiriman,
            maka status akan otomatis berubah.
          </p>
          <p className="text-sm text-gray-800">
            2. Jika tidak segera melakukan pembayaran dalam waktu 1 jam kedepan,
            maka pesanan akan otomatis dibatalkan.
          </p>
        </div>
        {transaction?.status.id === 1 && (
          <>
            <div className="max-w-max-lg:max-w-xl mx-auto bg-white rounded-md mt-5">
              <div className="flex flex-row justify-center hover:cursor-pointer">
                <div
                  onClick={() => {
                    setOpenModal(true);
                  }}
                  className={`border min-w-[150px] text-center px-6 py-3.5 bg-[#333] text-white rounded-md hover:bg-[#111]`}
                >
                  Bank Transfer
                </div>
              </div>
            </div>
            <Dropzone
              transactionId={transaction?.orderId}
              className="p-16 text-center mx-auto my-10 border border-neutral-200 md:w-[800px] md:h-[400px] md:flex items-center justify-center"
              getTransactionById={getTransactionById}
            />
          </>
        )}
        <div className="mt-5 mb-20 flex justify-center md:justify-end gap-5 md:mr-2">
          {transaction?.status.id === 1 && (
            <button
              onClick={() => setOpenCancel(true)}
              className="w-full md:max-w-[150px] px-6 py-3.5 mx-2 text-sm bg-[#333] text-white rounded-md hover:bg-[#111]"
            >
              Cancel order
            </button>
          )}

          {(transaction?.status.id === 2 ||
            transaction?.status.id === 3 ||
            transaction?.status.id === 5 ||
            transaction?.status.id === 6) && (
            <Link href="/order-history">
              <button className="w-full md:min-w-[150px] px-6 py-3.5 mx-2 text-sm bg-gray-100 text-[#333] font-semibold rounded-md hover:bg-gray-200">
                History
              </button>
            </Link>
          )}

          {transaction?.status.id === 4 && (
            <button
              disabled={transaction?.statusId === 5}
              onClick={() => setOpenConfirm(true)}
              className={`max-md:w-full md:min-w-[150px] px-6 py-3.5 mx-2 text-sm text-white rounded-md hover:bg-[#333] ${
                transaction?.statusId === 5 ? 'bg-[#444]' : 'bg-[#111]'
              }`}
            >
              Order confirmed
            </button>
          )}
        </div>

        <ModalBankTransfer openModal={openModal} setOpenModal={setOpenModal} />

        <ModalConfirmOrderCancel
          openCancel={openCancel}
          setOpenCancel={setOpenCancel}
          updateStatus={updateStatus}
        />

        <ModalConfirmOrderReceived
          openConfirm={openConfirm}
          setOpenConfirm={setOpenConfirm}
          updateStatus={updateStatus}
        />
      </div>
    </div>
  );
};

export default OrderStatus;
