import CartContext from '@/context/CartContext';
import { axiosInstance } from '@/libs/axios';
import { IAddToCart } from '@/types/cart.type';
import { IUsePaymnetByManualParams } from '@/types/params.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { toast } from 'sonner';

export const usePaymentByManual = ({
  branchId,
  selectedAddress,
  total,
  user,
  cart,
  message,
  setMessage,
  setSelectedAddress,
}: IUsePaymnetByManualParams) => {
  const router = useRouter();
  const { clearCart } = useContext(CartContext);

  const handlePaymentByManual = async () => {
    try {
      if (selectedAddress === null) {
        return toast.info('Select your address');
      }
      const response = await axiosInstance.post('/transactions', {
        address: selectedAddress?.detail,
        amount: total,
        userId: user.id,
        branchId,
        message,
        products: cart?.cartItems?.map((item: Partial<IAddToCart>) => ({
          id: item.productId,
          quantity: item.quantity,
        })),
      });

      if (response && response.status === 200) {
        clearCart();
        router.push(
          `/order-status/?transaction_id=${response.data.transaction.orderId}`,
        );
        setMessage('');
        setSelectedAddress(null);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error?.response?.data;
        toast.error(errorMsg);
      }
    }
  };

  return {
    handlePaymentByManual,
  };
};
