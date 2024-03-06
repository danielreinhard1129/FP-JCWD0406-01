'use client';
import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { useGetTransactions } from '@/hooks/transaction/useGetTransactions';
import { useGetTransactionsByBranchId } from '@/hooks/transaction/useGetTransactionsByBranchId';
import { useGetBranchs } from '@/hooks/branch/useGetBranchs';

const OrderPage = () => {
  const [totalPage, setTotalPage]: any = useState(0);
  const [branches, setBranches]: any = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(0);
  const [update, setUpdate] = useState(false);

  const [page, setPage]: any = useState(1);
  const itemPerPage = 6;

  const branchId = 2;
  const LoginAdmin: number = 2;

  const {
    data: transactions,
    setTransactions,
    getTransactions,
  } = useGetTransactions({ setTotalPage, page, itemPerPage });

  const { getTransactionsByBranchId } = useGetTransactionsByBranchId({
    setTotalPage,
    setTransactions,
    page,
    itemPerPage,
    selectedBranch,
    branchId,
  });

  const { getBranchs } = useGetBranchs({
    setBranches,
  });

  const handleBranchChange = (event: any) => {
    setSelectedBranch(event.target.value);
  };

  useEffect(() => {
    if (LoginAdmin === 1) {
      if (selectedBranch) {
        getTransactionsByBranchId();
      } else {
        getTransactions();
      }
    } else {
      getTransactionsByBranchId();
    }

    getBranchs();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, LoginAdmin, selectedBranch, update]);

  return (
    <div className="container max-w-7xl mt-1 md:mx-3 lg:mx-10">
      {LoginAdmin === 1 && (
        <div className="mb-2">
          <select
            id="branch"
            name="branch"
            defaultChecked
            onChange={handleBranchChange}
            className="p-2 border rounded-md"
          >
            <option value="" selected disabled hidden>
              Choose here
            </option>
            {branches.map((branch: any) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="border content">
        <div className="header flex bg-gray-100 flex-col md:flex-row md:justify-around border md:h-[70px] md:items-center">
          <div className="flex justify-between md:flex-col md:text-base flex-shrink-0 md:w-1/5 p-4">
            <h1 className="text-gray-600">transactionId</h1>
          </div>
          <div className="flex justify-between md:flex-col md:text-base flex-shrink-0 md:w-1/5 p-4 md:p-3 lg:p-4">
            <h1 className="text-gray-600">Date</h1>
          </div>
          <div className="flex justify-between md:flex-col md:text-base flex-shrink-0 md:w-1/5 p-4 md:p-3 lg:p-4">
            <h1 className="text-gray-600">Amount</h1>
          </div>
          <div className="flex justify-between md:flex-col md:text-base flex-shrink-0 md:w-1/5 p-4">
            <h1 className="text-gray-600">Status</h1>
          </div>
          <div className="flex justify-between md:flex-col md:text-base flex-shrink-0 md:w-1/5 p-4">
            <h1 className="text-gray-600">Action</h1>
          </div>
        </div>
        <Pagination
          data={transactions}
          setPage={setPage}
          totalPage={totalPage}
          itemPerPage={itemPerPage}
          setUpdate={setUpdate}
        />
      </div>
    </div>
  );
};

export default OrderPage;
