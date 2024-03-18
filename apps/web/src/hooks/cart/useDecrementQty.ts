import CartContext from '@/context/CartContext';
import { IAddToCart, ICartItem } from '@/types/cart.type';
import { useContext } from 'react';

export const useDecrementQty = () => {
  const { addItemToCart } = useContext(CartContext);

  const decrementQty = (cartItem: IAddToCart) => {
    const newQuantity: number = cartItem.quantity - 1;
    const item: Partial<ICartItem> = { ...cartItem, quantity: newQuantity };

    if (newQuantity <= 0) return;
    addItemToCart(item);
  };

  return {
    decrementQty,
  };
};
