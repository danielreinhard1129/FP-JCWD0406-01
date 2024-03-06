import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import { ProductRouter } from './routers/product.router';
import { CategoryRouter } from './routers/category.router';
import { TransactionRouter } from './routers/transaction.router';
import { UserRouter } from './routers/user.router';
import { BranchRouter } from './routers/branch.router';

export default class App {
  // private app: Express;
  readonly app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send(err.message);
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const productRouter = new ProductRouter();
    const categoryRouter = new CategoryRouter();
    const transactionRouter = new TransactionRouter();
    const userRouter = new UserRouter();
    const branchRouter = new BranchRouter();
    this.app.use('/api/customers', userRouter.getRouter());
    this.app.use('/api/products', productRouter.getRouter());
    this.app.use('/api/transactions', transactionRouter.getRouter());
    this.app.use('/api/branchs', branchRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
