/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ModalShowReason from './ModalShowReason';
import { formatDate } from '@/app/utils/formatDate';
import { IJournalPaginationProps } from '@/types/props.type';
import { IJournals } from '@/types/journal.type';

const Pagination = ({
  data,
  setPage,
  totalPage,
  itemPerPage,
}: IJournalPaginationProps) => {
  const [pageCount, setPageCount] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [reason, setReason] = useState<string>('');

  const formattedDataArray = data?.map((item: IJournals) => {
    const createdAt: string = formatDate(item.createdAt as string);

    return { ...item, createdAt: createdAt };
  });

  function getReasonById(id: number) {
    const transaction = data.find((item: IJournals) => item.id === id);
    return setReason(transaction?.reason as string);
  }

  useEffect(() => {
    setPageCount(Math.ceil(totalPage / itemPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemPerPage, data]);

  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected + 1);
  };

  return (
    <>
      <div className="mb-10">
        {formattedDataArray?.map((journal: Partial<IJournals>) => (
          <div key={journal?.id}>
            <div className="flex flex-col md:flex-row md:justify-around border md:h-[70px] md:items-center">
              <div className="flex justify-between md:flex-col md:text-base flex-shrink-0 p-4 md:p-2 lg:p-4">
                <h1 className="font-semibold order">Date:</h1>
                <h1 className="text-gray-600">{String(journal?.createdAt)}</h1>
              </div>
              <div className="flex justify-between md:flex-col md:text-base flex-shrink-0 p-4 md:p-2 lg:p-4">
                <h1 className="font-semibold order">Branch:</h1>
                <h1 className="text-gray-600">{journal?.storeBranch?.name}</h1>
              </div>
              <div className="flex justify-between md:flex-col md:text-base flex-shrink-0 p-4 md:p-2">
                <h1 className="font-semibold order">Title:</h1>
                <h1 className="text-gray-600 ml-2 md:ml-0">{journal?.title}</h1>
              </div>
              <div className="flex justify-between md:flex-col md:text-base flex-shrink-0 p-4 md:p-2">
                <h1 className="font-semibold order">Reason:</h1>
                <h1 className="text-gray-600">
                  <button
                    onClick={() => {
                      setOpenModal(true), getReasonById(Number(journal?.id));
                    }}
                    className="px-4 py-2 bg-gray-100 text-[#333] rounded-md hover:bg-gray-200"
                  >
                    Detail
                  </button>
                </h1>
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

      <ModalShowReason
        openModal={openModal}
        setOpenModal={setOpenModal}
        reason={reason}
      />
    </>
  );
};

export default Pagination;
