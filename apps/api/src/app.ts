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
import { TransactionRouter } from './routers/transaction.router';
import { UserRouter } from './routers/user.router';
import { BranchRouter } from './routers/branch.router';
import { AdminRouter } from './routers/admin.router';
import { JournalRouter } from './routers/journal.router';

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
    const transactionRouter = new TransactionRouter();
    const userRouter = new UserRouter();
    const branchRouter = new BranchRouter();
    const adminRouter = new AdminRouter();
    const journalRouter = new JournalRouter();

    this.app.use('/api/users', userRouter.getRouter());
    this.app.use('/api/products', productRouter.getRouter());
    this.app.use('/api/transactions', transactionRouter.getRouter());
    this.app.use('/api/branchs', branchRouter.getRouter());
    this.app.use('/api/admins', adminRouter.getRouter());
    this.app.use('/api/journals', journalRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
