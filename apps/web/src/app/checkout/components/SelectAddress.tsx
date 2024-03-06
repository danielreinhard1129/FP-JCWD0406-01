'use client';
import { useGetUserAddress } from '@/hooks/user/useGetUserAddress';

const SelectAddress = ({ selectedAddress, setSelectedAddress }: any) => {
  const { addresses } = useGetUserAddress();

  const handleAddressChange = (address: any) => {
    setSelectedAddress(address);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        {addresses?.addresses.map((address: any, index: any) => (
          <div
            key={address.id}
            className={`p-4 border ${
              selectedAddress === address
                ? 'border-blue-500'
                : 'border-gray-300'
            } cursor-pointer`}
            onClick={() => handleAddressChange(address)}
          >
            <h3 className="text-lg font-semibold">{address.label}</h3>
            <p>{address.detail}</p>
          </div>
        ))}
      </div>
      <h3 className="text-xl font-extrabold text-[#333] mt-14 mb-4">
        Delivery Address
      </h3>
      {selectedAddress ? (
        <div className="bg-gray-200 p-4 rounded-md shadow-md">
          <p>{selectedAddress.detail}</p>
        </div>
      ) : (
        <div className="mt-4 p-4 border border-gray-300 h-20 flex justify-center items-center">
          Choose your address
        </div>
      )}
    </div>
  );
};

export default SelectAddress;
