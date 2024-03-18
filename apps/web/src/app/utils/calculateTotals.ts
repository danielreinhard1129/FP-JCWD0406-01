import { ICartItem } from '@/types/cart.type';
import { ICalculateTotalParams } from '@/types/params.type';

export const calculateTotals = ({
  cart,
  setSubtotal,
}: ICalculateTotalParams) => {
  let subTotal: number = 0;

  cart?.cartItems?.forEach((cartItem: ICartItem) => {
    subTotal += cartItem.price * cartItem.quantity;
  });

  const newSubtotal = subTotal.toFixed(2);
  setSubtotal(Number(newSubtotal));
};
