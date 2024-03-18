'use client';
import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { useGetTransactions } from '@/hooks/transaction/useGetTransactions';
import { useGetTransactionsByBranchId } from '@/hooks/transaction/useGetTransactionsByBranchId';
import { useGetBranchs } from '@/hooks/branch/useGetBranchs';
import NavbarAdmin from '../../components/NavbarAdmin';
import { useAppSelector } from '@/libs/hooks';
import { IAdminState } from '@/types/admin.type';
import { IOrderPageProps } from '@/types/props.type';
import { IStoreBranch } from '@/types/branch.type';

const OrderPage = ({ isOpen, onClose }: IOrderPageProps) => {
  const [totalPage, setTotalPage] = useState<number>(0);
  const [branches, setBranches] = useState<IStoreBranch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<number>(0);
  const [update, setUpdate] = useState<boolean>(false);
  const admin: IAdminState = useAppSelector((state) => state.admin);
  const [page, setPage] = useState<number>(1);
  const itemPerPage: number = 6;
  const branchId: number = admin?.branchId;
  const isSuperAdmin: boolean = admin?.isSuperAdmin;

  const {
    data: transactions,
    setTransactions,
    getTransactions,
  } = useGetTransactions({ setTotalPage, page, itemPerPage, isSuperAdmin });

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

  const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBranch(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    if (isSuperAdmin) {
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
  }, [page, isSuperAdmin, selectedBranch, update, branchId]);

  return (
    <div className="container max-w-7xl mt-1 md:mx-3 lg:mx-10">
      <div className="mb-10">
        <NavbarAdmin isOpen={isOpen} onClose={onClose} />
      </div>
      {isSuperAdmin && (
        <div className="mb-2 ml-2">
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
        {!transactions.length ? (
          <div className="my-10">
            <h1 className="font-bold text-center text-xl">Data Empty</h1>
          </div>
        ) : (
          <Pagination
            data={transactions}
            setPage={setPage}
            totalPage={totalPage}
            itemPerPage={itemPerPage}
            setUpdate={setUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default OrderPage;
