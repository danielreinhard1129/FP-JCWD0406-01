import App from '@/app';
import { getJournalsByBranchId } from '@/repositories/journal/getJournalsByBranchId'; 
import { getTotalJournalsByBranchId } from '@/repositories/journal/getTotalJournalsByBranchId'; 
import request from 'supertest';

jest.mock('@/repositories/journal/getJournalsByBranchId.ts');
jest.mock('@/repositories/journal/getTotalJournalsByBranchId.ts')

describe('Get /filter', () => {
  const { app } = new App();
  const journals = [
    {
      id: 1,
      branchId: 2,
      title: 'The transaction with ID GRC--XXc-9iM has been cancelled',
      reason: 'Pada tanggal 2024 March 10, transaksi dengan ID GRC--XXc-9iM telah dibatalkan. Pembatalan ini dilakukan karena kosong',
      createdAt: '12-11-2023',
      updatedAt: '13-11-2023',
    },
    {
      id: 2,
      branchId: 2,
      title: 'The transaction with ID GRC--Adc-123 has been cancelled',
      reason: 'Pada tanggal 2024 March 15, transaksi dengan ID GRC--Adc-123 telah dibatalkan. Pembatalan ini dilakukan karena produk habis',
      createdAt: '16-11-2023',
      updatedAt: '17-11-2023',
    },
  ];


  const query = {
    page: 1,
    perPage: 4,
    branchId: 2
  }

  it('should get journals by branchId successfully', async () => {
    
    (getJournalsByBranchId as jest.Mock).mockResolvedValue(journals);
    (getTotalJournalsByBranchId as jest.Mock).mockResolvedValue(journals.length);

    const response = await request(app).get(`/api/journals/filter`).query(query)
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: `get journals by branch id ${query.branchId} was success`,
      status: 200,
      data: journals,
      total: journals.length
    });
  });

  it('should error when get journals by branchId', async () => {
    (getJournalsByBranchId as jest.Mock).mockRejectedValue(
      new Error('Failed to get journals by branchId'),
    );
    
    const response = await request(app).get(`/api/journals/filter`).query(query)
    expect(response.status).toBe(500);
    expect(response.text).toEqual('Failed to get journals by branchId');
  });
});
