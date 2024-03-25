import { axiosInstance } from '@/libs/axios';
import { AxiosError } from 'axios';
import { useContext, useState } from 'react';
import { toast } from 'sonner';
import useSnap from '@/hooks/useSnap';
import CartContext from '@/context/CartContext';
import { IUsePaymentByMidtransParams } from '@/types/params.type';
import { IAddItemToCart } from '@/types/cart.type';

export const usePaymentByMidtrans = ({
  branchId,
  total,
  selectedAddress,
  setSelectedAddress,
  user,
  message,
  cart,
  setMessage,
  router,
}: IUsePaymentByMidtransParams) => {
  const { snapEmbed } = useSnap();
  const [snapShow, setSnapShow] = useState<boolean>(false);
  const [midtrans, setMidtrans] = useState<null>(null);
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
        products: cart?.cartItems?.map((item: Partial<IAddItemToCart>) => ({
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
          onSuccess: function (result: any) {
            router.push(
              `/payment-status?order_id=${result?.order_id}&status_code=${result?.status_code}&transaction_status=${result?.transaction_status}`,
            );
            setMidtrans(result);
            setSnapShow(false);
          },
          onPending: function (result: any) {
            setMidtrans(result);
            router.push(
              `/payment-status?order_id=${result?.order_id}&status_code=${result?.status_code}&transaction_status=${result?.transaction_status}`,
            );
            setSnapShow(false);
          },
          onClose: function (result: any) {
            setMidtrans(result);
            router.push(
              `/payment-status?order_id=${result?.order_id}&status_code=${result?.status_code}&transaction_status=${result?.transaction_status}`,
            );
            setSnapShow(false);
          },
        });
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
