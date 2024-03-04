/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useUpdateStatusByMidtrans } from '@/hooks/transaction/useUpdateStatusByMidtrans';
import { Spinner } from 'flowbite-react';

type TransactionId = string | null;
type TransactionStatus = string | null;

const ConfirmPayment = () => {
  const searchParams = useSearchParams();
  const transaction_id: TransactionId = searchParams.get('order_id');
  const transaction_status: TransactionStatus =
    searchParams.get('transaction_status');

  const { isLoading } = useUpdateStatusByMidtrans({
    transaction_id,
    transaction_status,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center">
      {transaction_status == 'capture' || transaction_status == 'settlement' ? (
        <div className="max-w-xl">
          <h1 className="text-center">
            Great news! Your payment has been successfully received and
            processed. Thank you for choosing our services.
          </h1>
        </div>
      ) : transaction_status == 'cancel' ||
        transaction_status == 'deny' ||
        transaction_status == 'expire' ? (
        <div className="max-w-xl">
          <h1 className="text-center">
            We regret to inform you that the payment for your recent transaction
            was unsuccessful. Please review your payment details and try again.
            If the issue persists, contact our customer support for assistance.
          </h1>
        </div>
      ) : transaction_status == 'pending' ? (
        <div className="max-w-xl">
          <div className="text-center flex flex-col">
            <span>
              Dear valued customer, your payment is currently pending approval.
            </span>{' '}
            <span>Our team is diligently working on processing it.</span>{' '}
            <span>
              Thank you for your patience, and we will update you as soon as the
              payment status changes.
            </span>
          </div>
        </div>
      ) : null}
      <Link href={`/order_status/?transaction_id=${transaction_id}`}>
        <button className="px-5 py-2 bg-green-500 rounded-md text-white">
          Order Status
        </button>
      </Link>
    </div>
  );
};

export default ConfirmPayment;
