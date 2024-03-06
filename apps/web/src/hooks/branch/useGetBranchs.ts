import { axiosInstance } from '@/libs/axios';

interface IBranchsParams {
  setBranches: (input: string[]) => void;
}

export const useGetBranchs = ({ setBranches }: IBranchsParams) => {
  const getBranchs = async () => {
    try {
      const response = await axiosInstance.get('/branchs');
      setBranches(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getBranchs,
  };
};
