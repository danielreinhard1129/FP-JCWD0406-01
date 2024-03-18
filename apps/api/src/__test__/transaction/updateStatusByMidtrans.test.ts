import App from '@/app';
import { sendMailInvalidPaymentProof } from '@/helpers/sendmail/invalid-payment-proof';
import { sendMailPaymentConfirmed } from '@/helpers/sendmail/payment-confirmed';
import { updateTransactionStatus } from '@/repositories/transaction/updateTransactionStatus';
import request from 'supertest';

jest.mock('@/repositories/transaction/updateTransactionStatus.ts');
jest.mock('@/helpers/sendmail/payment-confirmed.ts');
jest.mock('@/helpers/sendmail/invalid-payment-proof.ts');

describe('POST /status/midtrans/:id', () => {
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

  const body = {
    transactionStatus: 'settlement',
  };

  it('should update status by midtrans successfully', async () => {
    (updateTransactionStatus as jest.Mock).mockResolvedValue(transaction);
    (sendMailPaymentConfirmed as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .post(`/api/transactions/status/midtrans/${transactionId}`)
      .send(body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: `update status by midtrans success with transactionId ${transactionId}`,
      status: 200,
    });
  });

  it('should update status by midtrans pending', async () => {
    (updateTransactionStatus as jest.Mock).mockResolvedValue(transaction);
    (sendMailInvalidPaymentProof as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .post(`/api/transactions/status/midtrans/${transactionId}`)
      .send({ transactionStatus: 'pending' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: `update status by midtrans success with transactionId ${transactionId}`,
      status: 200,
    });
  });

  it('should error when update status by midtrans', async () => {
    (updateTransactionStatus as jest.Mock).mockRejectedValue(
      new Error('Failed to update status by midtrans'),
    );

    const response = await request(app)
      .post(`/api/transactions/status/midtrans/${transactionId}`)
      .send(body);
    expect(response.status).toBe(500);
    expect(response.text).toEqual('Failed to update status by midtrans');
  });
});
