import { getTransactionById } from '@/repositories/transaction/getTransactionById';
import { updateTransactionPaymentProof } from '@/repositories/transaction/updateTransactionPaymentProof';
import { updateTransactionStatus } from '@/repositories/transaction/updateTransactionStatus';
import { getStockMutationByOrderId } from '@/repositories/mutation/getStockMutationByOrderId';
import { getTransactionDetailByOrderId } from '@/repositories/transaction/getTransactionDetailByOrderId';
import { returnStockById } from '@/repositories/Stock/returnStockById';
import { returnStock } from '@/repositories/Stock/returnStock';
import { createJurnalHistory } from '@/repositories/jurnal/createJurnalHistory';

import App from '@/app';
import request from 'supertest';

jest.mock('@/repositories/transaction/getTransactionById.ts');
jest.mock('@/repositories/transaction/updateTransactionPaymentProof.ts');
jest.mock('@/repositories/transaction/updateTransactionStatus.ts');
jest.mock('@/repositories/mutation/getStockMutationByOrderId.ts');
jest.mock('@/repositories/transaction/getTransactionDetailByOrderId.ts');
jest.mock('@/repositories/Stock/returnStockById.ts');
jest.mock('@/repositories/Stock/returnStock.ts');
jest.mock('@/repositories/jurnal/createJurnalHistory.ts');
jest.mock('fs/promises', () => ({
  readFile: jest.fn().mockResolvedValue('mockedTemplateContent'),
}));
jest.mock('handlebars', () => ({
  compile: jest.fn().mockReturnValue(jest.fn()),
}));
jest.mock('@/lib/nodemailer', () => ({
  transporter: {
    sendMail: jest.fn().mockResolvedValue('mockedMailResult'),
  },
}));

describe('PATCH /:id/status', () => {
  const { app } = new App();

  const transaction = {
    id: 2,
    orderId: 'GRC-zRzh-jiO',
    branchId: 2,
    amount: 123000,
    message: 'letakkan di bawah meja',
    snapToken: 'abcd',
    snapRedirectUrl: 'cdef',
    paymentProof: 'abc.png',
    address: 'jln mager no.12',
    createdAt: '12-11-2023',
    updatedAt: '12-11-2023',
    userId: 1,
    statusId: 1,
    user: {
      id: 1,
      username: 'budi',
      email: 'budi@mail.com',
    },
  };

  const transactionId = 'GRC-zRzh-jiO';

  const body = { statusId: 1, reason: 'produk kosong' };

  const stockMutation = {
    id: 1,
    orderId: 'GRC-zRzh-jiO',
    productId: 1,
    quantity: 3,
    stockId: 1,
    destinationBranchId: 1,
  };

  const detailOrder = [
    {
      id: 1,
      productName: 'semangka',
      price: 12000,
      orderId: 1,
      productId: 1,
    },
  ];

  const stockProduct = {
    id: 1,
    name: 'semangka',
    quantity: 1,
  };

  const jurnal = {
    title: `The transaction with ID ${transactionId} has been cancelled.`,
    details: `Pada tanggal 12-12-2023, transaksi dengan ID ${transactionId} telah dibatalkan. Pembatalan ini dilakukan karena kosong`,
  };

  it('should error when transaction by id not found', async () => {
    (getTransactionById as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .patch(`/api/transactions/${transactionId}/status`)
      .send(body);
    expect(response.status).toBe(500);
    expect(response.text).toEqual(
      `transaction with id ${transactionId} not found`,
    );
  });

  it('should error when update transaction status to be waiting payment', async () => {
    (getTransactionById as jest.Mock).mockResolvedValue(transaction);
    (updateTransactionPaymentProof as jest.Mock).mockRejectedValue(
      new Error(`update transaction with ${transactionId} failed`),
    );

    const response = await request(app)
      .patch(`/api/transactions/${transactionId}/status`)
      .send({ statusId: 1, reason: '' });
    expect(response.status).toBe(500);
    expect(response.text).toEqual(
      `update transaction with ${transactionId} failed`,
    );
  });

  it('should update transaction status to be waiting payment successfully', async () => {
    (getTransactionById as jest.Mock).mockResolvedValue(transaction);
    (updateTransactionPaymentProof as jest.Mock).mockResolvedValue(null);
    (updateTransactionStatus as jest.Mock).mockResolvedValue(transaction);

    const response = await request(app)
      .patch(`/api/transactions/${transactionId}/status`)
      .send(body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: `update transaction status with id ${transactionId} was success`,
      status: 200,
    });
  });

  it('should update transaction status to processing successfully', async () => {
    (getTransactionById as jest.Mock).mockResolvedValue(transaction);
    (updateTransactionStatus as jest.Mock).mockResolvedValue(transaction);

    const response = await request(app)
      .patch(`/api/transactions/${transactionId}/status`)
      .send({ statusId: 3, reason: '' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: `update transaction status with id ${transactionId} was success`,
      status: 200,
    });
  });

  it('should update transaction status to shpping successfully', async () => {
    (getTransactionById as jest.Mock).mockResolvedValue(transaction);
    (updateTransactionStatus as jest.Mock).mockResolvedValue(transaction);

    const response = await request(app)
      .patch(`/api/transactions/${transactionId}/status`)
      .send({ statusId: 4, reason: '' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: `update transaction status with id ${transactionId} was success`,
      status: 200,
    });
  });

  it('should update transaction status to received order successfully', async () => {
    (getTransactionById as jest.Mock).mockResolvedValue(transaction);
    (updateTransactionStatus as jest.Mock).mockResolvedValue(transaction);

    const response = await request(app)
      .patch(`/api/transactions/${transactionId}/status`)
      .send({ statusId: 5, reason: '' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: `update transaction status with id ${transactionId} was success`,
      status: 200,
    });
  });

  it('should update transaction status to cancel order successfully', async () => {
    (getTransactionById as jest.Mock).mockResolvedValue(transaction);
    (getStockMutationByOrderId as jest.Mock).mockResolvedValue(stockMutation);
    (getTransactionDetailByOrderId as jest.Mock).mockResolvedValue(detailOrder);
    (returnStockById as jest.Mock).mockResolvedValue(stockProduct);
    (returnStock as jest.Mock).mockResolvedValue(stockProduct);
    (createJurnalHistory as jest.Mock).mockResolvedValue(jurnal);
    (updateTransactionStatus as jest.Mock).mockResolvedValue(transaction);

    const response = await request(app)
      .patch(`/api/transactions/${transactionId}/status`)
      .send({ statusId: 6, reason: '' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: `update transaction status with id ${transactionId} was success`,
      status: 200,
    });
  });

  it('should error when update transaction status', async () => {
    (getTransactionById as jest.Mock).mockResolvedValue(transaction);
    (updateTransactionStatus as jest.Mock).mockRejectedValue(
      new Error(`update transaction with ${transactionId} failed`),
    );

    const response = await request(app)
      .patch(`/api/transactions/${transactionId}/status`)
      .send(body);
    expect(response.status).toBe(500);
    expect(response.text).toEqual(
      `update transaction with ${transactionId} failed`,
    );
  });
});
