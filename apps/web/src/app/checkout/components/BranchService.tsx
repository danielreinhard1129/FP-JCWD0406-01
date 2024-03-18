import { IBranchServiceProps } from '@/types/props.type';

const BranchService = ({
  branchName,
  address,
  distance,
}: IBranchServiceProps) => {
  return (
    <div className="bg-gray-200 p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2">{branchName}</h2>
      <p className="text-gray-600">{address}</p>
      <p className="text-sm text-gray-500 mt-2">Distance: {distance} km</p>
    </div>
  );
};

export default BranchService;
