import { axiosInstance } from '@/libs/axios';
import { useEffect, useState } from 'react';

export const useGetBranchByGeolocation = ({ selectedAddress }: any) => {
  const [branchService, setBranchService]: any = useState();

  const getBranch = async () => {
    try {
      if (selectedAddress === null) {
        return;
      }
      const response = await axiosInstance.post('/branchs/select/branch', {
        latitude: selectedAddress.latitude,
        longitude: selectedAddress.longitude,
      });
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
