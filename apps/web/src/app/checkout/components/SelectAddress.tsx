'use client';
import { axiosInstance } from '@/libs/axios';
import { useAppSelector } from '@/libs/hooks';
import React, { useEffect, useState } from 'react';

const SelectAddress = ({ selectedAddress, setSelectedAddress }: any) => {
  const [addresses, setAddresses]: any = useState();

  const user = useAppSelector((state) => state.user);

  const getUserAddress = async () => {
    try {
      const response = await axiosInstance.get(`/customers/filter/${user.id}`);
      setAddresses(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <h3 className="text-lg font-semibold">Alamat {index + 1}</h3>
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
