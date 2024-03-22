import App from '@/app';
import { getTransactionById } from '@/repositories/transaction/getTransactionById';
import { updateTransactionPaymentProof } from '@/repositories/transaction/updateTransactionPaymentProof';
import { updateTransactionStatus } from '@/repositories/transaction/updateTransactionStatus';
import request from 'supertest';

jest.mock('@/repositories/transaction/getTransactionById.ts');
jest.mock('@/repositories/transaction/updateTransactionPaymentProof.ts');
jest.mock('@/repositories/transaction/updateTransactionStatus.ts');
jest.mock('@/helpers/sendmail/payment-received-verification', () => ({
  sendMailPaymentReceivedVerification: jest
    .fn()
    .mockResolvedValue('mockedTemplateContent'),
}));
jest.mock('handlebars', () => ({
  compile: jest.fn().mockReturnValue(jest.fn()),
}));
jest.mock('@/lib/nodemailer', () => ({
  transporter: {
    sendMail: jest.fn().mockResolvedValue('mockedMailResult'),
  },
}));

describe('PATCH /:id/payment-proof', () => {
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

  const paymentProof = {
    id: 2,
    orderId: 'GRC-zRzh-jiO',
    branchId: 2,
    amount: 123000,
    paymentProof: 'abc.png',
  };

  const transactionId = 'GRC-zRzh-jiO';

  const body = {
    paymentProof: 'paymentProof.png',
  };

  it('should update status by paymentProof successfully', async () => {
    (getTransactionById as jest.Mock).mockResolvedValue(transaction);
    (updateTransactionPaymentProof as jest.Mock).mockResolvedValue(
      paymentProof,
    );
    (updateTransactionStatus as jest.Mock).mockResolvedValue(transaction);

    const response = await request(app)
      .patch(`/api/transactions/${transactionId}/payment-proof`)
      .send(body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: `update transaction payment proof success with transaction id ${transactionId}`,
      status: 200,
    });
  });

  it('should error when transaction by id not found', async () => {
    (getTransactionById as jest.Mock).mockResolvedValueOnce(undefined);

    const response = await request(app)
      .patch(`/api/transactions/${transactionId}/payment-proof`)
      .send(body);
    expect(response.status).toBe(500);
    expect(response.text).toEqual(
      `transaction with id ${transactionId} not found`,
    );
  });

  it('should error when update status by paymentProof', async () => {
    (getTransactionById as jest.Mock).mockResolvedValue(transaction);
    (updateTransactionStatus as jest.Mock).mockRejectedValue(
      new Error('Failed to update status by paymentProof'),
    );

    const response = await request(app)
      .patch(`/api/transactions/${transactionId}/payment-proof`)
      .send(body);
    expect(response.status).toBe(500);
    expect(response.text).toEqual('Failed to update status by paymentProof');
  });
});
