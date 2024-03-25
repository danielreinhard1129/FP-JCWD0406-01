export interface IAddToCart {
  productId: number;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  seller: string;
  quantity: any;
}

export interface IItemProduct {
  categoryId: number;
  id: number;
  image: string;
  location: string;
  name: string;
  price: number;
}

export interface IStoreBranch {
  id: number;
  name: string;
  adminId: number;
  voucherId: number;
  latitude: number;
  longitude: number;
  cityId: number;
}

export interface IProduct {
  id: number;
  productId: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  branchId: number;
  product: IItemProduct;
  storeBranch: IStoreBranch;
}

export interface ICartItem {
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

export interface ICart {
  cartItems: ICartItem[];
}

export interface IAddItemToCart {
  productId: number;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  branchId: number;
  seller: string;
  quantity: number;
}
