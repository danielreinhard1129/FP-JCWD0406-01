'use client';
import React, { useState } from 'react';

const SelectAddress = () => {
  const [selectedAddress, setSelectedAddress]: any = useState(null);

  const addresses = [
    { id: 1, name: 'Alamat 1', address: 'Jalan Contoh 123' },
    { id: 2, name: 'Alamat 2', address: 'Jalan Contoh 456' },
  ];

  const handleAddressChange = (address: any) => {
    setSelectedAddress(address);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`p-4 border ${
              selectedAddress === address
                ? 'border-blue-500'
                : 'border-gray-300'
            } cursor-pointer`}
            onClick={() => handleAddressChange(address)}
          >
            <h3 className="text-lg font-semibold">{address.name}</h3>
            <p>{address.address}</p>
          </div>
        ))}
      </div>
      <h3 className="text-xl font-extrabold text-[#333] mt-14">
        Shipping Address
      </h3>
      {selectedAddress ? (
        <div className="mt-4 p-4 border border-gray-300">
          <p>{selectedAddress.name}</p>
          <p>{selectedAddress.address}</p>
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
