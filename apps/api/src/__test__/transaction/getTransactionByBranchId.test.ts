import App from '@/app';
import { getTransactionsByBranchId } from '@/repositories/transaction/getTransactionsByBranchId';
import { getTotalTransactionsByBranchId } from '@/repositories/transaction/getTotalTransactionsByBranchId';
import request from 'supertest';

jest.mock('@/repositories/transaction/getTransactionsByBranchId.ts');
jest.mock('@/repositories/transaction/getTotalTransactionsByBranchId.ts');

describe('GET /filter/branch', () => {
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
      createdAt: '12-11-2023',
      updatedAt: '12-11-2023',
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
    page: 2,
    perPage: 4,
    branchId: 2,
  };

  it('should get transaction by branch id successfully', async () => {
    (getTransactionsByBranchId as jest.Mock).mockResolvedValue(transaction);
    (getTotalTransactionsByBranchId as jest.Mock).mockResolvedValue(
      transaction.length,
    );

    const response = await request(app)
      .get(`/api/transactions/filter/branch`)
      .query(query);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: `get transaction by branch id ${query.branchId} was success`,
      status: 200,
      data: transaction,
      total: transaction.length,
    });
  });

  it('should error when get transaction by branch id', async () => {
    (getTransactionsByBranchId as jest.Mock).mockRejectedValue(
      new Error('Failed to get transaction by branch id'),
    );

    const response = await request(app)
      .get(`/api/transactions/filter/branch`)
      .query(query);
    expect(response.status).toBe(500);
    expect(response.text).toEqual('Failed to get transaction by branch id');
  });
});
