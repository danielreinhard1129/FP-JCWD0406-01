import { logger } from '@/logger';
import { IProductDB } from '@/types/product.type';

export function checkAndProcessOrder({ products, productsFromDB }: any) {
  let insufficientProducts = [];

  for (const req of products) {
    const productInDB = productsFromDB.find(
      (p: IProductDB) => p.productId === req.id,
    );

    if (productInDB) {
      if (productInDB.amount >= req.quantity) {
        productInDB.amount -= req.quantity;
      } else {
        const shortfall = req.quantity - productInDB.amount;
        productInDB.amount = 0;

        insufficientProducts.push({
          id: req.id,
          productName: productInDB.product.name,
          quantity: shortfall,
        });
      }
    } else {
      logger.error(`Product with ID ${req.id} not found in the database`);
      throw new Error(`Product with ID ${req.id} not found in the database.`);
    }
  }

  return { insufficientProducts, productsFromDB };
}
