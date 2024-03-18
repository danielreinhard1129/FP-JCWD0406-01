import App from '@/app';
import request from 'supertest';
import { getTransactions } from '@/repositories/transaction/getTransactions';
import { getTotalTransactions } from '@/repositories/transaction/getTotalTransactions';

jest.mock('@/repositories/transaction/getTransactions.ts');
jest.mock('@/repositories/transaction/getTotalTransactions.ts');

describe('GET /', () => { 
  const { app } = new App();
  const transactions = [
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
            email:'budi@mail.com'
        }
    }
  ]

  const querry = {
    page: 2,
    perPage: 4,
  }


  it('should get transactions successfully', async () => {
  
    (getTransactions as jest.Mock).mockResolvedValue(transactions);
    (getTotalTransactions as jest.Mock).mockResolvedValue(transactions.length);

    const response = await request(app).get(`/api/transactions`).query(querry)
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'get transactions success',
      status: 200,
      data: transactions,
      total: transactions.length
    });
  });

  it('should error when get transactions', async () => {
    (getTransactions as jest.Mock).mockRejectedValue(
      new Error('Failed to get transactions'),
    );
    

    const response = await request(app).get(`/api/transactions`).query(querry)
    expect(response.status).toBe(500);
    expect(response.text).toEqual('Failed to get transactions');
  });
});
