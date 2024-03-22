import App from '@/app';
import { getProducts } from '@/repositories/product/getProducts';
import request from 'supertest';

jest.mock('@/repositories/product/getProducts.ts');

describe('GET /', () => {
  const { app } = new App();

  const product = [
    {
      id: 2,
      name: 'manggo fruits',
      image: 'abc.png',
      price: 12300,
      description: 'buah segar dan manis',
      createdAt: '12-11-2024',
      updateAt: '12-11-2024',
      categoryId: 1,
    },
  ];
  it('should get products successfully', async () => {
    (getProducts as jest.Mock).mockResolvedValue(product);

    const response = await request(app).get(`/api/products`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: `get products success`,
      status: 200,
      data: product,
    });
  });

  it('should error when get product by id', async () => {
    (getProducts as jest.Mock).mockRejectedValue(
      new Error('Failed to get products'),
    );

    const response = await request(app).get(`/api/products`);
    expect(response.status).toBe(500);
    expect(response.text).toEqual('Failed to get products');
  });
});
