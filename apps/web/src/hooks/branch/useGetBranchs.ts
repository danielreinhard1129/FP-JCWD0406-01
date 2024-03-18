import { axiosInstance } from '@/libs/axios';
import { IUseGetBranchsParams } from '@/types/params.type';

export const useGetBranchs = ({ setBranches }: IUseGetBranchsParams) => {
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
