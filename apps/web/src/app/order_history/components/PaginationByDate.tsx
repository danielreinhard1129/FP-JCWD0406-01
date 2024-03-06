'use client';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';

const PaginationDate = ({
  data,
  setPageOfdate,
  totalPage,
  itemPerPage,
}: any) => {
  const [pageCount, setPageCount] = useState(0);

  const formattedDataArray = data?.map((item: any) => {
    const transactionDate = new Date(item.createdAt);
    const formatDate = transactionDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const monthName = formatDate.split(',')[0];
    const createdAt = `${transactionDate.getFullYear()} ${monthName}`;

    return { ...item, createdAt: createdAt };
  });

  useEffect(() => {
    setPageCount(Math.ceil(totalPage / itemPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemPerPage, data]);

  const handlePageClick = (event: any) => {
    setPageOfdate(event.selected + 1);
  };

  return (
    <>
      <div className="mb-10">
        {formattedDataArray?.map((transaction: any) => (
          <div key={transaction.id}>
            <div className="flex justify-around border mt-5 h-[80px] items-center bg-gray-100">
              <div className="text-[12.5px] p-4 md:text-base font-bold flex-shrink-0 md:w-1/5 text-center">
                # {transaction?.orderId}
              </div>
              <div className="text-[12.5px] md:text-base flex-shrink-0 md:w-1/5 p-4 text-center">
                {transaction?.createdAt}
              </div>
              <div className="detail-order flex-shrink-0 w-1/5 p-4 text-center">
                {transaction?.amount}
              </div>
              <div className="detail-order flex-shrink-0 w-1/5 p-4 text-center">
                {transaction?.status?.title}
              </div>
              <div className="text-[12.5px] md:text-base flex-shrink-0 w-1/5 p-4 text-center mr-5">
                <Link
                  href={`/order_status?transaction_id=${transaction?.orderId}`}
                >
                  <button className="px-4 py-2 bg-gray-100 text-[#333] rounded-md hover:bg-gray-200">
                    Detail
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-[100px] mx-auto">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<<"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active"
        />
      </div>
    </>
  );
};

export default PaginationDate;
