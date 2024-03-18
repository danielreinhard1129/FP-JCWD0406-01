export interface IStoreBranch {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  address: string;
  cityId: number;
}

export interface IBranchService {
  nearestBranch: IStoreBranch;
  distance: string;
}



