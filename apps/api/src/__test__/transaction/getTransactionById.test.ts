import App from '@/app';
import { getTransactionById } from '@/repositories/transaction/getTransactionById';
import request from 'supertest';

jest.mock('@/repositories/transaction/getTransactionById.ts');

describe('GET /:id', () => {
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
    statusId: 5,
    user: {
        id: 1,
        username: 'budi',
        email:'budi@mail.com'
    }
  };

  const transactionId = 'GRC-zRzh-jiO'
  it('should get transaction by id successfully', async () => {

    (getTransactionById as jest.Mock).mockResolvedValue(transaction);
    
    const response = await request(app).get(`/api/transactions/${transactionId}`)
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: `get transaction with id ${transactionId} was success`,
      status: 200,
      data: transaction,
    });
  });

    it('should error when get transaction by id', async () => {
      (getTransactionById as jest.Mock).mockRejectedValue(
        new Error('Failed to get transaction by id'),
      );

      const response = await request(app).get(`/api/transactions/${transactionId}`)
      expect(response.status).toBe(500);
      expect(response.text).toEqual('Failed to get transaction by id');
    });
});
