/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useGetTransactionById } from '@/hooks/transaction/useGetTransactionById';
import { useUpdateStatusTransactionById } from '@/hooks/transaction/useUpdateStatusTransactionById';
import { numberToRupiah } from '@/app/utils/numberToRupiah';
import ModalTransactionDetail from './ModalTransactionDetail';
import ModalPaymetProof from './ModalPaymetProof';
import ModalCancelReason from './ModalCancelReason';
import ModalConfirmPaymentValid from './ModalConfirmPaymentValid';
import ModalConfirmPaymentInvalid from './ModalConfirmPaymentInvalid';
import ModalConfirmShipment from './ModalConfirmShipment';
import { ITransaction } from '@/types/transaction.type';
import { formatDate } from '@/app/utils/formatDate';
import { IPaginationManageOrderProps } from '@/types/props.type';

const Pagination = ({
  data,
  setPage,
  totalPage,
  itemPerPage,
  setUpdate,
}: IPaginationManageOrderProps) => {
  const [pageCount, setPageCount] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [cancel, setCancel] = useState<boolean>(false);
  const [reason, setReason] = useState<string>('');
  const [accept, setAccept] = useState<boolean>(false);
  const [decline, setDecline] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string>('');
  const [submit, setSubmit] = useState<boolean>(false);
  const [openSent, setOpenSent] = useState<boolean>(false);

  const handleReasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReason(event.target.value);
  };

  const { data: transaction } = useGetTransactionById({
    transactionId,
    submit,
  });

  const { updateStatus } = useUpdateStatusTransactionById({
    transactionId,
    reason,
    setUpdate,
  });

  const formattedDataArray = data?.map((item: ITransaction) => {
    const createdAt: string = formatDate(item.createdAt as string);

    return { ...item, createdAt: createdAt };
  });

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
        {formattedDataArray?.map((transaction: ITransaction) => (
          <div key={transaction?.id}>
            <div className="flex flex-col md:flex-row md:justify-around border md:h-[70px] md:items-center">
              <div className="flex justify-between md:flex-col md:text-base flex-shrink-0 md:w-1/5 p-4">
                <h1 className="font-semibold order">Transaction Id:</h1>
                <h1 className="text-gray-600"># {transaction?.orderId}</h1>
              </div>
              <div className="flex justify-between md:flex-col md:text-base flex-shrink-0 md:w-1/5 p-4 md:p-3 lg:p-4">
                <h1 className="font-semibold order">Date:</h1>
                <h1 className="text-gray-600">{transaction?.createdAt}</h1>
              </div>
              <div className="flex justify-between md:flex-col md:text-base flex-shrink-0 md:w-1/5 p-4 md:p-3 lg:p-4">
                <h1 className="font-semibold order">Amount:</h1>
                <h1 className="text-gray-600">
                  {numberToRupiah(transaction?.amount)}
                </h1>
              </div>
              <div className="flex justify-between md:flex-col md:text-base flex-shrink-0 md:w-1/5 p-4">
                <h1 className="font-semibold order">Status:</h1>
                <h1 className="text-gray-600">{transaction?.status.title}</h1>
              </div>
              <div className="flex justify-between md:flex-col md:text-base flex-shrink-0 md:w-1/5 p-4">
                <h1 className="font-semibold order">Action:</h1>
                <h1 className="text-gray-600">
                  <button
                    onClick={() => {
                      setOpenModal(true),
                        setTransactionId(transaction?.orderId),
                        setSubmit((prev) => !prev);
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

      <ModalTransactionDetail
        openModal={openModal}
        setOpenModal={setOpenModal}
        transaction={transaction}
        setOpen={setOpen}
        setAccept={setAccept}
        setDecline={setDecline}
        setOpenSent={setOpenSent}
        setCancel={setCancel}
      />

      <ModalPaymetProof
        open={open}
        setOpen={setOpen}
        transaction={transaction}
      />

      <ModalCancelReason
        cancel={cancel}
        setCancel={setCancel}
        reason={reason}
        handleReasonChange={handleReasonChange}
        setTransactionId={setTransactionId}
        transaction={transaction}
        updateStatus={updateStatus}
        setOpenModal={setOpenModal}
      />

      <ModalConfirmPaymentValid
        accept={accept}
        setAccept={setAccept}
        setTransactionId={setTransactionId}
        transaction={transaction}
        updateStatus={updateStatus}
        setOpenModal={setOpenModal}
      />

      <ModalConfirmPaymentInvalid
        decline={decline}
        setDecline={setDecline}
        setTransactionId={setTransactionId}
        transaction={transaction}
        updateStatus={updateStatus}
        setOpenModal={setOpenModal}
      />

      <ModalConfirmShipment
        openSent={openSent}
        setOpenSent={setOpenSent}
        setTransactionId={setTransactionId}
        transaction={transaction}
        updateStatus={updateStatus}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default Pagination;
