export interface ISelectedAddress {
    id: number;
    label: string;
    detail: string;
    latitude: string;
    longitude: string;
    userId: number;
    cityId: number;
}

interface IAddress {
    id: number;
    label: string;
    detail: string;
    latitude: string;
    longitude: string;
    userId: number;
    cityId: number;
  }
  
  export interface IUserAddress {
    id: number;
    email: string;
    phone: number;
    password: string;
    username: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    addresses: IAddress[];
  } 