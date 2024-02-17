import { ProductsController } from '@/controllers/products.controller';
import { upload } from '@/helper/multer';
import { productValidation } from '@/validation/product.validation';
import { Router } from 'express';

export class ProductRouter {
  private router: Router;
  private productsController: ProductsController;

  constructor() {
    this.productsController = new ProductsController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.productsController.getAllProduct);
    this.router.post(
      '/create-product',
      upload(),
      productValidation,
      this.productsController.createProduct,
    );
    this.router.put(
      '/update-product/:id',
      upload(),
      productValidation,
      this.productsController.editProduct,
    );
    this.router.delete(
      '/delete-product/:id',
      this.productsController.deleteProduct,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
