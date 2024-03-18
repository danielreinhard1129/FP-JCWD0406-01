import { IBranchStore } from '@/types/branch.type';
import { haversine } from './haversine';

export function FindNearestBranch(
  userLat: number,
  userLon: number,
  listOfBranches: IBranchStore[],
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
