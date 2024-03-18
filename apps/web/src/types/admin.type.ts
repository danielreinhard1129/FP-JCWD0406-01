export interface IAdminState {
  id: number;
  username: string;
  email: string;
  image: string;
  branchId: number;
  isSuperAdmin: boolean;
}

interface IStoreBranch {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  address: string;
  cityId: number;
}

export interface IAdmin {
  id: number;
  username: string;
  email: string;
  image: string;
  isSuperAdmin: boolean;
  branchId: number;
  storeBranch: IStoreBranch;
}
