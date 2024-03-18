import CartContext from '@/context/CartContext';
import { axiosInstance } from '@/libs/axios';
import { IUsePaymnetByManualParams } from '@/types/params.type';
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
        products: cart?.cartItems?.map((item: any) => ({
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
      console.log(error);
    }
  };

  return {
    handlePaymentByManual,
  };
};
