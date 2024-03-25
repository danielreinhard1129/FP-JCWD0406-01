import App from '@/app';
import { getBranchs } from '@/repositories/branchs/getBranchs';
import request from 'supertest';

jest.mock('@/repositories/branchs/getBranchs.ts');

describe('GET /filter', () => {
  const { app } = new App();

  const branchData = [
    {
      name: 'Maju Store',
      cityId: 1,
      adminId: 1,
      latitude: 40.7128,
      longitude: -74.006,
      voucherId: 1,
      address: 1,
    },
    {
      name: 'Mundur Store',
      cityId: 1,
      adminId: 1,
      latitude: 34.0522,
      longitude: -118.2437,
      voucherId: 1,
      address: 1,
    },
  ];

  const result = {
    distance: '0.00',
    nearestBranch: {
      address: 1,
      adminId: 1,
      cityId: 1,
      latitude: 40.7128,
      longitude: -74.006,
      name: 'Maju Store',
      voucherId: 1,
    },
  };
  const body = { latitude: 40.7128, longitude: -74.006 };

  it('should get branchs by geolocation successfully', async () => {
    (getBranchs as jest.Mock).mockResolvedValue(branchData);

    const response = await request(app).get(
      `/api/branchs/filter?latitude=${40.7128}&longitude=${-74.006}`,
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'get branchs by Geolocation success',
      status: 200,
      data: result,
    });
  });

  it('should error when get branch by geolocation', async () => {
    (getBranchs as jest.Mock).mockRejectedValue(
      new Error('Failed to get branchs'),
    );

    const response = await request(app).get(
      `/api/branchs/filter?latitude=${40.7128}&longitude=${-74.006}`,
    );
    expect(response.status).toBe(500);
    expect(response.text).toEqual('Failed to get branchs');
  });
});
