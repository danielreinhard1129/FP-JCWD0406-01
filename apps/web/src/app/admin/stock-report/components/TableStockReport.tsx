import { IHistoryStock } from '@/app/type.web/stock.type';
import { format } from 'date-fns';
import { Spinner, Table } from 'flowbite-react';
import React from 'react';

interface IParam {
  data: IHistoryStock[];
  loading: boolean
}

export const TableStockReport = ({ data , loading}: IParam) => {


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
          <Table.HeadCell>Branch Name </Table.HeadCell>
          <Table.HeadCell>Product Name</Table.HeadCell>
          <Table.HeadCell>Product Category</Table.HeadCell>
          <Table.HeadCell>Stock Before</Table.HeadCell>
          <Table.HeadCell>Stock After</Table.HeadCell>
          <Table.HeadCell>Date Created</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((historyStock, index) => {
            return (
              <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800 text-sm">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  {historyStock.stock?.StoreBranch.name}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  {historyStock.stock?.product.name}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  {historyStock.stock?.product.category.name}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  {historyStock.StockBefore}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  {historyStock.StockAfter}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  {format(new Date(historyStock.createdAt), 'dd-LLL-yyyy')}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};
