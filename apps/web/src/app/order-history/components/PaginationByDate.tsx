'use client';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';
import { numberToRupiah } from '@/app/utils/numberToRupiah';
import { ITransaction } from '@/types/transaction.type';
import { IPaginationDateProps } from '@/types/props.type';
import { formatDate } from '@/app/utils/formatDate';
const PaginationDate = ({
  data,
  setPageOfDate,
  totalPage,
  itemPerPage,
}: IPaginationDateProps) => {
  const [pageCount, setPageCount] = useState<number>(0);

  const formattedDataArray = data?.map((item: ITransaction) => {
    const createdAt: string = formatDate(item.createdAt as string);

    return { ...item, createdAt: createdAt };
  });

  useEffect(() => {
    setPageCount(Math.ceil(totalPage / itemPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemPerPage, data]);

  const handlePageClick = (event: { selected: number }) => {
    setPageOfDate(event.selected + 1);
  };

  return (
    <>
      {!data?.length ? (
        <div className="my-10">
          <h1 className="font-bold text-center text-xl">Data Empty</h1>
        </div>
      ) : (
        <div>
          <div className="mb-10">
            {formattedDataArray?.map((transaction: ITransaction) => (
              <div key={transaction.id}>
                <div className="flex justify-around border mt-5 h-[80px] items-center bg-gray-100">
                  <div className="text-[12.5px] p-4 md:text-base font-bold flex-shrink-0 md:w-1/5 text-center">
                    # {transaction?.orderId}
                  </div>
                  <div className="text-[12.5px] md:text-base flex-shrink-0 md:w-1/5 p-4 text-center">
                    {transaction?.createdAt}
                  </div>
                  <div className="detail-order flex-shrink-0 w-1/5 p-4 text-center">
                    {numberToRupiah(transaction?.amount)}
                  </div>
                  <div className="detail-order flex-shrink-0 w-1/5 p-4 text-center">
                    {transaction?.status?.title}
                  </div>
                  <div className="text-[12.5px] md:text-base flex-shrink-0 w-1/5 p-4 text-center mr-5">
                    <Link
                      href={`/order-status?transaction_id=${transaction?.orderId}`}
                    >
                      <button className="px-4 py-2 bg-[#333] text-white rounded-md hover:bg-[#111]">
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
        </div>
      )}
    </>
  );
};

export default PaginationDate;
