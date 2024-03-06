import App from '@/app';
import { getUserById } from '@/repositories/user/getUserById';
import request from 'supertest';

jest.mock('@/repositories/customer/getCustomerById.ts');

describe('GET /filter/:id', () => {
  const { app } = new App();
  it('should get data customer by id successfully', async () => {
    const userData = {
      email: 'judi@mail.com',
      phone: 123212,
      password: 'admin123',
      username: 'judi',
      verified: 1,
      referralCode: 'assasd',
      referrer: 'dsadsa',
      profileId: 1,
    };

    (getUserById as jest.Mock).mockResolvedValue(userData);

    const id = 1;

    const response = await request(app).get(`/api/customers/filter/${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'get customer by id success',
      status: 200,
      data: userData,
    });
  });

  it('should error when get customer by id', async () => {
    (getUserById as jest.Mock).mockRejectedValue(
      new Error('Failed to get customer by Id'),
    );

    const invalidId = 999;
    const response = await request(app).get(
      `/api/customers/filter/${invalidId}`,
    );

    expect(response.status).toBe(500);
    expect(response.text).toEqual('Failed to get customer by Id');
  });
});
