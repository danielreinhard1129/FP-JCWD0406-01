import { axiosInstance } from '@/libs/axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface IAddress {
  id: number;
  name: string;
  detail: string;
}

interface Iuser {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface IProduct {
  branchId: number;
  image: string;
  name: string;
  price: number;
  productId: number;
  quantity: number;
  seller: string;
  stock: number;
}

interface Icart {
  cartItems: IProduct[];
}

interface IPaymnetByManualParams {
  branchId: number;
  selectedAddress: IAddress;
  total: number;
  user: Iuser;
  cart: Icart;
  message: string;
  setMessage: (input: string) => void;
  setSelectedAddress: (input: string) => void;
}

export const usePaymentByManual = ({
  branchId,
  selectedAddress,
  total,
  user,
  cart,
  message,
  setMessage,
  setSelectedAddress,
}: IPaymnetByManualParams) => {
  const router = useRouter();

  const handlePaymentByManual = async () => {
    try {
      if (selectedAddress === null) {
        return alert('Select your address');
      }
      const response = await axiosInstance.post('/transactions', {
        address: selectedAddress.detail,
        amount: total,
        customerId: user.id,
        branchId,
        message,
        products: cart?.cartItems?.map((item: any) => ({
          id: item.productId,
          quantity: item.quantity,
        })),
      });

      if (response && response.status === 200) {
        await localStorage.removeItem('cart');
        router.push(
          `/order_status/?transaction_id=${response.data.transaction.order_id}`,
        );
        setMessage('');
        setSelectedAddress('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handlePaymentByManual,
  };
};
