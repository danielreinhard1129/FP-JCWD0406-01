/* eslint-disable @next/next/no-img-element */
'use client';
import { useSearchParams } from 'next/navigation';
import { useUpdateStatusByMidtrans } from '@/hooks/transaction/useUpdateStatusByMidtrans';
import { Spinner } from 'flowbite-react';
import isAuthUser from '@/components/isAuthUser';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import PaymentSuccess from './components/PaymentStatus';
import { TransactionId, TransactionStatus } from '@/types/params.type';

const ConfirmPayment = () => {
  const searchParams = useSearchParams();
  const transactionId: TransactionId = searchParams.get(
    'order_id',
  ) as TransactionId;
  const transactionStatus: TransactionStatus = searchParams.get(
    'transaction_status',
  ) as TransactionStatus;

  const { isLoading } = useUpdateStatusByMidtrans({
    transactionId,
    transactionStatus,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <PaymentSuccess
        transactionStatus={transactionStatus}
        transactionId={transactionId}
      />
      <Footer />
    </>
  );
};

export default isAuthUser(ConfirmPayment);
