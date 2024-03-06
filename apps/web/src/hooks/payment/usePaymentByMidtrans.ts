import { axiosInstance } from '@/libs/axios';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';
import useSnap from '@/hooks/useSnap';
import { useRouter } from 'next/navigation';

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

interface IAddress {
  id: number;
  name: string;
  detail: string;
}

interface IPaymentByMidtransParams {
  branchId: number;
  total: number;
  selectedAddress: IAddress;
  setSelectedAddress: (input: string) => void;
  user: Iuser;
  message: string;
  cart: Icart;
  setMessage: (input: string) => void;
}

export const usePaymentByMidtrans = ({
  branchId,
  total,
  selectedAddress,
  setSelectedAddress,
  user,
  message,
  cart,
  setMessage,
}: IPaymentByMidtransParams) => {
  const { snapEmbed } = useSnap();
  const [snapShow, setSnapShow] = useState(false);
  const [midtrans, setMidtrans]: any = useState(null);
  const router = useRouter();

  const handlePaymentByMidtrans = async () => {
    try {
      if (selectedAddress === null) {
        return alert('Select your address');
      }

      const response = await axiosInstance.post('/transactions', {
        address: selectedAddress?.detail,
        amount: total,
        userId: user.id,
        message,
        branchId,
        products: cart?.cartItems?.map((item: any) => ({
          id: item.productId,
          quantity: item.quantity,
        })),
      });

      if (response && response.status === 200) {
        await localStorage.removeItem('cart');
        setMessage('');
        setSelectedAddress('');

        setSnapShow(true);
        snapEmbed(response.data.transaction.snapToken, 'snap-container', {
          onSuccess: function (result: string) {
            setMidtrans(JSON.parse(result));
            router.push(
              `/order_status?transaction_id=${response.data.transaction.orderId}`,
            );
            setSnapShow(false);
          },
          onPending: function (result: string) {
            setMidtrans(result);
            router.push(
              `/order_status?transaction_id=${response.data.transaction.orderId}`,
            );
            setSnapShow(false);
          },
          onClose: function (result: string) {
            setMidtrans(result);
            router.push(
              `/order_status?transaction_id=${response.data.transaction.orderId}`,
            );
            setSnapShow(false);
          },
        });
      } else if (response && response.status === 3) {
        console.log(response);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data);
      }
    }
  };

  return {
    snapShow,
    handlePaymentByMidtrans,
  };
};
