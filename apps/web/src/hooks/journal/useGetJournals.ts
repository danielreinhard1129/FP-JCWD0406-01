import { axiosInstance } from '@/libs/axios';
import { IJournals } from '@/types/journal.type';
import { IUseGetJournalsParams } from '@/types/params.type';
import { useEffect, useState } from 'react';

export const useGetJournals = ({
  setTotalPage,
  page,
  itemPerPage,
  isSuperAdmin,
}: IUseGetJournalsParams) => {
  const [journals, setJournals] = useState<IJournals[]>([]);

  const getJournals = async () => {
    try {
      setTotalPage(0);

      if (!isSuperAdmin) return false;

      const response = await axiosInstance.get(
        `/journals?page=${page}&perPage=${itemPerPage}`,
      );
      setJournals(response.data.data);
      setTotalPage(response.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJournals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return {
    data: journals,
    setJournals,
    getJournals,
  };
};
