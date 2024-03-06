import { IStoreBranch } from './store.type';

export interface IStoreAdmin {
  id?: number;
  name:string
  email: string;
  password?: string;
  storeId: string;
  store_branch?: IStoreBranch;
  isSuper?: Boolean;
}
