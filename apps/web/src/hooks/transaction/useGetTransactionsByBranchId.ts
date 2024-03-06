import { axiosInstance } from '@/libs/axios';

interface ITransactionByBranchId {
  setTotalPage: (input: number) => void;
  setTransactions: (input: string[]) => void;
  page: number;
  itemPerPage: number;
  selectedBranch: number;
  branchId: number;
}

export const useGetTransactionsByBranchId = ({
  setTotalPage,
  setTransactions,
  page,
  itemPerPage,
  selectedBranch,
  branchId,
}: ITransactionByBranchId) => {
  const getTransactionsByBranchId = async () => {
    try {
      setTotalPage(0);
      setTransactions([]);
      const response = await axiosInstance.post(
        `/transactions/filter/branchId?page=${page}&perPage=${itemPerPage}`,
        {
          branchId: selectedBranch ? Number(selectedBranch) : branchId,
        },
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
