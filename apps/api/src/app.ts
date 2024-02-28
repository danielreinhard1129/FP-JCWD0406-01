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
import { StoreRouter } from './routers/store.router';
import { StockRouter } from './routers/stock.router';
import { OrderRouter } from './routers/order.router';

export default class App {
  private app: Express;

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
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
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
    const store = new StoreRouter();
    const stock = new StockRouter();
    const order = new OrderRouter();

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student !`);
    });
    this.app.use(
      '/api/media/products',
      express.static(__dirname + '/images/products'),
    );
    this.app.use(
      '/api/media/categories',
      express.static(__dirname + '/images/categories'),
    );
    this.app.use('/api/categories', categoryRouter.getRouter());
    this.app.use('/api/products', productRouter.getRouter());
    this.app.use('/api/transactions', transactionRouter.getRouter());
    this.app.use('/api/stores', store.getRouter());
    this.app.use('/api/stocks', stock.getRouter());
    this.app.use('/api/orders', order.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
