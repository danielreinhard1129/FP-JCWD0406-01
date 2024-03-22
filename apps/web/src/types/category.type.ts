import { IProduct } from './product.type';

export interface ICategory {
  id: number;
  name: string;
  products: IProduct[];
}
