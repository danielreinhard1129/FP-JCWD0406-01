/* eslint-disable @next/next/no-img-element */
import { Button } from 'flowbite-react';
import React, { useState } from 'react';

const PaymentMethod = ({ handlePay, handlePaymentByManual }: any) => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleMethodSelect = (method: any) => {
    setSelectedMethod(method);
  };

  return (
    <div className="flex gap-4 mt-3  md:mt-12 p-1 justify-center text-xs lg:text-base">
      <button
        onClick={() => {
          handleMethodSelect('transferManual');
          handlePaymentByManual();
        }}
        className="bg-green-500 text-white font-semibold p-4 md:py-4 md:px-8 rounded-lg shadow-md hover:bg-green-700"
      >
        Transfer Manual
      </button>

      <button
        onClick={() => {
          handleMethodSelect('paymentGateway');
          handlePay();
        }}
        className="bg-green-500 text-white font-semibold p-4 md:py-4 md:px-8 rounded-lg shadow-md hover:bg-green-700"
      >
        Payment Gateway
      </button>
    </div>
  );
};

export default PaymentMethod;
