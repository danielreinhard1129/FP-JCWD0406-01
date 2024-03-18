import { axiosInstance } from '@/libs/axios';
import { IUseGetJournalsByBranchIdParams } from '@/types/params.type';

export const useGetJournalsByBranchId = ({
  setTotalPage,
  setJournals,
  page,
  itemPerPage,
  selectedBranch,
  branchId,
}: IUseGetJournalsByBranchIdParams) => {
  const getJournalsByBranchId = async () => {
    try {
      setTotalPage(0);
      setJournals([]);
      const response = await axiosInstance.get(
        `/journals/filter?branchId=${
          !selectedBranch ? branchId : Number(selectedBranch)
        }&page=${page}&perPage=${itemPerPage}`,
      );
      setJournals(response.data.data);
      setTotalPage(response.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getJournalsByBranchId,
  };
};
