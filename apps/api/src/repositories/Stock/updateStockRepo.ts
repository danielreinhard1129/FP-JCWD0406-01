import { prisma } from '@/helpers/prisma';
import { IHistoryStock, IStock } from '@/type.api/stock.type';
import React from 'react';

export const updateStockRepo = async (
  id: number,
  body: IStock,
  StockBefore: number,
) => {
  try {
    const update = prisma.stock.update({
      where: {
        id,
      },
      data: body,
    });

    // const history = prisma.stock_Change.create({
    //   data: {
    //     stockId: id,
    //     StockAfter: body.amount,
    //     StockBefore,
    //   },
    // });

    // return await prisma.$transaction([update, history]);
  } catch (error) {
    throw error
  }
};
