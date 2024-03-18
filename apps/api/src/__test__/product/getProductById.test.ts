import App from '@/app';
import { getProductById } from '@/repositories/product/getProductById';
import request from 'supertest';

jest.mock('@/repositories/product/getProductById.ts');

describe('GET /:id', () => {
  const { app } = new App();  

  const product = {
    id: 2,
    name: 'manggo fruits',
    image: 'abc.png',
    price: 12300,
    description: 'buah segar dan manis',
    createdAt: '12-11-2024',
    updateAt: '12-11-2024',
    categoryId: 1,
  };

  const id = 1
  it('should get product by id successfully', async () => {

    (getProductById as jest.Mock).mockResolvedValue(product);

    const response = await request(app).get(`/api/products/${id}`)
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: `get product by id ${id} was success`,
      status: 200,
      data: product,
    });
  });

    it('should error when get product by id', async () => {
      (getProductById as jest.Mock).mockRejectedValue(
        new Error('Failed to get product by id'),
      );

      const response = await request(app).get(`/api/products/${id}`)
      expect(response.status).toBe(500);
      expect(response.text).toEqual('Failed to get product by id');
    });
});
