/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from 'react';
import CountdownTimer from './components/CountDown';
import { Button, Modal } from 'flowbite-react';
import { useSearchParams } from 'next/navigation';
import Dropzone from './components/Dropzone';
import { useGetTransactionById } from '@/hooks/transaction/useGetTransactionById';
import { useUpdateStatusTransactionById } from '@/hooks/transaction/useUpdateStatusTransactionById';

type ItransactionId = string | any;

const ConfirmPayment = () => {
  const searchParams = useSearchParams();
  const getTransactionId: ItransactionId = searchParams.get('transaction_id');

  const [openModal, setOpenModal] = useState(false);

  const { data: transaction, getTransactionById } = useGetTransactionById({
    transactionId: getTransactionId,
  });

  const transactionId: ItransactionId = transaction?.orderId;
  const { updateStatus } = useUpdateStatusTransactionById({
    transactionId,
    getTransactionById,
  });

  const transactionDate = new Date(transaction?.createdAt);
  const formatDate = transactionDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const monthName = formatDate.split(',')[0];
  const createdAt = `${transactionDate.getFullYear()} ${monthName}`;

  return (
    <div className="container mx-auto max-w-7xl mt-1">
      {/* <div className='my-10'>
          <CountdownTimer orderId={transaction?.orderId}/>
        </div> */}
      <div className="mt-8 border">
        <div className="flex bg-gray-100 flex-col md:flex-row md:justify-around border md:h-[100px] md:items-center">
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
              {transaction?.amount
                ? new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(transaction?.amount)
                : ''}
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
      {transaction?.orderItem?.map((product: any) => (
        <div
          key={product.id}
          className="flex py-10 px-4 md:p-10 justify-between border"
        >
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
            <div className="flex flex-row">
              <div
                onClick={() => {
                  setOpenModal(true);
                }}
                className={`flex-1 border p-5 cursor-pointer hover:bg-gray-200 text-center font-semibold`}
              >
                Bank Transfer
              </div>
            </div>
          </div>
          <Dropzone
            transaction_id={transaction?.orderId}
            className="p-16 text-center mx-auto my-10 border border-neutral-200 md:w-[800px] md:h-[400px] md:flex items-center justify-center"
            getTransactionById={getTransactionById}
          />
        </>
      )}
      <div className="mt-5 mb-20 flex justify-center md:justify-end gap-5 md:mr-2">
        {transaction?.status.id === 1 && (
          <button
            onClick={() => updateStatus(6)}
            className="min-w-[150px] px-6 py-3.5 text-sm bg-[#333] text-white rounded-md hover:bg-[#111]"
          >
            Cancel order
          </button>
        )}

        {(transaction?.status.id === 2 ||
          transaction?.status.id === 3 ||
          transaction?.status.id === 5 ||
          transaction?.status.id === 6) && (
          <button className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-100 text-[#333] font-semibold rounded-md hover:bg-gray-200">
            History
          </button>
        )}

        {transaction?.status.id === 4 && (
          <button
            disabled={transaction?.status.id === 5}
            onClick={() => updateStatus(5)}
            className={`min-w-[150px] px-6 py-3.5 text-sm text-white rounded-md hover:bg-[#111] ${
              transaction?.status.id === 5 ? 'bg-[#444]' : 'bg-[#111]'
            }`}
          >
            Order confirmed
          </button>
        )}
      </div>

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

export default ConfirmPayment;
