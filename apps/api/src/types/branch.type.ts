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

export interface INearestBranch {
  nearestBranch: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    address: string;
    cityId: number;
  };
  distance: string;
}
