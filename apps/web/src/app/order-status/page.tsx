/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { useGetTransactionById } from '@/hooks/transaction/useGetTransactionById';
import { useUpdateStatusTransactionById } from '@/hooks/transaction/useUpdateStatusTransactionById';
import isAuthUser from '@/components/isAuthUser';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import OrderStatus from './components/OrderStatus';
import { formatDate } from '../utils/formatDate';
import { TransactionId } from '@/types/params.type';

const ConfirmPayment = () => {
  const searchParams = useSearchParams();
  const getTransactionId: TransactionId = searchParams.get('transaction_id') as TransactionId

  const { data: transaction, getTransactionById } = useGetTransactionById({
    transactionId: getTransactionId,
  });

  const transactionId: TransactionId = transaction?.orderId as TransactionId
  const { updateStatus } = useUpdateStatusTransactionById({
    transactionId,
    getTransactionById,
  });

  const createdAt: string = formatDate(transaction?.createdAt);

  if(!getTransactionId) return redirect('/')
  
  return (
    <>
      <Header />
      <OrderStatus
        transaction={transaction}
        createdAt={createdAt}
        getTransactionById={getTransactionById}
        updateStatus={updateStatus}
      />
      <Footer />
    </>
  );
};

export default isAuthUser(ConfirmPayment);
