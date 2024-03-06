import { upload } from '@/helper/multer';
import { productValidation } from '@/validation/product.validation';
import { ProductController } from '@/controllers/product.controller';
import { Router } from 'express';

export class ProductRouter {
  private router: Router;
  private productController: ProductController;

  constructor() {
    this.productController = new ProductController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/create-product',
      upload(),
      productValidation,
      this.productController.createProduct,
    );
    this.router.put(
      '/update-product/:id',
      upload(),
      productValidation,
      this.productController.editProduct,
    );
    this.router.delete(
      '/delete-product/:id',
      this.productController.deleteProduct,
    );
    this.router.get('/', this.productController.getProducts);
    this.router.get('/filter/:id', this.productController.getProductById);
  }

  getRouter(): Router {
    return this.router;
  }
}
