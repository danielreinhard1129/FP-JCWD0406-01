/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useGetTransactionById } from '@/hooks/transaction/useGetTransactionById';
import { useUpdateStatusTransactionById } from '@/hooks/transaction/useUpdateStatusTransactionById';

const Pagination = ({
  data,
  setPage,
  totalPage,
  itemPerPage,
  setUpdate,
}: any) => {
  const [pageCount, setPageCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [reason, setReason] = useState('');
  const [accept, setAccept] = useState(false);
  const [decline, setDecline] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [submit, setSubmit] = useState(false);

  const handleReasonChange = (event: any) => {
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
    setPage(event.selected + 1);
  };

  return (
    <>
      <div className="mb-10">
        {formattedDataArray?.map((transaction: any) => (
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
                <h1 className="text-gray-600">{transaction?.amount}</h1>
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
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Transaction Detail</Modal.Header>
        <Modal.Body>
          <div>
            <div className="flex p-4 border">
              <div className="">
                <h1 className="font-semibold">Name:</h1>
              </div>
              <div className="ml-3">
                <p className="font-[500]">{transaction?.user?.username}</p>
              </div>
            </div>
            <div className="flex p-4 border">
              <div className="">
                <h1 className="font-semibold">Email:</h1>
              </div>
              <div className="ml-3">
                <p className="font-[500]">{transaction?.user?.email}</p>
              </div>
            </div>
            <div className="flex p-4 border">
              <div className="">
                <h1 className="font-semibold">Phone:</h1>
              </div>
              <div className="ml-3">
                <p className="font-[500]">{transaction?.user?.phone}</p>
              </div>
            </div>
            <div className="flex p-4 border">
              <div className="">
                <h1 className="font-semibold">Address:</h1>
              </div>
              <div className="ml-3">
                <p className="font-[500]">{transaction?.address}</p>
              </div>
            </div>
            {transaction?.orderItem?.map((product: any) => (
              <div key={product.id} className="flex p-5 justify-between border">
                <div className="flex gap-3 md:gap-20">
                  <div className="font-semibold">{product.quantity}x</div>
                  <div className="font-semibold">{product.productName}</div>
                </div>
                <div className="font-semibold">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(product.price)}
                </div>
              </div>
            ))}
            {transaction?.statusId !== 1 && (
              <div className="flex p-4 border flex-col text-center">
                <div className="">
                  <h1 className="font-semibold">Confirm Payment</h1>
                </div>
                <div className="p-5">
                  <button
                    onClick={() => {
                      setOpen(true);
                    }}
                    className="px-4 py-2 bg-gray-100 text-[#333] rounded-md hover:bg-gray-200"
                  >
                    Detail
                  </button>

                  {transaction?.statusId === 2 && (
                    <>
                      <button
                        onClick={() => {
                          setAccept(true);
                        }}
                        className="mx-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => setDecline(true)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 mt-2"
                      >
                        Decline
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {transaction?.statusId === 3 && (
              <div className="flex p-4 border flex-col text-center">
                <div className="">
                  <h1 className="font-semibold">Order Status</h1>
                </div>
                <div className="p-5">
                  <>
                    <button
                      onClick={() => {
                        setTransactionId(transaction.orderId), updateStatus(4);
                        setOpenModal(false);
                      }}
                      className="mx-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
                    >
                      Send Order
                    </button>

                    <button
                      onClick={() => {
                        setCancel(true);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 mt-2"
                    >
                      Cancel Order
                    </button>
                  </>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={open} onClose={() => setOpen(false)}>
        <Modal.Header>Payment Proof</Modal.Header>
        <Modal.Body>
          <div className="h-full w-full object-cover">
            <img src={transaction?.paymentProof} alt="payment" />
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={cancel} onClose={() => setCancel(false)}>
        <Modal.Header>Cancel Reason</Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <textarea
              id="reason"
              name="reason"
              value={reason}
              onChange={handleReasonChange}
              rows={4}
              cols={50}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
            onClick={(e) => {
              handleReasonChange(e),
                setTransactionId(transaction.orderId),
                updateStatus(6);
              setCancel(false), setOpenModal(false);
            }}
          >
            send
          </button>
        </Modal.Footer>
      </Modal>
      <Modal show={accept} size="md" onClose={() => setAccept(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure that this payment proof is valid?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setTransactionId(transaction.orderId), updateStatus(3);
                  setOpenModal(false), setAccept(false);
                }}
                className="mx-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
              >
                {"Yes, I'm sure"}
              </button>

              <button
                onClick={() => {
                  setAccept(false);
                }}
                className="px-4 py-2 bg-gray-100 text-[#333] rounded-md hover:bg-gray-200"
              >
                No, cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={decline} size="md" onClose={() => setDecline(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure that this payment proof is not valid?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setTransactionId(transaction.orderId), updateStatus(1);
                  setOpenModal(false), setDecline(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 mt-2"
              >
                {"Yes, I'm sure"}
              </button>

              <button
                onClick={() => {
                  setDecline(false);
                }}
                className="px-4 py-2 bg-gray-100 text-[#333] rounded-md hover:bg-gray-200"
              >
                No, cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Pagination;
