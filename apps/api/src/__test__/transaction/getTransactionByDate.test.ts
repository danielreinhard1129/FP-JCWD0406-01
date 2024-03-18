import App from '@/app';
import { getTransactionByDate } from '@/repositories/transaction/getTransactionByDate';
import { getTotalTransactionsByDate } from '@/repositories/transaction/getTotalTransactionsByDate';
import request from 'supertest';

jest.mock('@/repositories/transaction/getTransactionByDate.ts');
jest.mock('@/repositories/transaction/getTotalTransactionsByDate.ts');

describe('GET /filter/date', () => {
  const { app } = new App();

  const transaction = [
    {
      id: 2,
      orderId: 'GRC-zRzh-jiO',
      branchId: 2,
      amount: 123000,
      message: 'letakkan di bawah meja',
      snapToken: 'abcd',
      snapRedirectUrl: 'cdef',
      paymentProof: 'abc.png',
      address: 'jln mager no.12',
      createdAt: '12-12-2023',
      updatedAt: '12-12-2023',
      userId: 1,
      statusId: 5,
      user: {
        id: 1,
        username: 'budi',
        email: 'budi@mail.com',
      },
    },
  ];

  const query = {
    page: 1,
    perPage: 4,
    date: '12-12-2023',
  };

  it('should get transaction by date successfully', async () => {
    (getTransactionByDate as jest.Mock).mockResolvedValue(transaction);
    (getTotalTransactionsByDate as jest.Mock).mockResolvedValue(
      transaction.length,
    );

    const response = await request(app)
      .get(`/api/transactions/filter/date`)
      .query(query);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: `get transaction with date ${query.date} was success`,
      status: 200,
      data: transaction,
      total: transaction.length,
    });
  });

  it('should error when get transaction by date', async () => {
    (getTransactionByDate as jest.Mock).mockRejectedValue(
      new Error('Failed to get transaction by date'),
    );

    const response = await request(app)
      .get(`/api/transactions/filter/date`)
      .query(query);
    expect(response.status).toBe(500);
    expect(response.text).toEqual('Failed to get transaction by date');
  });
});
