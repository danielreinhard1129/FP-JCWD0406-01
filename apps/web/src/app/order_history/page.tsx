'use client';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import { id } from 'date-fns/locale/id';
import Pagination from './components/Pagination';
import PaginationDate from './components/PaginationByDate';
import { useGetTransactions } from '@/hooks/transaction/useGetTransactions';
import { useGetTransactionsByDate } from '@/hooks/transaction/useGetTransactionsByDate';
import { useGetTransactionById } from '@/hooks/transaction/useGetTransactionById';

registerLocale('id', id);

const OrderStatusPage = () => {
  const [transactionId, setTransactionId] = useState('');
  const [selectedDate, setSelectedDate]: any = useState(new Date());
  const [page, setPage] = useState(1);
  const [pageOfDate, setPageOfdate]: any = useState(1);
  const [totalPage, setTotalPage]: any = useState(0);
  const [submit, setSubmit] = useState(false);

  const itemPerPage = 5;

  const { data: transactions, setTransactions } = useGetTransactions({
    setTotalPage,
    page,
    itemPerPage,
  });

  const { data: transactionByDate, getTransactionByDate } =
    useGetTransactionsByDate({
      pageOfDate,
      itemPerPage,
      selectedDate,
      setTransactions,
      setTotalPage,
    });

  useGetTransactionById({
    transactionId,
    setTransactions,
    setTotalPage,
    submit,
  });

  return (
    <div className="container mx-auto max-w-7xl mt-1">
      <div className="flex search mt-10">
        <div className="flex px-4 gap-2 max-w-[520px]">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <div className="h-[46px] flex items-center">
              <input
                type="search"
                id="transaction_id"
                className="block px-3 py-[10px] w-full ps-10 md:w-[320px] text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Order ID"
                onChange={(e) => setTransactionId(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            onClick={() => {
              setSubmit((prev) => !prev);
            }}
            className="px-4 my-[2px] bg-[#333] hover:bg-[#111] text-white rounded-md"
          >
            Search
          </button>
        </div>
        {/* min-w-[150px] px-6 py-3.5 text-sm bg-[#333] text-white rounded-md hover:bg-[#111] */}
        <div className="flex pl-4 mt-4 md:my-[3px]">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM-dd-yyyy"
            locale="id"
            className="md:w-[265px] rounded-md"
          />
          <button
            onClick={getTransactionByDate}
            className="px-4 ml-2 bg-[#333] hover:bg-[#111] text-white rounded-md"
          >
            Search
          </button>
        </div>
      </div>
      {transactions.length ? (
        <Pagination
          data={transactions}
          setPage={setPage}
          totalPage={totalPage}
          itemPerPage={itemPerPage}
        />
      ) : (
        <PaginationDate
          data={transactionByDate}
          setPageOfdate={setPageOfdate}
          totalPage={totalPage}
          itemPerPage={itemPerPage}
        />
      )}
    </div>
  );
};

export default OrderStatusPage;
