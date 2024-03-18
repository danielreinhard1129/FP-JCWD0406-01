import App from '@/app';
import { getJournals } from '@/repositories/journal/getJournals';
import { getTotalJournals } from '@/repositories/journal/getTotalJournals';
import request from 'supertest'; 

jest.mock('@/repositories/journal/getJournals.ts');
jest.mock('@/repositories/journal/getTotalJournals')

describe('GET /', () => { 
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
      branchId: 3,
      title: 'The transaction with ID GRC--Adc-123 has been cancelled',
      reason: 'Pada tanggal 2024 March 15, transaksi dengan ID GRC--Adc-123 telah dibatalkan. Pembatalan ini dilakukan karena produk habis',
      createdAt: '16-11-2023',
      updatedAt: '17-11-2023',
    },
  ];

  const query = {
    page: 1,
    perPage: 4
  }

  it('should get journals successfully', async () => {
  
    (getJournals as jest.Mock).mockResolvedValue(journals);
    (getTotalJournals as jest.Mock).mockResolvedValue(journals.length);

    const response = await request(app).get(`/api/journals`).query(query)
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'get journals success',
      status: 200,
      data: journals,
      total: journals.length
    });
  });

  it('should error when get journals', async () => {
    (getJournals as jest.Mock).mockRejectedValue(
      new Error('Failed to get journals'),
    );
    

    const response = await request(app).get(`/api/journals`).query(query)
    expect(response.status).toBe(500);
    expect(response.text).toEqual('Failed to get journals');
  });
});
