import { FindNearestBranch } from '@/helpers/findNearestBranch';
import { logger } from '@/logger';
import { getBranchs } from '@/repositories/branchs/getBranchs';
import { IBranchStore, IGetBranchProps } from '@/types/branch.type';

export const getBranchByGeolocationAction = async (body: IGetBranchProps) => {
  try {
    const { latitude, longitude } = body;

    const userLatitude = Number(latitude);
    const userLongitude = Number(longitude);

    const listOfBranches: IBranchStore[] = await getBranchs();

    const nearestBranch = FindNearestBranch(
      userLatitude,
      userLongitude,
      listOfBranches,
    );

    logger.info('get branchs by Geolocation success');
    return {
      message: 'get branchs by Geolocation success',
      status: 200,
      data: nearestBranch,
    };
  } catch (error) {
    throw error;
  }
};
