import App from '@/app';
import { getBranchs } from '@/repositories/branchs/getBranchs';
import request from 'supertest';

jest.mock('@/repositories/branchs/getBranchs.ts');

describe('GET /', () => {
  const { app } = new App();
  const branchData = [
    {
      name: 'Maju Store',
      cityId: 1,
      adminId: 1,
      latitude: 3.456,
      longitude: 4.567,
      voucherId: 1,
      address: 1,
    },
    {
      name: 'Mundur Store',
      cityId: 1,
      adminId: 1,
      latitude: 1.234,
      longitude: 2.345,
      voucherId: 1,
      address: 1,
    },
  ];


  it('should get branchs successfully', async () => {

    (getBranchs as jest.Mock).mockResolvedValue(branchData);

    const response = await request(app).get(`/api/branchs`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'get branchs success',
      status: 200,
      data: branchData,
    });
  });

  it('should error when get branchs', async () => {
    (getBranchs as jest.Mock).mockRejectedValue(
      new Error('Failed to get branchs'),
    );

    const response = await request(app).get(`/api/branchs`);
    expect(response.status).toBe(500);
    expect(response.text).toEqual('Failed to get branchs');
  });
});
