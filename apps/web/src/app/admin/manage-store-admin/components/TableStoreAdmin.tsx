'use client';
import { IStoreAdmin } from '@/app/type.web/storeAdmin.type';
import { Button, Spinner, Table } from 'flowbite-react';
import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import ModalDelete from '../../components/ModalDelete';
import ModalInput from '../../components/ModalInput';
import FormStoreAdmin from './FormStoreAdmin';
import useFormikStoreAdmin from '@/app/hooks/formiks/useFormikStoreAdmin';
import { TableRow } from './TableRow';

interface IParam {
  data: IStoreAdmin[];
  loading: boolean;
  formik: any;
  refreshData: CallableFunction;
}

const TableStoreAdmin = ({ data, loading, refreshData }: IParam) => {
  if (loading) {
    return (
      <div className="h-sceen w-full flex justify-center items-center bg-[#272c2f]">
        <Spinner aria-label="Extra large spinner example" size="xl" />
        <p className="ml-2 text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto ">
      <Table>
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Admin Name</Table.HeadCell>
          <Table.HeadCell>Admin Email</Table.HeadCell>
          <Table.HeadCell>Branch Store</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Action</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((storeAdmin, index) => {
            return (
              <TableRow
                storeAdmin={storeAdmin}
                index={index}
                refreshData={refreshData}
              />
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TableStoreAdmin;
