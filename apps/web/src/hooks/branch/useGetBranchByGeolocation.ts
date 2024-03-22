import { axiosInstance } from '@/libs/axios';
import { IBranchService } from '@/types/branch.type';
import { IUseGetBranchByGeolocationParams } from '@/types/params.type';
import { useEffect, useState } from 'react';

export const useGetBranchByGeolocation = ({
  selectedAddress,
}: IUseGetBranchByGeolocationParams) => {
  const [branchService, setBranchService] = useState<IBranchService | null>(
    null,
  );

  const getBranch = async () => {
    try {
      if (selectedAddress === null) {
        return;
      }
      const response = await axiosInstance.get(
        `/branchs/filter?latitude=${selectedAddress.latitude}&longitude=${selectedAddress.longitude}`,
      );
      setBranchService(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedAddress?.latitude && selectedAddress?.longitude) {
      getBranch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddress]);

  return {
    branchService,
  };
};
