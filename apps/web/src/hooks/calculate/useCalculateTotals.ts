import { useEffect, useState } from 'react';
import { ICartItem } from '@/types/cart.type';
import { IUseCalculateTotalsParams } from '@/types/params.type';

export const useCalculateTotals = ({
  cart,
  shipping,
  tax,
  setTotal,
}: IUseCalculateTotalsParams) => {
  const [subtotal, setSubtotal] = useState<number>(0);
  const [item, setItem] = useState<number>(0);

  useEffect(() => {
    const calculateTotals = () => {
      let subTotal: number = 0;

      cart?.cartItems?.forEach((cartItem: ICartItem) => {
        subTotal += cartItem.price * cartItem.quantity;
      });

      let total = 0;
      cart?.cartItems?.forEach((cartItem: ICartItem) => {
        total += cartItem.quantity;
      });

      setItem(total);

      const newSubtotal: string = subTotal.toFixed(2);
      const newTotal: string = (subTotal + shipping + tax).toFixed(2);

      setSubtotal(Number(newSubtotal));
      setTotal(Number(newTotal));
    };

    calculateTotals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, shipping, tax]);

  return {
    subtotal,
    item,
  };
};
