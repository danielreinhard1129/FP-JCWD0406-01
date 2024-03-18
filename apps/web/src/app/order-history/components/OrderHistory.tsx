import Pagination from './Pagination';
import PaginationDate from './PaginationByDate';
import DatePicker from 'react-datepicker';
import { FaCalendar } from 'react-icons/fa';
import { IOrderHistoryProps } from '@/types/props.type';

const OrderHistory = ({
  transactionId,
  setTransactionId,
  setSubmit,
  datepickerRef,
  selectedDate,
  setSelectedDate,
  handleIconClick,
  transactions,
  setPage,
  totalPage,
  itemPerPage,
  transactionByDate,
  setPageOfDate,
}: IOrderHistoryProps) => {
  return (
    <div>
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
                  value={transactionId}
                  id="transaction_id"
                  className="block px-3 py-[10px] w-[225px] ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Order ID"
                  onChange={(e) => setTransactionId(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              onClick={() => {
                setSubmit((prev: boolean) => !prev);
              }}
              className="px-4 my-[2px] bg-[#333] hover:bg-[#111] text-white rounded-md"
            >
              Search
            </button>
            <div className="w-full z-10">
              <div className="relative">
                <DatePicker
                  ref={datepickerRef}
                  selected={selectedDate}
                  onChange={(date: Date) => setSelectedDate(date)}
                  dateFormat="MMMM-dd-yyyy"
                  locale="id"
                  className="py-[10px] px-[10px] text-[1px] cursor-pointer rounded-md"
                  popperPlacement="top-start"
                />
                <FaCalendar
                  className="cursor-pointer absolute top-4 left-[9px] lg:left-3"
                  onClick={handleIconClick}
                />
              </div>
            </div>
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
            setPageOfDate={setPageOfDate}
            totalPage={totalPage}
            itemPerPage={itemPerPage}
          />
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
