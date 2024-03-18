import { axiosInstance } from '@/libs/axios';
import { IUseGetTransactionsByBranchIdParams } from '@/types/params.type';

export const useGetTransactionsByBranchId = ({
  setTotalPage,
  setTransactions,
  page,
  itemPerPage,
  selectedBranch,
  branchId,
}: IUseGetTransactionsByBranchIdParams) => {
  const getTransactionsByBranchId = async () => {
    try {
      setTotalPage(0);
      setTransactions([]);
      const response = await axiosInstance.get(
        `/transactions/filter/branch?branchId=${
          !selectedBranch ? branchId : Number(selectedBranch)
        }&page=${page}&perPage=${itemPerPage}`,
      );
      setTransactions(response.data.data);
      setTotalPage(response.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getTransactionsByBranchId,
  };
};
