"use client"
import { useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import { id } from 'date-fns/locale/id';
import { useGetTransactions } from '@/hooks/transaction/useGetTransactions';
import { useGetTransactionsByDate } from '@/hooks/transaction/useGetTransactionsByDate';
import { useGetTransactionById } from '@/hooks/transaction/useGetTransactionById';
import isAuthUser from '@/components/isAuthUser';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import OrderHistory from './components/OrderHistory';

registerLocale('id', id);

const OrderStatusPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [pageOfDate, setPageOfDate] = useState<number>(1);
  const [transactionId, setTransactionId] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [submit, setSubmit] = useState<boolean>(false);

  const itemPerPage: number = 5;

  const { data: transactions, setTransactions } = useGetTransactions({
    setTotalPage,
    page,
    itemPerPage,
  });

  const { data: transactionByDate } = useGetTransactionsByDate({
    pageOfDate,
    itemPerPage,
    selectedDate,
    setTransactions,
    setTotalPage,
  });

  useGetTransactionById({
    transactionId,
    setTransactionId,
    setTransactions,
    setTotalPage,
    submit,
  });

  const datepickerRef: React.RefObject<any> = useRef(null);

  const handleIconClick = () => {
    datepickerRef?.current?.setOpen(true);
  };

  return (
    <>
      <Header />
      <OrderHistory
        transactionId={transactionId}
        setTransactionId={setTransactionId}
        setSubmit={setSubmit}
        datepickerRef={datepickerRef}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        handleIconClick={handleIconClick}
        transactions={transactions}
        setPage={setPage}
        totalPage={totalPage}
        itemPerPage={itemPerPage}
        transactionByDate={transactionByDate}
        setPageOfDate={setPageOfDate}
      />
      <Footer />
    </>
  );
};

export default isAuthUser(OrderStatusPage);
