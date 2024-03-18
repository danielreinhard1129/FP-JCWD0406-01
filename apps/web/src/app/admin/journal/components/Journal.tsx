'use client';
import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { useGetBranchs } from '@/hooks/branch/useGetBranchs';
import NavbarAdmin from '../../components/NavbarAdmin';
import { useAppSelector } from '@/libs/hooks';
import { useGetJournals } from '@/hooks/journal/useGetJournals';
import { useGetJournalsByBranchId } from '@/hooks/journal/useGetJournalsByBranchId';
import { IAdminState } from '@/types/admin.type';
import { IStoreBranch } from '@/types/branch.type';
import { IJournalProps } from '@/types/props.type';

const Journal = ({ isOpen, onClose }: IJournalProps) => {
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
    data: journals,
    setJournals,
    getJournals,
  } = useGetJournals({ setTotalPage, page, itemPerPage, isSuperAdmin });

  const { getJournalsByBranchId } = useGetJournalsByBranchId({
    setTotalPage,
    setJournals,
    page,
    itemPerPage,
    selectedBranch,
    branchId,
  });

  const { getBranchs } = useGetBranchs({
    setBranches,
  });

  const handleBranchChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    setSelectedBranch(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    if (isSuperAdmin) {
      if (selectedBranch) {
        getJournalsByBranchId();
      } else {
        getJournals();
      }
    } else {
      getJournalsByBranchId();
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
        <div className="header flex bg-gray-100 flex-col md:flex-row border md:h-[70px] md:justify-between md:px-3 md:items-center">
          <div className="flex justify-between md:flex-col md:text-base flex-shrink-0 p-4 md:p-3 lg:p-4 lg:ml-[90px]">
            <h1 className="text-gray-600">Date</h1>
          </div>
          <div className="flex justify-between md:flex-col md:text-base flex-shrink-0 p-4 md:p-3 md:ml-[-130px] lg:ml-[-150px] lg:p-4">
            <h1 className="text-gray-600">Branch</h1>
          </div>
          <div className="flex justify-between md:flex-col md:text-base flex-shrink-0 p-4">
            <h1 className="text-gray-600">Title</h1>
          </div>
          <div className="flex justify-between md:flex-col md:text-base flex-shrink-0 p-4 lg:mr-[53px]">
            <h1 className="text-gray-600">Reason</h1>
          </div>
        </div>
        {!journals.length ? (
          <div className="my-10">
            <h1 className="font-bold text-center text-xl">Data Empty</h1>
          </div>
        ) : (
          <Pagination
            data={journals}
            setPage={setPage}
            totalPage={totalPage}
            itemPerPage={itemPerPage}
          />
        )}
      </div>
    </div>
  );
};

export default Journal;
