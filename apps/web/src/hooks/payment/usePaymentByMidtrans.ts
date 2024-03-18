import { axiosInstance } from '@/libs/axios';
import { AxiosError } from 'axios';
import { useContext, useState } from 'react';
import { toast } from 'sonner';
import useSnap from '@/hooks/useSnap';
import { useRouter } from 'next/navigation';
import CartContext from '@/context/CartContext';
import { IUsePaymentByMidtransParams } from '@/types/params.type';

export const usePaymentByMidtrans = ({
  branchId,
  total,
  selectedAddress,
  setSelectedAddress,
  user,
  message,
  cart,
  setMessage,
}: IUsePaymentByMidtransParams) => {
  const { snapEmbed } = useSnap();
  const [snapShow, setSnapShow] = useState<boolean>(false);
  const [midtrans, setMidtrans] = useState<string>();
  const router = useRouter();
  const { clearCart } = useContext(CartContext);

  const handlePaymentByMidtrans = async () => {
    try {
      if (selectedAddress === null) {
        return toast.info('Select your address');
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
        clearCart();
        setMessage('');
        setSelectedAddress(null);

        setSnapShow(true);
        snapEmbed(response.data.transaction.snapToken, 'snap-container', {
          onSuccess: function (result: string) {
            setMidtrans(JSON.parse(result));
            router.push(
              `/order-status?transaction_id=${response.data.transaction.orderId}`,
            );
            setSnapShow(false);
          },
          onPending: function (result: string) {
            setMidtrans(result);
            router.push(
              `/order-status?transaction_id=${response.data.transaction.orderId}`,
            );
            setSnapShow(false);
          },
          onClose: function (result: string) {
            setMidtrans(result);
            router.push(
              `/order-status?transaction_id=${response.data.transaction.orderId}`,
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
