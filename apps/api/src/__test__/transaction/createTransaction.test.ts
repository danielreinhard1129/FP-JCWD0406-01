import App from '@/app';
import request from 'supertest';
import { getStocksByProductId } from '@/repositories/Stock/getStocksByProductId';
import { updateStockByProductIdAndBranchId } from '@/repositories/Stock/updateStockByProductIdAndBranchId'; 
import { getBranchById } from '@/repositories/branchs/getBranchById'; 
import { getBranchesExcluding } from '@/repositories/branchs/getBranchesExcluding';
import { getStocksByProductIdAndBranchId } from '@/repositories/Stock/getStocksByProductIdAndBranchId';
import { createMutationStock } from '@/repositories/mutation/createMutationStock';
import { createTransaction } from '@/repositories/transaction/createTransaction'; 
import { createTransactionItems } from '@/repositories/transaction/createTransactionItems'; 


jest.mock('@/repositories/Stock/getStocksByProductId.ts');
jest.mock('@/repositories/Stock/updateStockByProductIdAndBranchId.ts');
jest.mock('@/repositories/branchs/getBranchById.ts');
jest.mock('@/repositories/branchs/getBranchesExcluding.ts');
jest.mock('@/repositories/Stock/getStocksByProductIdAndBranchId.ts');
jest.mock('@/repositories/mutation/createMutationStock.ts');
jest.mock('@/repositories/transaction/createTransaction.ts');
jest.mock('@/repositories/transaction/createTransactionItems.ts');

describe('POST /', () => {
  const { app } = new App();
  const body = {
    products: [{ id: 1, quantity: 2 }],
    address: 'jln baru',
    amount: 125000,
    userId: 1,
    message: 'letakkan di depan pintu',
    branchId: 1,
  };

  const stock = [
    {
      id: 2,
      branchId: 2,
      quantity: 123,
      productId: 1,
      createdAt: '12-11-2023',
      updatedAt: '12-11-2023',
    },
  ];

  const branch = [
    {
      id: 1,
      name: "mawar store"
    }
  ]

  const mutasi = {
    id:1,
    reason: "stock tidak mencukupi",
    branchId: 2
  }

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

  const transactionItems = { 
    id: 1,
    name: 'semangka belah',
    harga: 12000
  }

  it('should error when get transactions', async () => {
    const response = await request(app).post(`/api/transactions`).send({
      products: [],
      address: 'jln baru',
      amount: 125000,
      userId: 1,
      message: 'letakkan di depan pintu',
      branchId: 1,
    });
    expect(response.status).toBe(500);
    expect(response.text).toEqual('the checked-out product was not found');
  });

  it('should error when don\'t have enough in stock', async () => {
    (getStocksByProductId as jest.Mock).mockResolvedValue(stock)

    const response = await request(app).post(`/api/transactions`).send(body);
    expect(response.status).toBe(500)
    expect(response.text).toEqual('Sorry, we don\'t have enough in stock for your order')
  });

  it('should success when create transaction ', async () => {
    // (getStocksByProductId as jest.Mock).mockResolvedValue(stock)
    // (updateStockByProductIdAndBranchId as jest.Mock).mockResolvedValue(null)
    // (getBranchById as jest.Mock).mockResolvedValue(branch)
    // (getBranchesExcluding as jest.Mock).mockResolvedValue(branch)
    // (getStocksByProductIdAndBranchId as jest.Mock).mockResolvedValue(stock)
    // (createMutationStock as jest.Mock).mockResolvedValue(mutasi)
    (createTransaction as jest.Mock).mockResolvedValue(transaction)
    // (createTransactionItems as jest.Mock).mockResolvedValue(transactionItems)

    const response = await request(app).post(`/api/transactions`).send(body);
   
    // expect(response.status).toBe(200);
  });

  
  // it('should error when create transaction', async () => {
  //   (createTransaction as jest.Mock).mockRejectedValue(
  //     new Error('Failed to create transaction'),
  //   );

  //   const response = await await request(app).post(`/api/transactions`).send(body)
  //   expect(response.status).toBe(500);
  //   expect(response.text).toEqual('Failed to create transaction');
  // });

});

