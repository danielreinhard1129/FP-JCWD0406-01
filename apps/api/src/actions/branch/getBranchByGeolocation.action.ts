import { getBranchs } from '@/repositories/branchs/getBranchs';

export const getBranchByGeolocationAction = async (body: any) => {
  try {
    const { latitude, longitude } = body;

    function haversine(lat1: any, lon1: any, lat2: any, lon2: any) {
      const R = 6371.0;

      const [radLat1, radLon1, radLat2, radLon2] = [lat1, lon1, lat2, lon2].map(
        (coord) => (coord * Math.PI) / 180,
      );

      const dlat = radLat2 - radLat1;
      const dlon = radLon2 - radLon1;

      const a =
        Math.sin(dlat / 2) ** 2 +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dlon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = R * c;

      return distance;
    }

    function FindNearestBranch(
      userLat: any,
      userLon: any,
      listOfBranches: any,
    ) {
      let nearestBranch = null;
      let closestDistance = Infinity;

      for (const branch of listOfBranches) {
        const branchLat = Number(branch.latitude);
        const branchLon = Number(branch.longitude);

        const distance = haversine(userLat, userLon, branchLat, branchLon);

        if (distance < closestDistance) {
          closestDistance = distance;
          nearestBranch = branch;
        }
      }

      const distance = closestDistance.toFixed(2);
      return { nearestBranch, distance };
    }

    const userLatitude = Number(latitude);
    const userLongitude = Number(longitude);

    const listOfBranches = await getBranchs();

    const nearestBranch = FindNearestBranch(
      userLatitude,
      userLongitude,
      listOfBranches,
    );

    return {
      message: 'get branchs by Geolocation success',
      status: 200,
      data: nearestBranch,
    };
  } catch (error) {
    throw error;
  }
};
