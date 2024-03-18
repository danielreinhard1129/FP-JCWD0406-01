export interface IGetBranchProps {
  latitude: string;
  longitude: string;
}

export interface IBranchStore {
  id: number;
  name: string;
  latitude: any;
  longitude: any;
  address: string;
  cityId: number;
}
