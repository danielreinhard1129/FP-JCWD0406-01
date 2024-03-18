export interface IRegisterUser {
  email: string;
  username: string;
  password: string;
  phone: number;
}

export interface IRegisterAdmin {
  email: string;
  username: string;
  password: string;
  branchId: number;
}

export interface IUser {
  id: number;
  email: string;
  phone: number;
  password: string;
  username: string;
  isVerified: boolean;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
